import { ApiProperty, PartialType } from "@nestjs/swagger";
import { PaginationDTO } from "../../../common/dto/pagination.dto";

export class ListTagDto extends PartialType(PaginationDTO) {
  @ApiProperty({ description: "tag type id -- 0: cookbook" })
  tagType: number;
}
