import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Result } from "src/common/dto/result.dto";
import { ErrorCode } from "src/common/exception/error.code";
import { CreateCookbookDto } from "./dto/create-cookbook.dto";
import { ListCookbookDto } from "./dto/list-cookbook.dto";
import { CookbookService } from "./cookbook.service";
import { UpdateCookbookDto } from "./dto/update-cookbook";
@Controller("cookbooks")
@ApiTags("菜谱管理")
export class CookbookController {
  constructor(private readonly cookbookService: CookbookService) {}
  @Post("create")
  @ApiOperation({ summary: "新增菜谱" })
  async create(@Body() createCookbookDto: CreateCookbookDto) {
    await this.cookbookService.create(createCookbookDto);
    return new Result().ok();
  }
  @Get()
  @ApiOperation({ summary: "查询菜谱列表" })
  async findAll(@Query() listCookbooKDto: ListCookbookDto) {
    const cookbookList = await this.cookbookService.findAll(listCookbooKDto);
    return new Result<UpdateCookbookDto>().ok(cookbookList);
  }
  @Get("byCatId")
  @ApiOperation({ summary: "根据分类id获取中/西餐列表" })
  async getListByCatId(@Query() listCookbooKDto: ListCookbookDto) {
    const foodList = await this.cookbookService.getListByCatId(listCookbooKDto);
    return new Result<UpdateCookbookDto>().ok(foodList);
  }
}
