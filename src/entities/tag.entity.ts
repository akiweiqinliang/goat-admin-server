import { Base } from "../common/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity("tag")
export class TagEntity extends Base {
  @Column({ name: "tag_type", comment: "0: cookbook， 1：learnNote ..." })
  tagType: number;
  @Column({ name: "tag_type_value" })
  tagTypeValue: string;
  @Column({ type: "varchar", length: 30 })
  value: string;
  @Column({ name: "tag_id" })
  tagId: number;
}
