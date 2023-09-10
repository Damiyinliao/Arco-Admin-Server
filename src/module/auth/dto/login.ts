import { Rule, RuleType } from "@midwayjs/validate";
import { requiredString } from "../../../common/validate.rules";
import { R } from "../../../common/base.error.util";

export class LoginDTO {
  @Rule(requiredString.error(R.validateError('登录账号不能为空')))
  username: string; // 登录账号

  @Rule(requiredString.error(R.validateError('登录密码不能为空')))
  password: string; // 登录密码

  // @Rule(RuleType.string())
  // captchaId: string; // 验证码key

  // @Rule(requiredString.error(R.validateError('验证码不能为空')))
  // code: string; // 验证码

  // @Rule(requiredString.error(R.validateError('公钥不能为空')))
  // publicKey: string; // 公钥
}
