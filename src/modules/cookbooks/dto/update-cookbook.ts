import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCookbookDto } from "./create-cookbook.dto";

export class UpdateCookbookDto extends PartialType(CreateCookbookDto) {
  @ApiProperty({ description: "ID" })
  id: number;
}
