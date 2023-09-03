import { Config, Inject } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';
import { R } from '../../../common/base.error.util';
import { uuid } from '../../../utils/uuid';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserEntity } from '../../user/entity/user';
import { Repository } from 'typeorm';
import { TokenConfig } from '../../../interface';
import { Context } from 'koa';
import { LoginDTO } from '../dto/login';
import { TokenVO } from '../vo/token';

export class AuthService {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>; // 用户模型
  @Inject()
  redisService: RedisService; // redis服务
  @Config()
  tokenConfig: TokenConfig; // token配置
  @Inject()
  ctx: Context; // 上下文

  async login(loginDTO: LoginDTO): Promise<TokenVO> {
    try {
      const { account, password } = loginDTO;
      const user = await this.userModel
        .createQueryBuilder('user')
        .where('user.account = :account', { account })
        .select(['user.id', 'user.account', 'user.password'])
        .getOne();

        if (!user) {
          throw R.error('用户名或密码错误');
        }

        const { expire, refreshExpire } = this.tokenConfig;
        const token = uuid();
        const refreshToken = uuid();

        return {
          expire,
          token,
          refreshExpire,
          refreshToken
        } as TokenVO;
    } catch (error) {
      throw R.error(error.message);
    }

  }

  // async refreshToken(refreshToken): Promise<TokenVO> {
  //   const userId = await this.redisService.get(`refreshToken:${refreshToken.refreshToken}`);

  //   if (!userId) {
  //     throw R.error('刷新Token失败');
  //   }

  //   const { expire } = this.tokenConfig;
  //   const token = uuid();

  //   await this.redisService
  //     .multi()
  //     .set(`token:${token}`, userId)
  //     .expire(`token:${token}`, expire)
  //     .exec();

  //   const refreshExpire = await this.redisService.ttl(`refreshToken:${refreshToken.refreshToken}`);

  //   return {
  //     expire,
  //     token,
  //     refreshToken: refreshToken.refreshToken,
  //     refreshExpire,
  //   } as TokenVO;
}
