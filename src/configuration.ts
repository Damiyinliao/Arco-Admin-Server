import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as cache from '@midwayjs/cache';
import * as orm from '@midwayjs/typeorm';
import * as redis from '@midwayjs/redis';
// import * as swagger from '@midwayjs/swagger';
import * as i18n from '@midwayjs/i18n';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { ValidateErrorFilter } from './filter/validate.filter';
import { CommonErrorFilter } from './filter/common.filter'
import { NotFoundFilter } from './filter/notfound.filter';

@Configuration({
  imports: [
    koa,
    validate,  // 参数校验
    orm,  // orm
    redis, // redis
    i18n, // 国际化
    // {
    //   component: swagger, // swagger展示没有配置成功 未知原因
    //   enabledEnvironment: ['local']
    // },
    cache, // 缓存
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter 注册过滤器
    this.app.useFilter([
      ValidateErrorFilter,
      CommonErrorFilter,
      NotFoundFilter,
      // UnauthorizedErrorFilter // TODO 未授权
    ]);
  }
}
