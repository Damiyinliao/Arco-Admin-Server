import { MidwayValidationError } from "@midwayjs/validate";
import { CommonError } from "./common.error";

export class R {
  static error(message: string): Error {
    return new CommonError(message);
  }

  static validateError(message: string) {
    return new MidwayValidationError(message, 422, null);
  }

  static unauthorizedError(message: string) {
    return new MidwayValidationError(message, 401, null);
  }
}
