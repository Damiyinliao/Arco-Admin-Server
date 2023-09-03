import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../entity/base.entity";

@Entity('sys_user')
export class UserEntity extends BaseEntity {
  @Column({ comment: '用户名称'})
  userName: string;

  @Column({ comment: '用户昵称' })
  nickName: string;

  @Column({ comment: '用户密码' })
  password: string;

  @Column({ comment: '性别（0：女，1：男', nullable: true }) // nullable: true 表示该字段可以为空
  sex?: number;

  @Column({ comment: '用户邮箱', nullable: true })
  email?: string;

  @Column({ comment: '用户手机', nullable: true })
  phone?: string;

  @Column({ comment: '用户头像', nullable: true })
  avatar?: string;

  @Column({ comment: '用户状态', nullable: true })
  status?: number;

  @Column({ comment: '用户备注', nullable: true })
  remark?: string;
}
