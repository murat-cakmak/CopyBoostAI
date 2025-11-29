import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Between,
  MoreThanOrEqual,
  QueryFailedError,
  Repository,
} from "typeorm";
import { User } from "./entities/user.entity";
import { UsageLog } from "./entities/usage-log.entity";
import { Subscription } from "./entities/subscription.entity";
import { Content } from "./entities/content.entity";

@Injectable()
export class AppService {
  private readonly defaultDailyLimit =
    Number.parseInt(process.env.GENERATE_DAILY_LIMIT ?? "", 10) || null;

  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(UsageLog)
    private readonly usageLogsRepository: Repository<UsageLog>,
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>,
    @InjectRepository(Content)
    private readonly contentsRepository: Repository<Content>
  ) {}

  private hashPassword(password: string): string {
    const iterations = 100_000;
    const salt = randomBytes(16).toString("hex");
    const hash = pbkdf2Sync(password, salt, iterations, 64, "sha512").toString(
      "hex"
    );
    return `pbkdf2$sha512$${iterations}$${salt}$${hash}`;
  }

  private verifyPassword(password: string, stored: string): boolean {
    const parts = stored.split("$");
    if (parts.length !== 5) return false;

    const [, algorithm, iterationStr, salt, hash] = parts;
    const iterations = Number.parseInt(iterationStr, 10);

    if (!algorithm || Number.isNaN(iterations) || !salt || !hash) return false;

    const derived = pbkdf2Sync(
      password,
      salt,
      iterations,
      Buffer.from(hash, "hex").length,
      algorithm
    ).toString("hex");

    const storedBuf = Buffer.from(hash, "hex");
    const derivedBuf = Buffer.from(derived, "hex");

    return (
      storedBuf.length === derivedBuf.length &&
      timingSafeEqual(new Uint8Array(storedBuf), new Uint8Array(derivedBuf))
    );
  }

  private sanitizeUser(user: User) {
    const { passwordHash, ...rest } = user;
    return rest;
  }

  async getProfile(userId?: string) {
    if (!userId || !userId.trim()) {
      throw new BadRequestException("Kullanıcı bilgisi eksik.");
    }

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("Kullanıcı bulunamadı.");
    }

    const usage = await this.getUsageStatsForUser(user.id);
    const dailyLimit = user.dailyRequestLimit ?? this.defaultDailyLimit;
    const dailyRemaining =
      dailyLimit !== null ? Math.max(0, dailyLimit - usage.todayCount) : null;

    const activeSub = await this.subscriptionsRepository.findOne({
      where: { user: { id: user.id }, status: "active" },
      order: { currentPeriodEnd: "DESC", createdAt: "DESC" },
    });

    return {
      user: this.sanitizeUser(user),
      plan: activeSub?.plan ?? "free",
      subscription: activeSub
        ? {
            id: activeSub.id,
            plan: activeSub.plan,
            status: activeSub.status,
            currentPeriodStart: activeSub.currentPeriodStart,
            currentPeriodEnd: activeSub.currentPeriodEnd,
          }
        : null,
      limits: {
        dailyLimit,
        dailyUsed: usage.todayCount,
        dailyRemaining,
        monthlyUsage: usage.monthlyCount,
        daysRemaining: usage.daysRemaining,
      },
    };
  }

  private async getUsageStatsForUser(userId: string) {
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [todayCount, monthlyCount] = await Promise.all([
      this.usageLogsRepository.count({
        where: {
          user: { id: userId },
          requestType: "generate",
          createdAt: Between(startOfDay, endOfDay),
        },
      }),
      this.usageLogsRepository.count({
        where: {
          user: { id: userId },
          requestType: "generate",
          createdAt: MoreThanOrEqual(startOfMonth),
        },
      }),
    ]);

    const latestSubscription = await this.subscriptionsRepository.findOne({
      where: { user: { id: userId } },
      order: { currentPeriodEnd: "DESC", createdAt: "DESC" },
    });

    const daysRemaining = latestSubscription?.currentPeriodEnd
      ? Math.max(
          0,
          Math.ceil(
            (latestSubscription.currentPeriodEnd.getTime() - now.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : null;

    return { todayCount, monthlyCount, daysRemaining };
  }

  async getAllUsers() {
    const users = await this.usersRepository.find({
      order: { createdAt: "DESC" },
    });

    return Promise.all(
      users.map(async (u) => {
        const usage = await this.getUsageStatsForUser(u.id);
        const dailyLimit = u.dailyRequestLimit ?? null;
        const dailyRemaining =
          dailyLimit !== null ? Math.max(0, dailyLimit - usage.todayCount) : null;
        const activeSub = await this.subscriptionsRepository.findOne({
          where: { user: { id: u.id }, status: "active" },
          order: { currentPeriodEnd: "DESC", createdAt: "DESC" },
        });

        return {
          ...this.sanitizeUser(u),
          subscription: activeSub
            ? {
                id: activeSub.id,
                status: activeSub.status,
                plan: activeSub.plan,
                currentPeriodStart: activeSub.currentPeriodStart,
                currentPeriodEnd: activeSub.currentPeriodEnd,
              }
            : null,
          limits: {
            dailyLimit,
            dailyUsed: usage.todayCount,
            dailyRemaining,
            monthlyUsage: usage.monthlyCount,
            daysRemaining: usage.daysRemaining,
          },
        };
      })
    );
  }

  async getAllSubscriptions() {
    const subs = await this.subscriptionsRepository.find({
      relations: ["user"],
      order: { createdAt: "DESC" },
    });

    return subs.map((s) => ({
      id: s.id,
      plan: s.plan,
      status: s.status,
      currentPeriodStart: s.currentPeriodStart,
      currentPeriodEnd: s.currentPeriodEnd,
      user: s.user ? this.sanitizeUser(s.user) : null,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    }));
  }

  async getUserContents(userId?: string) {
    if (!userId || !userId.trim()) {
      throw new BadRequestException("Kullanıcı bilgisi eksik.");
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("Kullanıcı bulunamadı.");
    }

    const contents = await this.contentsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: "DESC" },
      take: 20,
    });

    return contents.map((c) => ({
      id: c.id,
      input: {
        title: c.inputTitle,
        category: c.inputCategory,
        platform: c.inputPlatform,
        language: c.inputLanguage,
        tone: c.tone,
      },
      output: {
        longDescription: c.outputDescriptionLong,
        shortDescription: c.outputDescriptionShort,
        seo: {
          title: c.outputMetaTitle,
          description: c.outputMetaDescription,
        },
        tags: c.outputTags || [],
      },
      createdAt: c.createdAt,
    }));
  }

  async setUserDailyLimit(userId: string, limit: number) {
    const parsed = Number(limit);
    if (!Number.isFinite(parsed) || parsed < 0) {
      throw new BadRequestException("Geçerli bir günlük limit girin.");
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("Kullanıcı bulunamadı.");
    }

    user.dailyRequestLimit = parsed;
    const saved = await this.usersRepository.save(user);
    return {
      message: "Günlük limit güncellendi.",
      user: this.sanitizeUser(saved),
    };
  }

  async createSubscriptionForUser(userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("Kullanıcı bulunamadı.");
    }

    const now = new Date();
    const nextMonth = new Date(now);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const sub = this.subscriptionsRepository.create({
      user,
      plan: "pro",
      status: "active",
      currentPeriodStart: now,
      currentPeriodEnd: nextMonth,
    });

    const saved = await this.subscriptionsRepository.save(sub);

    return {
      message: "Abonelik eklendi.",
      subscription: {
        id: saved.id,
        plan: saved.plan,
        status: saved.status,
        currentPeriodStart: saved.currentPeriodStart,
        currentPeriodEnd: saved.currentPeriodEnd,
        createdAt: saved.createdAt,
        updatedAt: saved.updatedAt,
        user: this.sanitizeUser(user),
      },
    };
  }

  async cancelSubscriptionForUser(userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("Kullanıcı bulunamadı.");
    }

    const latestSub = await this.subscriptionsRepository.findOne({
      where: { user: { id: userId } },
      order: { currentPeriodEnd: "DESC", createdAt: "DESC" },
    });

    if (!latestSub) {
      throw new NotFoundException("Aktif veya son abonelik bulunamadı.");
    }

    latestSub.status = "canceled";
    latestSub.plan = "free";
    latestSub.currentPeriodEnd = new Date();
    const saved = await this.subscriptionsRepository.save(latestSub);

    return {
      message: "Abonelik iptal edildi.",
      subscription: {
        id: saved.id,
        plan: saved.plan,
        status: saved.status,
        currentPeriodStart: saved.currentPeriodStart,
        currentPeriodEnd: saved.currentPeriodEnd,
        user: this.sanitizeUser(user),
      },
    };
  }

  private extractTokensUsed(completion: any): number | null {
    const usage = completion?.usage;
    const candidatesTokens =
      completion?.candidates?.[0]?.usageMetadata?.totalTokenCount;

    const total =
      usage?.totalTokens ??
      usage?.total_tokens ??
      usage?.tokenCount ??
      usage?.token_count ??
      candidatesTokens;

    const prompt =
      usage?.promptTokens ??
      usage?.prompt_tokens ??
      usage?.inputTokens ??
      usage?.input_tokens;
    const output =
      usage?.candidatesTokens ??
      usage?.candidates_tokens ??
      usage?.completionTokens ??
      usage?.completion_tokens ??
      usage?.outputTokens ??
      usage?.output_tokens;

    const derivedTotal =
      typeof prompt === "number" && typeof output === "number"
        ? prompt + output
        : null;

    const value = total ?? derivedTotal;
    return typeof value === "number" ? value : null;
  }

  private async logGenerate(tokensUsed: number | null, user?: User | null) {
    try {
      await this.usageLogsRepository.save({
        requestType: "generate",
        tokensUsed: tokensUsed ?? null,
        user: user ?? undefined,
      });
    } catch (error) {
      // Log but never block main flow.
      // eslint-disable-next-line no-console
      console.warn("Usage log kaydedilemedi", error);
    }
  }

  async getHealth() {
    const databaseStatus = await this.usersRepository
      .query("SELECT 1")
      .then(() => "connected")
      .catch(() => "unavailable");

    return {
      status: "ok",
      database: databaseStatus,
      timestamp: new Date().toISOString(),
    };
  }

  getWelcome() {
    return {
      name: "CopyBoost AI API",
      message:
        "NestJS backend hazır. Auth, billing ve content modülleri eklenebilir.",
    };
  }

  async register(input: {
    email: string;
    password: string;
    name?: string;
  }) {
    const email = input.email?.trim().toLowerCase();
    const password = input.password?.trim();
    const name = input.name?.trim();

    if (!email || !password) {
      throw new BadRequestException("Email ve parola zorunlu.");
    }

    if (password.length < 8) {
      throw new BadRequestException("Parola en az 8 karakter olmalı.");
    }

    try {
      const existing = await this.usersRepository.findOne({ where: { email } });
      if (existing) {
        throw new ConflictException("Bu email ile zaten bir hesap var.");
      }

      const user = this.usersRepository.create({
        email,
        name: name || null,
        passwordHash: this.hashPassword(password),
      });

      const saved = await this.usersRepository.save(user);

      // Best-effort audit/log row to confirm DB write path.
      this.usageLogsRepository
        .save({ user: saved, requestType: "api", tokensUsed: null })
        .catch((err) =>
          // eslint-disable-next-line no-console
          console.warn("Register log kaydedilemedi", err)
        );

      return {
        message: "Kayıt başarılı.",
        user: this.sanitizeUser(saved),
      };
    } catch (error) {
      // Handle race-condition duplicate insert
      if (
        error instanceof QueryFailedError &&
        // Postgres duplicate key error code
        (error as any).code === "23505"
      ) {
        throw new ConflictException("Bu email ile zaten bir hesap var.");
      }
      throw error;
    }
  }

  async login(input: { email: string; password: string }) {
    const email = input.email?.trim().toLowerCase();
    const password = input.password?.trim();

    if (!email || !password) {
      throw new BadRequestException("Email ve parola zorunlu.");
    }

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException("Geçersiz email veya parola.");
    }

    const valid = this.verifyPassword(password, user.passwordHash);

    if (!valid) {
      throw new UnauthorizedException("Geçersiz email veya parola.");
    }

    return {
      message: "Giriş başarılı.",
      user: this.sanitizeUser(user),
    };
  }

  async generateContent(
    input: {
      title?: string;
      category?: string;
      platform?: string;
      language?: string;
      tone?: string;
    },
    userId?: string
  ) {
    let completion: any = null;
    const user =
      userId && userId.trim()
        ? await this.usersRepository.findOne({ where: { id: userId } })
        : null;

    if (!process.env.GEMINI_API_KEY) {
      throw new BadRequestException(
        "GEMINI_API_KEY tanımlı değil. Lütfen backend .env içine ekleyin."
      );
    }

    const title = input.title?.trim();

    if (!title) {
      throw new BadRequestException("Ürün başlığı (title) zorunlu.");
    }

    const category = input.category || "genel";
    const platform = input.platform || "pazar yeri";
    const language = input.language || "tr";
    const tone = input.tone || "nötr";
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl =
      process.env.GEMINI_API_URL ||
      `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;

    const prompt = `You are an expert ecommerce copywriter. Return ONLY valid JSON with keys: 
      {
        "longDescription": "3-4 sentences in ${language}",
        "shortDescription": "1-2 sentences in ${language}",
        "seoTitle": "string",
        "seoDescription": "string",
        "tags": ["5-8 keywords"]
      }
        Product Title: ${title}
        Category: ${category}
        Platform: ${platform}
        Tone: ${tone}
        Language: ${language}
        Write concise, conversion-oriented copy.`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
          },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new InternalServerErrorException(
          `Gemini API hatası (${response.status}): ${
            errorBody || response.statusText
          }`
        );
      }

      completion = await response.json();

      const candidateText = completion?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        .join(" ");
      const contentText = candidateText || "{}";
      let parsed: any = {};

      const tryParseJson = (text: string) => {
        try {
          return JSON.parse(text);
        } catch (err) {
          return null;
        }
      };

      parsed = tryParseJson(contentText);

      if (!parsed && typeof contentText === "string") {
        const start = contentText.indexOf("{");
        const end = contentText.lastIndexOf("}");
        if (start !== -1 && end !== -1 && end > start) {
          parsed = tryParseJson(contentText.slice(start, end + 1));
        }
      }

      if (!parsed) {
        parsed = {
          longDescription: contentText,
          shortDescription: contentText,
          seoTitle: input.title,
          seoDescription: contentText,
          tags: [],
        };
      }

      const responsePayload = {
        input: { title, category, platform, language, tone },
        output: {
          longDescription: parsed.longDescription || parsed.long_description,
          shortDescription: parsed.shortDescription || parsed.short_description,
          seo: {
            title: parsed.seoTitle || parsed.seo_title,
            description: parsed.seoDescription || parsed.seo_description,
          },
          tags: parsed.tags || [],
        },
        meta: {
          model,
          // Gemini response may include usage info; expose raw object for debugging.
          usage: (completion as any).usage,
        },
      };

      // Persist content for logged-in users
      if (user) {
        await this.contentsRepository.save({
          user,
          inputTitle: title,
          inputCategory: category,
          inputPlatform: platform,
          inputLanguage: language,
          tone,
          outputDescriptionLong: responsePayload.output.longDescription,
          outputDescriptionShort: responsePayload.output.shortDescription,
          outputMetaTitle: responsePayload.output.seo.title,
          outputMetaDescription: responsePayload.output.seo.description,
          outputTags: responsePayload.output.tags,
        });
      }

      return responsePayload;
    } catch (error) {
      // Log full error for debugging; do not expose sensitive data to clients.
      // eslint-disable-next-line no-console
      console.error("generateContent error", error);

      if (
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      throw new InternalServerErrorException("İçerik üretimi başarısız oldu.");
    } finally {
      const tokensUsed = this.extractTokensUsed(completion);
      await this.logGenerate(tokensUsed, user);
    }
  }
}
