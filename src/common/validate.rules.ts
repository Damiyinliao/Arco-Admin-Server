import { RuleType } from "@midwayjs/validate";

// 手机号
export const phone = RuleType.string().pattern(/^1[3456789]\d{9}$/);

// 邮箱
export const email = RuleType.string().email();

// 字符串
export const string = RuleType.string();

// 字符串不能为空
export const requiredString = string.required();

// 字符串最大长度
export const stringMax = (maxLength: number) => string.max(maxLength);

// 字符串最小长度
export const stringMin = (minLength: number) => string.min(minLength);

// 数字
export const number = RuleType.number();

// 数字不能为空
export const numberRequired = number.required();

// boolean
export const bool = RuleType.boolean();
