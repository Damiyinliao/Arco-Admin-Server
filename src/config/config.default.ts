import { MidwayConfig } from '@midwayjs/core';
import path = require('path');

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1692176181257_964',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        /**
         * 表单数据实例
         */
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'db_test', // 数据库名称
        synchronize: true, // 自动同步数据库
        logging: false, // 打印日志
        entities: ['**/entity/*.entity{.ts,.js}'],
        // entities: [path.join(__dirname, '../entity/*.entity{.ts,.js}')]
        // entities: [User]
      },
    },
  },
  redis: {
    client: {
      port: 6379,
      host: 'localhost',
      password: '123456',
      db: 0
    }
  },
  i18n: {
    // 把你的翻译文本放到这里
    localeTable: {
      en_US: require('../locales/en_US'),
      zh_CN: require('../locales/zh_CN'),
    },
  }
} as MidwayConfig;
