import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'usage_logs' })
export class UsageLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.usageLogs, { onDelete: 'CASCADE' })
  user: User;

  @Column({ name: 'request_type', default: 'generate' })
  requestType: 'generate' | 'api';

  @Column({ name: 'tokens_used', type: 'int', nullable: true })
  tokensUsed?: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
