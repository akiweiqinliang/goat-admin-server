import { BaseDTO } from "../../../common/dto/base.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoDto extends BaseDTO {
  @ApiProperty({
    example: "拿快递",
  })
  title: string;
  @ApiProperty({
    example: "5栋蜂巢",
  })
  detail: string;
}
