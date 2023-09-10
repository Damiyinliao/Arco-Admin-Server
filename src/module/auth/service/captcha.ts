import { Inject } from "@midwayjs/core";

export class CaptchaService {
  @Inject()
  cacheManager: CacheManager;
}
