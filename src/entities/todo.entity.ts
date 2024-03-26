import { Base } from "../common/entity/base.entity";
import { Column, Entity } from "typeorm";
@Entity("todo")
export class TodoEntity extends Base {
  @Column()
  title: string;
  @Column()
  detail: string;
}
