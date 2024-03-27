import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards, Delete, Param
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Result } from "src/common/dto/result.dto";
import { CreateCookbookDto } from "./dto/create-cookbook.dto";
import { ListCookbookDto } from "./dto/list-cookbook.dto";
import { CookbookService } from "./cookbook.service";
import { UpdateCookbookDto } from "./dto/update-cookbook";
import { QiniuService } from "../upload/upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import * as fs from "fs";
import { ErrorCode } from "../../common/exception/error.code";
@Controller("cookbooks")
@ApiTags("菜谱管理")
export class CookbookController {
  private deleteLocalFile(filePath: string) {
    fs.unlink(filePath, (err) => {
      if (err) {
        throw err;
      } else {
        console.log("File deleted successfully");
      }
    });
  }
  constructor(
    private readonly cookbookService: CookbookService,
    private readonly qiniuService: QiniuService,
  ) {}

  @Post("create")
  @ApiOperation({ summary: "新增菜谱" })
  async create(@Body() createCookbookDto: CreateCookbookDto) {
    // console.log(createCookbookDto);
    await this.cookbookService.create(createCookbookDto);
    return new Result().ok();
  }
  @Delete(":id")
  @ApiOperation({ summary: "删除note信息" })
  async remove(@Param("id") id: number) {
    const cookbook = await this.cookbookService.findById(id);
    if (!cookbook) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        "记录不存在",
      );
    }
    cookbook.delFlag = 1;
    await this.cookbookService.update(cookbook);
    return new Result().ok();
  }
  @Get("findById")
  @ApiOperation({ summary: "根据id查询单个菜谱" })
  async findById(@Query("id") id: number) {
    const cookbook = await this.cookbookService.findById(id);
    return new Result().ok(cookbook);
  }
  @Get()
  @ApiOperation({ summary: "查询菜谱列表" })
  async findAll(@Query() listCookbookDto: ListCookbookDto) {
    const cookbookList = await this.cookbookService.findAll(listCookbookDto);
    return new Result<UpdateCookbookDto>().ok(cookbookList);
  }
  @Get("byCatId")
  @ApiOperation({ summary: "根据分类id获取中/西餐列表" })
  async getListByCatId(@Query() listCookbookDto: ListCookbookDto) {
    console.log(listCookbookDto);
    const foodList = await this.cookbookService.getListByCatId(listCookbookDto);
    return new Result<UpdateCookbookDto>().ok(foodList);
  }
  @Get("findByTagId")
  @ApiOperation({ summary: "根据tagId获取列表" })
  async findByTagId(@Query("tagId") tagId: number) {
    const foodList = await this.cookbookService.getListByTagId(tagId, 40);
    return new Result<UpdateCookbookDto>().ok(foodList);
  }
  @Get("findByParams")
  @ApiOperation({
    summary: "根据参数获取列表",
    description: "这个接口接收参数格式为object，可接收单个或多个参数。",
  })
  async findByParams(
    @Query("title") title?: string,
    @Query("tagId") tagId?: number,
    @Query("tag") tag?: string,
    @Query("category") category?: number,
    @Query("limit") limit?: number,
    @Query("page") page?: number,
    @Query("pageSize") pageSize?: number,
  ) {
    const queryOptions = {
      title,
      tagId,
      tag,
      category,
      limit,
      page,
      pageSize,
    };
    const foodList = await this.cookbookService.getListByParams(queryOptions);
    return new Result<UpdateCookbookDto>().ok(foodList);
  }
  @Post("upload")
  @ApiOperation({ summary: "上传图片" })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "src/upload/images",
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async UploadedFile(@UploadedFile() file: any) {
    const result = await this.qiniuService.uploadFile(file, file.filename);
    const cloudFileName = `http://s9ghc8e7z.hd-bkt.clouddn.com/${result.data.key}`;
    // console.log(result);
    // 删除本地图片
    try {
      this.deleteLocalFile(file.path);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
    return new Result().ok(cloudFileName);
  }
}
