import { BaseDTO } from "../../../common/dto/base.dto";
import { ApiProperty } from "@nestjs/swagger";
export class CreateNoteDto extends BaseDTO {
  @ApiProperty({
    example: "画正方形的几种方法",
  })
  title: string;
  @ApiProperty({
    description: "简介",
    example: "爱写不写",
  })
  description: string;
  @ApiProperty({ description: "tag文本内容", example: "前端学习" })
  tag: string;
  @ApiProperty({
    description: "tag标签id, 1： 前端学习， 2：后端学习",
    example: 1,
  })
  tagId: number;
  @ApiProperty({
    description: "tag标签类别id，默认是learnNote => 1",
    example: 1,
  })
  tagType: number;
  @ApiProperty({
    description: "详情内容富文本",
    example: "<p>哈哈</p>",
  })
  detail: string;
}
