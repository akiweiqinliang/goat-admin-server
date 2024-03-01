import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cookbook } from "../../entities/cookbook.entity";
import { CookbookController } from "./cookbook.controller";
import { CookbookService } from "./cookbook.service";
import { UpYunService } from "../../common/upload0/upload.service";
import { QiniuService } from "../upload/upload.service";

@Module({
  imports: [TypeOrmModule.forFeature([Cookbook])],
  controllers: [CookbookController],
  providers: [CookbookService, QiniuService, UpYunService],
})
export class CookbookModule {}
