import { ApiProperty, PartialType } from "@nestjs/swagger";
import { PaginationDTO } from "../../../common/dto/pagination.dto";

export class ListNoteDto extends PartialType(PaginationDTO) {
  @ApiProperty({
    description: "tag id -- 1: 前端学习 2：后端学习",
    required: false,
  })
  tagId?: number;
  @ApiProperty({ required: false })
  title?: string;
}
