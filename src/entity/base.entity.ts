import { PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';


export class BaseEntity {
  @PrimaryGeneratedColumn() // 自增长列
  id?: string;

  @CreateDateColumn({ comment: '创建时间', type: 'timestamp' })
  createTime: Date

  @UpdateDateColumn({ comment: '更新时间', type: 'timestamp' })
  updateTime: Date
}
