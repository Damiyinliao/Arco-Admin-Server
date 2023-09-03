// src/dto/user.ts
import { Rule, RuleType } from '@midwayjs/validate';
import { R } from '../common/base.error.util';

export class UserDTO {
  @Rule(RuleType.allow(null))  // id不能为空，并且是数字
  id: string;

  @Rule(RuleType.string().required().error(R.validateError('姓名不能为空')))
  name: string;

  @Rule(RuleType.number().max(60))     // 年龄字段必须是数字，并且不能大于60
  age: number;

  @Rule(RuleType.string().allow(null)) // 描述可以为空
  description: string;
}
