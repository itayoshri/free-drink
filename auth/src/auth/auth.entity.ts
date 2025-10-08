import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refresh_tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  role_key: string;

  @Column()
  token_hash: string;

  @Column()
  created_at: Date;

  @Column()
  expires_at: Date;

  @Column()
  revoked_at: Date;
}
