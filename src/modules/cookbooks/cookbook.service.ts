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
  // 查询单个菜谱
  async findById(id: number): Promise<CreateCookbookDto> {
    return await this.cookbookRepository.findOneBy({ id: id });
  }
  // tagId查列表
  async getListByTagId(
    tagId: number,
    limitNumber?: number,
  ): Promise<ListCookbookDto> {
    const getList = this.cookbookRepository
      .createQueryBuilder("cookbook")
      .where({ delFlag: 0, tagId: tagId })
      .orderBy({
        "cookbook.update_time": "DESC",
      });
    if (!limitNumber) {
    } else {
      getList.limit(limitNumber);
    }
    const [list] = await getList.getManyAndCount();
    return {
      records: list,
    };
  }
  async getListByParams(queryOptions: {
    title?: string;
    tagId?: number;
    tag?: string;
    category?: number;
    limit?: number;
    page?: number;
    pageSize?: number;
  }): Promise<ListCookbookDto> {
    const { title, tagId, tag, category, limit, page, pageSize } = queryOptions;
    const queryBuilder = this.cookbookRepository
      .createQueryBuilder("cookbook")
      .where({ delFlag: 0 });
    if (page && pageSize) {
      queryBuilder.skip((page - 1) * pageSize).take(pageSize);
    }
    if (title) {
      queryBuilder.andWhere("cookbook.title LIKE :title", {
        title: `%${title}%`,
      });
    }
    if (tagId) {
      queryBuilder.andWhere("cookbook.tagId = :tagId", { tagId });
    }
    if (tag) {
      queryBuilder.andWhere("cookbook.tag = :tag", { tag });
    }
    if (category !== undefined) {
      queryBuilder.andWhere("cookbook.category = :category", { category });
    }
    queryBuilder.orderBy("cookbook.update_time", "DESC");
    if (limit) {
      queryBuilder.limit(limit);
    }

    const [list, total] = await queryBuilder.getManyAndCount();
    const pagination = getPagination(total, pageSize, page);
    return {
      records: list,
      ...pagination,
    };
  }
}
