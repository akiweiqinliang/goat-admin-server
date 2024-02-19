import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
} from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatsService } from "./cats.service";

@Controller("cats")
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  @HttpCode(204)
  @Header("Cache-Control", "none")
  create1(): string {
    return "This action adds a new cat";
  }

  @Get()
  findAll1(): string {
    return "This action returns all cats";
  }
  @Get(":id")
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
  @Get()
  async findAll(): Promise<any[]> {
    return this.catsService.findAll();
  }
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
    return "This action adds a new cat";
  }
}
