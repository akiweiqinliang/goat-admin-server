import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auths/auth.module";
import { CatsModule } from "./modules/cats/cats.module";

import { TypeOrmModule } from "@nestjs/typeorm";
import { env } from "./config";
import { CookbookModule } from "./modules/cookbooks/cookbook.module";
@Module({
  imports: [
    TypeOrmModule.forRoot(env.DATABASE_CONFIG),
    UsersModule,
    AuthModule,
    CatsModule,
    CookbookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
