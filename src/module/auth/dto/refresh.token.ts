import { Rule, RuleType } from "@midwayjs/validate";

export class RefreshTokenDTO {
  @Rule(RuleType.allow(null))
  refreshToken: string;
}
