import { Get, Post, Body, ALL, Inject, Provide, Controller } from '@midwayjs/decorator';
import { AuthService } from '../service/auth';
import { LoginDTO } from '../dto/login';
import { NotLogin } from '../../../decorator/notlogin.decorator';
import { CaptchaService } from '../service/captcha';

@Provide()
@Controller('/auth', { description: '权限管理' })
export class AuthController {
  @Inject()
  authService: AuthService;
  @Inject()
  captchaService: CaptchaService;

  @Post('/login', { description: '登录' })
  @NotLogin()
  async login(@Body(ALL) loginDTO: LoginDTO) {
    // console.log('loginDTO', loginDTO);
    return await this.authService.login(loginDTO);
  }

  @Get('/captcha', { description: '获取验证码' })
  @NotLogin()
  async getImageCaptcha() {
    const { id, imageBase64 } = await this.captchaService.create({
      height: 40,
      width: 120,
      noise: 2,
      color: true
    });
    return { id, imageBase64 };
  }

}
