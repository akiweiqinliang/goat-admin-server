import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Result } from "../../common/dto/result.dto";
import { CreateTagDto } from "./dto/create-tag.dto";
import { TagService } from "./tag.service";
import { Public } from "../../common/decorator/public.decorator";

@Public()
@Controller("tags")
@ApiTags("标签管理")
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Post("create")
  @ApiOperation({ summary: "新增标签" })
  async create(@Body() createTagDto: CreateTagDto) {
    await this.tagService.create(createTagDto);
    return new Result().ok();
  }
  @Get()
  @ApiOperation({ summary: "获取标签列表" })
  async findTagsByType(@Query("tagType") tagType: number) {
    const tagList = await this.tagService.findAllByType(tagType);
    return new Result().ok({ records: tagList });
  }
}
