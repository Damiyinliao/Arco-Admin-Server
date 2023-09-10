import { Config, Inject, Provide } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';
import { R } from '../../../common/base.error.util';
import { uuid } from '../../../utils/uuid';
import { InjectEntityModel } from '@midwayjs/typeorm';
// import { UserEntity } from '../../user/entity/user';
import { User } from '../../../entity/user.entity';
import { Repository } from 'typeorm';
import { TokenConfig } from '../../../interface';
import { Context } from 'koa';
import { LoginDTO } from '../dto/login';
import { TokenVO } from '../vo/token';

@Provide()
export class AuthService {
  @InjectEntityModel(User)
  userModel: Repository<User>; // 用户模型
  @Inject()
  redisService: RedisService; // redis服务
  @Config()
  tokenConfig: TokenConfig; // token配置
  @Inject()
  ctx: Context; // 上下文

  async login(loginDTO: LoginDTO): Promise<any> {
    try {
      const { username, password } = loginDTO;

      console.log('username', username, password);
      const user = await this.userModel
        .createQueryBuilder('user')
        .where('user.username = :username', { username })
        .select(['user.id', 'user.username', 'user.password'])
        .getOne();

        if (!user) {
          throw R.error('用户名不存在');
        }

        if (user.password !== password) {
          throw R.error('密码错误');
        }

        const { expire, refreshExpire } = this.tokenConfig;
        const token = uuid();
        const refreshToken = uuid();

        await this.redisService
          .multi()
          .set(`token:${token}`, JSON.stringify({ userId: user.id, refreshToken })) // 存储token
          .expire(`token:${token}`, expire) // 设置过期时间
          .set(`refreshToken:${refreshToken}`, user.id) // 存储refreshToken
          .expire(`refreshToken:${refreshToken}`, refreshExpire) // 设置过期时间
          .sadd(`userToken_${user.id}`, token) // 存储用户token
          .sadd(`userRefreshToken_${user.id}`, refreshToken) // 存储用户refreshToken
          .exec(); // 执行

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
