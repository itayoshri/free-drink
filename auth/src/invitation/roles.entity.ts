import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryColumn('text')
  role_key: string;

  @Column()
  display_name: string;

  @Column()
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  permissions: Record<string, Record<string, string>>;
}
