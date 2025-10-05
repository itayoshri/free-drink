import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('invitation_tokens')
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  token_value: string;

  @Column()
  role_key: Role;

  @Column({ default: 1 })
  usage_limit: number;

  @Column({ default: 0 })
  usage_count: number;

  @Column()
  created_at: string;

  @Column()
  created_by: string;

  @Column()
  expires_at: Date;
}

export type Role = 'admin' | 'guest' | 'premium_user' | 'standard_user';
