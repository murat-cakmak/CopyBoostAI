import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'contents' })
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.contents, { onDelete: 'CASCADE' })
  user: User;

  @Column({ name: 'input_title' })
  inputTitle: string;

  @Column({ name: 'input_category', nullable: true })
  inputCategory?: string | null;

  @Column({ name: 'input_platform', nullable: true })
  inputPlatform?: string | null;

  @Column({ name: 'input_language', nullable: true })
  inputLanguage?: string | null;

  @Column({ nullable: true })
  tone?: string | null;

  @Column({ name: 'output_description_long', type: 'text', nullable: true })
  outputDescriptionLong?: string | null;

  @Column({ name: 'output_description_short', type: 'text', nullable: true })
  outputDescriptionShort?: string | null;

  @Column({ name: 'output_meta_title', type: 'text', nullable: true })
  outputMetaTitle?: string | null;

  @Column({ name: 'output_meta_description', type: 'text', nullable: true })
  outputMetaDescription?: string | null;

  @Column({ name: 'output_tags', type: 'jsonb', nullable: true })
  outputTags?: string[] | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
