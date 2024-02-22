import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { env } from "./config";

const PORT = env.SERVICE_CONFIG.port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle("Api example")
    .setDescription("The API description")
    .setVersion("1.0")
    .addTag("Api/V1")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  // 配置 CORS
  const corsOptions: CorsOptions = {
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    // 允许其他需要的 CORS 选项
  };
  app.enableCors(corsOptions);
  await app.listen(PORT, () => {
    console.log(
      `${PORT === 3000 ? "(开发环境)" : "(生产环境)"}服务已经启动,接口请访问:http://localhost:${PORT}`,
    );
  });
}
bootstrap();
