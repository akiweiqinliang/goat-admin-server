import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Result } from "../../common/dto/result.dto";
import { ErrorCode } from "../../common/exception/error.code";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoService } from "./todo.service";

@ApiTags("todo管理")
@Controller("todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Post("create")
  @ApiOperation({ summary: "新增learn note" })
  async create(@Body() createNoteDto: CreateTodoDto) {
    await this.todoService.create(createNoteDto);
    return new Result().ok();
  }
  @Delete(":id")
  @ApiOperation({ summary: "删除todo" })
  async remove(@Param("id") id: number) {
    const todo = await this.todoService.findById(id);
    if (!todo) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        "记录不存在",
      );
    }
    todo.delFlag = 1;
    await this.todoService.update(todo);
    return new Result().ok();
  }
  @Get(":id")
  async findOne(@Param("id") routerId: number) {
    const todo = await this.todoService.findById(routerId);
    if (!todo) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        "记录不存在",
      );
    }
    const { id, title, detail } = todo;
    const todoData = {
      id,
      title,
      detail,
    };
    return new Result().ok(todoData);
  }
  @Get()
  async findAll() {
    const result = await this.todoService.findAll();
    return new Result().ok(result);
  }
}
