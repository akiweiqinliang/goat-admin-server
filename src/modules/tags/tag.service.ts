import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TagEntity } from "../../entities/tag.entity";
import { Repository } from "typeorm";
import { CreateTagDto } from "./dto/create-tag.dto";
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagsRepository: Repository<TagEntity>,
  ) {}
  async create(createTagDto: CreateTagDto): Promise<void> {
    createTagDto.creator = "admin";
    createTagDto.updater = "admin";
    await this.tagsRepository.save(createTagDto);
  }
  async findAllByType(tagType: number): Promise<CreateTagDto[]> {
    const getList = this.tagsRepository
      .createQueryBuilder("tag")
      .where({ delFlag: 0, tagType: tagType })
      .select([
        "tag.id",
        // "tag.tagType",
        // "tag.tagTypeValue",
        "tag.tagId",
        "tag.value",
      ])
      // .orderBy({
      //   "tag.create_time": "DESC",
      // })
      .getManyAndCount();
    const [list] = await getList;
    return list;
  }
}
