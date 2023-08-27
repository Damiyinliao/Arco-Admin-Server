import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn() // 主键自增列
  id: number;

  @Column({ length: 50, comment: '姓名' }) // 长度为50的字符串列
  name: string;

  @Column({ comment: '描述' }) // text列
  description: string;

  @Column({ comment: '年龄' }) // 列
  age: number;

  @CreateDateColumn({ comment: '创建日期', type: 'timestamp' })
  createDate: Date;

  @UpdateDateColumn({ comment: '更新日期', type: 'timestamp' })
  updateDate: Date;
}
