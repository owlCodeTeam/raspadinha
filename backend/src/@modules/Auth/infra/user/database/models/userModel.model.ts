import { DeleteDateColumn, UpdateDateColumn, CreateDateColumn, Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('auth_users')
export class UserModel {
  @PrimaryColumn('uuid')
  uuid: string;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @DeleteDateColumn()
  deleted_at: Date;
  @Column()
  name: string;
  @Column()
  cpf: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ default: false })
  is_verify: boolean;
}
