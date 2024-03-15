import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Public } from "../../common/decorator/public.decorator";
import { Result } from "../../common/dto/result.dto";
import { NoteService } from "./note.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { ListNoteDto } from "./dto/list-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { ErrorCode } from "../../common/exception/error.code";
import { UpdateUserDto } from "../users/dto/update-user.dto";
@Public()
@ApiTags("学习知识管理")
@Controller("notes")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}
  @Post("create")
  @ApiOperation({ summary: "新增learn note" })
  async create(@Body() createNoteDto: CreateNoteDto) {
    const note = await this.noteService.findByTitle(createNoteDto.title);
    if (note) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        "标题已存在",
      );
    }
    await this.noteService.create(createNoteDto);
    return new Result().ok();
  }
  @Get(":id")
  @ApiOperation({ summary: "根据id获取note详情" })
  async findById(@Param("id") id: number) {
    const note = await this.noteService.findById(id);
    return new Result().ok(note);
  }
  @Put("update/:id")
  @ApiOperation({ summary: "修改note信息" })
  async update(@Body() updateNoteDto: UpdateNoteDto) {
    await this.noteService.update(updateNoteDto);
    return new Result().ok();
  }
  @Delete(":id")
  @ApiOperation({ summary: "删除note信息" })
  async remove(@Param("id") id: number) {
    const note = await this.noteService.findById(id);
    if (!note) {
      return new Result().error(
        new ErrorCode().INTERNAL_SERVER_ERROR,
        "记录不存在",
      );
    }
    note.delFlag = 1;
    await this.noteService.update(note);
    return new Result().ok();
  }
  @Get()
  @ApiOperation({ summary: "获取note列表" })
  async findNotesById(@Query() listNoteDto: ListNoteDto) {
    const noteList = await this.noteService.findNoteListById(listNoteDto);
    return new Result().ok(noteList);
  }
  @Get("/ab/abc")
  test() {
    console.log("111111111");
    return new Result().ok("abc");
  }
  @Get("/find/findListByTitle")
  @ApiOperation({ summary: "title模糊查询note列表" })
  async findByTitle(@Query() listNoteDto: ListNoteDto) {
    console.log(listNoteDto);
    const noteList = await this.noteService.findNoteListByTitle(listNoteDto);
    if (noteList) {
      return new Result<UpdateNoteDto>().ok(noteList);
    }
  }
}
