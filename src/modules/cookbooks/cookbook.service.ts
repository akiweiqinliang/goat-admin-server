import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getPagination } from "src/common/utils/page.util";
import { Repository } from "typeorm";
import { Cookbook } from "../../entities/cookbook.entity";
import { CreateCookbookDto } from "./dto/create-cookbook.dto";
import { ListCookbookDto } from "./dto/list-cookbook.dto";
@Injectable()
export class CookbookService {
  constructor(
    @InjectRepository(Cookbook)
    private cookbookRepository: Repository<Cookbook>,
  ) {}
  async create(createCookbookDto: CreateCookbookDto): Promise<void> {
    createCookbookDto.updater = "admin";
    createCookbookDto.creator = "admin";
    await this.cookbookRepository.save(createCookbookDto);
  }
  // 查询分页
  async findAll(params): Promise<ListCookbookDto> {
    const { page = 1, pageSize = 10 } = params;
    const getList = this.cookbookRepository
      .createQueryBuilder("cookbook")
      .where({ delFlag: 0 })
      .orderBy({
        "cookbook.update_time": "DESC",
      })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const [list, total] = await getList;
    const pagination = getPagination(total, pageSize, page);
    return {
      records: list,
      ...pagination,
    };
  }
  // 查询分页 中西餐列表
  async getListByCatId(params): Promise<ListCookbookDto> {
    const { page = 1, pageSize = 10 } = params;
    const { categoryId } = params;
    const getList = this.cookbookRepository
      .createQueryBuilder("cookbook")
      .where({ category: categoryId, delFlag: 0 })
      .orderBy({
        "cookbook.update_time": "DESC",
      })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const [list, total] = await getList;
    const pagination = getPagination(total, pageSize, page);
    return {
      records: list,
      ...pagination,
    };
  }
}
