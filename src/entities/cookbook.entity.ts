import { Base } from "src/common/entity/base.entity";
import { Entity, Column } from "typeorm";

@Entity("cookbook")
export class Cookbook extends Base {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: "img_url" })
  imgUrl: string;

  @Column()
  category: number; // 中餐0 西餐1

  @Column({ name: "cooking_way" })
  cookingWay: string;
}
