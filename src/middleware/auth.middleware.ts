import { IMiddleware, Inject, Middleware, MidwayWebRouterService, RouterInfo } from "@midwayjs/core";
import { Context, NextFunction } from "@midwayjs/koa";
import { RedisService } from "@midwayjs/redis";
import { R } from "../common/base.error.util";

@Middleware()
export class AuthMiddleWare implements IMiddleware<Context, NextFunction> {
  @Inject()
  redisService: RedisService; // redis服务

  @Inject()
  webRouteService: MidwayWebRouterService; // 路由服务

  @Inject()
  notLoginRouters: RouterInfo[];  // 不需要登录的路由

  // 判断如果当前接口在白名单中，则直接跳过不鉴权
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const routeInfo = await this.webRouteService.getMatchedRouterInfo(ctx.path, ctx.method); // 获取到当前路由信息

      // 如果当前路由在不需要登录的路由中，则直接跳过
      if (!routeInfo) {
        await next();
        return;
      }

      // 如果当前路由在不需要登录的路由中，则直接跳过
      if (this.notLoginRouters.some(router => router.requestMethod === routeInfo.requestMethod && router.url === routeInfo.url)) {
        await next();
        return;
      }

      const token = ctx.request.header['authorization']?.replace('Bearer ', ''); // 获取token
      if (!token) {
        throw R.unauthorizedError('未授权');
      }

      const userInfoStr = await this.redisService.get(`token:${token}`); // 从redis中获取用户信息
      if (!userInfoStr) {
        throw R.unauthorizedError('未授权');
      }

      const userInfo = JSON.parse(userInfoStr); // 将用户信息转为对象
      ctx.userInfo = userInfo; // 将用户信息挂载到ctx上
      ctx.token = token; // 将token挂载到ctx上

      await next();
    }
  }

  // 获取中间件名称
  static getName(): string {
    return 'auth'
  }
}
