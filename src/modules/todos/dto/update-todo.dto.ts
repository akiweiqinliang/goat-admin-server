import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateTodoDto } from "./create-todo.dto";

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({ description: "ID", example: 1 })
  id: number;
}
