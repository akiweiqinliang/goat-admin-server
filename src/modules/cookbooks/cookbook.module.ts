import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cookbook } from "../../entities/cookbook.entity";
import { CookbookController } from "./cookbook.controller";
import { CookbookService } from "./cookbook.service";
import { QiniuService } from "../upload/upload.service";

@Module({
  imports: [TypeOrmModule.forFeature([Cookbook])],
  controllers: [CookbookController],
  providers: [CookbookService, QiniuService],
})
export class CookbookModule {}
