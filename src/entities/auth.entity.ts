import { Base } from "src/common/entity/base.entity";
import { Entity, Column } from "typeorm";

@Entity("admins")
export class Auth extends Base {
  @Column({ name: "user_name" })
  userName: string;

  @Column()
  password: string;
}
