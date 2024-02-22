import { ApiProperty, PartialType } from "@nestjs/swagger";
import { PaginationDTO } from "src/common/dto/pagination.dto";

export class ListCookbookDto extends PartialType(PaginationDTO) {
  @ApiProperty({ description: "用户名", required: false })
  userName?: string;
  @ApiProperty({ description: "食谱大分类", required: false })
  categoryId?: number;
}
