import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('access_tokens')
export class AccessToken {
  @PrimaryColumn()
  user_id: number;

  @Column()
  access_token: string;

  @Column()
  created_at: string;

  @OneToOne(() => User, (user) => user.accessToken, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'user_id',
  })
  user: User;
}
