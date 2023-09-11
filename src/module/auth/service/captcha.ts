import { Config, Inject, Provide, Scope, ScopeEnum } from "@midwayjs/core";
import { CacheManager } from "@midwayjs/cache";
import * as svgCaptcha from "svg-captcha";
import * as svgBase64 from "mini-svg-data-uri";
import { CaptchaOptions, FormulaCaptchaOptions } from "../interface";
import { uuid } from "../../../utils/uuid";

@Provide()
@Scope(ScopeEnum.Singleton) // Singleton 单例模式，每次请求都是同一个实例
export class CaptchaService {
  @Inject()
  cacheManager: CacheManager;

  @Config("captcha")
  captcha: CaptchaOptions;

  async create(options?: FormulaCaptchaOptions) {
    const { data, text } = svgCaptcha.createMathExpr(options); // 生成验证码
    const id = await this.set(text); // 将验证码存储到缓存中
    const imageBase64 = svgBase64(data); // 将svg图片转换为base64
    return { id, imageBase64 };
  }

  // 将验证码存储到缓存中，以便后续验证
  async set(text: string): Promise<string> {
    console.log('text', text)
    console.log('captcha', this.captcha)
    const id = uuid();
    await this.cacheManager.set(
      this.getStoreId(id),
      (text || '').toLowerCase(),
      { ttl: this.captcha?.expirationTime || 60 * 60 } // 1h
    );
    return id
  }

  private getStoreId(id: string): string {
    // 如果没有前缀，直接返回
    if (!this.captcha?.idPrefix) {
      console.log('id', id)
      return id;
    }
    return `${this.captcha.idPrefix}:${id}`; // captcha:uuid
  }
}
