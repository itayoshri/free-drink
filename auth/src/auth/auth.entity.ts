import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refresh_tokens')
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  token_hash: string;

  @Column()
  created_at: Date;

  @Column()
  expires_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  revoked_at?: Date | null;
}
