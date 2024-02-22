export default {
  // 服务基本配置
  SERVICE_CONFIG: {
    // 端口
    port: 5000,
  },
  // 数据库配置
  DATABASE_CONFIG: {
    type: "mysql",
    host: "db4free.net",
    port: 3306,
    username: "akiweiqinliang",
    password: "lwq123456",
    database: "akilearndb",
    autoLoadEntities: true,
    synchronize: true,
  },
};
