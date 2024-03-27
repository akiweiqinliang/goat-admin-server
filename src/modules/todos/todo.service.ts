import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TodoEntity } from "../../entities/todo.entity";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}
  // 新增
  async create(createTodoDto: CreateTodoDto): Promise<void> {
    createTodoDto.creator = "admin";
    createTodoDto.updater = "admin";
    await this.todoRepository.save(createTodoDto);
  }
  // 更新
  async update(updateTodoDto: UpdateTodoDto): Promise<void> {
    await this.todoRepository.update(updateTodoDto.id, updateTodoDto);
  }
  //   查询
  async findById(id: number): Promise<TodoEntity> {
    return await this.todoRepository.findOneBy({ id: id });
  }
  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository
      .createQueryBuilder("todo")
      .where({ delFlag: 0 })
      .orderBy({
        "todo.update_time": "DESC",
      })
      .select(["todo.id", "todo.title", "todo.detail"])
      .getMany();
  }
}
