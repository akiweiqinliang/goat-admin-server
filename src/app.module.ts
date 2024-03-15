import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auths/auth.module";

import { TypeOrmModule } from "@nestjs/typeorm";
import { env } from "./config";
import { CookbookModule } from "./modules/cookbooks/cookbook.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./common/guards/auth.guard";
import { TagModule } from "./modules/tags/tag.module";
import { NoteModule } from "./modules/notes/note.module";
@Module({
  imports: [
    TypeOrmModule.forRoot(env.DATABASE_CONFIG),
    UsersModule,
    AuthModule,
    CookbookModule,
    TagModule,
    NoteModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
