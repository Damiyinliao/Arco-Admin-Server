import { Controller, Get, Post, Inject, Body } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { RedisService } from '@midwayjs/redis';
import { MidwayI18nService } from '@midwayjs/i18n';
import { UserDTO } from '../dto/user.dto';
import { CommonError } from '../common/common.error';
import { ILogger } from '@midwayjs/logger';
import { R } from '../common/base.error.util';

@Controller('/')
export class HomeController {
  // 自动注入模型
  @InjectEntityModel(User)
  userModel: Repository<User>;

  // 自动注入redis服务
  @Inject()
  redisService: RedisService;

  // 自动注入i18n服务
  @Inject()
  i18nService: MidwayI18nService;

  @Inject()
  logger: ILogger;

  // @Get('/')
  // async home(@Body() user: UserDTO): Promise<void> {
  //   this.logger.info('hello');
  //   console.log(user)
  // }

  @Post('/')
  async home(): Promise<void> {
    // this.logger.info('hello');
    // console.log(user)
    throw R.error('error');
  }
}
