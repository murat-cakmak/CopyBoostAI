import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Subscription } from './subscription.entity';
import { Content } from './content.entity';
import { UsageLog } from './usage-log.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash', nullable: true })
  passwordHash?: string | null;

  @Column({ nullable: true })
  name?: string | null;

  @Column({ name: 'daily_request_limit', type: 'int', nullable: true })
  dailyRequestLimit?: number | null;

  @Column({ default: 'user' })
  role: 'user' | 'admin';

  @Column({ name: 'stripe_customer_id', nullable: true })
  stripeCustomerId?: string | null;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @OneToMany(() => Content, (content) => content.user)
  contents: Content[];

  @OneToMany(() => UsageLog, (usageLog) => usageLog.user)
  usageLogs: UsageLog[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
