import { Get, Post, Body, ALL, Inject, Provide, Controller } from '@midwayjs/decorator';
import { AuthService } from '../service/auth';
import { LoginDTO } from '../dto/login';
import { NotLogin } from '../../../decorator/notlogin.decorator';

@Provide()
@Controller('/auth', { description: '权限管理' })
export class AuthController {
  @Inject()
  authService: AuthService;

  @Post('/login', { description: '登录' })
  @NotLogin()
  async login(@Body(ALL) loginDTO: LoginDTO) {
    // console.log('loginDTO', loginDTO);
    return await this.authService.login(loginDTO);
  }

}
