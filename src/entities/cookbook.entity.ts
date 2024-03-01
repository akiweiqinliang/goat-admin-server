import { Base } from "src/common/entity/base.entity";
import { Entity, Column } from "typeorm";

@Entity("cookbook")
export class Cookbook extends Base {
  @Column()
  title: string;

  @Column()
  tag: string;
  @Column({ name: "tag_id" })
  tagId: number; // 标签id
  @Column({ name: "tag_type", default: 0 })
  tagType: number;
  @Column({ name: "img_url" })
  imgUrl: string;
  @Column()
  category: number; // 中餐0 西餐1
  @Column({
    type: "text",
    name: "cooking_way",
  })
  cookingWay: string;
  @Column()
  description: string;
}
