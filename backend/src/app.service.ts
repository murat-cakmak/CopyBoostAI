import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

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

  async generateContent(input: {
    title?: string;
    category?: string;
    platform?: string;
    language?: string;
    tone?: string;
  }) {
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

      const completion = await response.json();

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

      return {
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
    }
  }
}
