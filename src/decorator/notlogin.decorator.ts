import { ApplicationContext, Autoload, CONTROLLER_KEY, IMidwayContainer, Init, Inject, MidwayWebRouterService, Singleton, attachClassMetadata, getClassMetadata, listModule } from "@midwayjs/core";

export const NOT_LOGIN_KEY = 'decorator:not.login'; // 提供一个唯一的key

export function NotLogin(): MethodDecorator {
  return (target, key, descriptor: PropertyDescriptor) => {
    attachClassMetadata(NOT_LOGIN_KEY, { methodName: key }, target); // 通过attachClassMetadata方法将key和value绑定到target上
    return descriptor;
  }
}

@Autoload()
@Singleton()
export class NotLoginDecorator {
  @Inject() // 通过Inject方法获取到MidwayWebRouterService
  webRouterService: MidwayWebRouterService;
  @ApplicationContext() // 通过ApplicationContext方法获取到所有的service
  applicationContext: IMidwayContainer;

  @Init() // 通过Init方法获取到所有的controller
  async init() {
    const controllerModules = listModule(CONTROLLER_KEY); // 获取到所有的controller
    const whiteMethodList = []; // 存放所有的白名单
    for (const module of controllerModules) {
      const methodNames = getClassMetadata(NOT_LOGIN_KEY, module)  || []; // 获取到所有的白名单
      const className = module.name[0].toLowerCase() + module.name.slice(1); // 获取到类名
      whiteMethodList.push(...methodNames.map(method => `${className}.${method.methodName}`)); // 将类名和方法名拼接起来
    }

    const routerTables = await this.webRouterService.getFlattenRouterTable(); // 获取到所有的路由
    const whiteRouterList = routerTables.filter(router => whiteMethodList.includes(router.handlerName)); // 获取到所有的白名单路由
    this.applicationContext.registerObject('notLoginDecorator', whiteRouterList); // 将白名单路由注册到容器中
  }
}
