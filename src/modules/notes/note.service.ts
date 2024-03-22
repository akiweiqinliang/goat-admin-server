import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NoteEntity } from "../../entities/note.entity";
import { Not, Repository } from "typeorm";
import { CreateNoteDto } from "./dto/create-note.dto";
import { ListNoteDto } from "./dto/list-note.dto";
import { getPagination } from "../../common/utils/page.util";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
  ) {}
  // 新增
  async create(cerateNoteDto: CreateNoteDto): Promise<void> {
    cerateNoteDto.creator = "admin";
    cerateNoteDto.updater = "admin";
    await this.noteRepository.save(cerateNoteDto);
  }
  // 根据title查询信息
  async findByTitle(title: string): Promise<NoteEntity> {
    const condition = { title: title };
    return await this.noteRepository.findOneBy(condition);
  }
  // 根据id查询
  async findById(id: number): Promise<NoteEntity> {
    return await this.noteRepository.findOneBy({ id: id });
  }
  // 更新
  async update(updateNoteDto: UpdateNoteDto): Promise<void> {
    await this.noteRepository.update(updateNoteDto.id, updateNoteDto);
  }
  // 查询列表
  async findNoteListById(params: object): Promise<ListNoteDto> {
    const { page = 1, pageSize = 10, tagId = 1 } = { ...params };
    const noteList = this.noteRepository
      .createQueryBuilder("note")
      .where({ tagId: tagId, delFlag: 0 })
      .orderBy({
        "note.update_time": "DESC",
      })
      .skip(page)
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    const [list, total] = await noteList;
    const pagination = getPagination(total, pageSize, page);
    return {
      records: list,
      ...pagination,
    };
  }
  // 名称模糊查询列表
  async findNoteListByTitle(params): Promise<ListNoteDto> {
    const { page = 1, pageSize = 10, title = "", tagId = 1 } = { ...params };
    const noteList = this.noteRepository
      .createQueryBuilder("note")
      .where({ delFlag: 0, tagId: tagId })
      .andWhere("note.title LIKE :title", { title: `%${title}%` })
      .orderBy({
        "note.update_time": "DESC",
      })
      // .skip(page)
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    const [list, total] = await noteList;
    const pagination = getPagination(total, pageSize, page);
    return {
      records: list,
      ...pagination,
    };
  }
}
