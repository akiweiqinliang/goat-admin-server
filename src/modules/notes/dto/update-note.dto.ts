import { CreateNoteDto } from "./create-note.dto";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @ApiProperty({ description: "ID", example: 1 })
  id: number;
}
