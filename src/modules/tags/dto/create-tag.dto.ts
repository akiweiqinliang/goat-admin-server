import { BaseDTO } from "../../../common/dto/base.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTagDto extends BaseDTO {
  @ApiProperty({
    description: "tag类型，0： cookbook， 1： learnNote",
    example: 0,
  })
  tagType: number;
  @ApiProperty({
    description: "tag类型的标签",
    example: "cookbook",
  })
  tagTypeValue: string;
  @ApiProperty({ description: "tag文本内容", example: "懒人快手" })
  value: string;
  @ApiProperty({
    description: "tag标签id, 1： 懒人快手， 2：清淡饮食",
    example: 1,
  })
  tagId: number;
}
