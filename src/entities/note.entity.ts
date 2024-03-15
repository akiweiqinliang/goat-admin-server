import { Base } from "../common/entity/base.entity";
import { Column, Entity } from "typeorm";
@Entity("note")
export class NoteEntity extends Base {
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  tag: string;
  @Column({ name: "tag_id" })
  tagId: number;
  @Column({ name: "tag_type", default: 1 })
  tagType: number;
  @Column({ type: "text" })
  detail: string;
}
