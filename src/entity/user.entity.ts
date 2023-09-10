import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity('user')
export class User extends BaseEntity {

  @Column({ length: 50, comment: '姓名' }) // 长度为50的字符串列
  username: string;

  @Column({ length: 50, comment: '密码' }) // 长度为50的字符串列
  password: string;

  @Column({ comment: '描述' }) // text列
  description: string;

  @Column({ comment: '年龄' }) // 列
  age: number;
}
