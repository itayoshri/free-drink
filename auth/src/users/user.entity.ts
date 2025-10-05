import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: string;

  @Column()
  phone_number: string;

  @Column()
  role_key: string;

  @Column()
  created_token: string;

  @Column({ default: null })
  upgrade_token: string;

  @Column()
  created_at: string;

  @Column()
  password_hash: string;
}
