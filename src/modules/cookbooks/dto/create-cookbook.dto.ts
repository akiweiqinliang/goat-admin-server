import { ApiProperty } from "@nestjs/swagger";
import { BaseDTO } from "src/common/dto/base.dto";

export class CreateCookbookDto extends BaseDTO {
  @ApiProperty({ description: "食谱标题", example: "洋葱炒牛腩" })
  title: string;
  @ApiProperty({ description: "食谱简介", example: "懒人快手" })
  tag: string;
  @ApiProperty({ description: "标签id", example: "1" })
  tagId: number; // 标签id
  @ApiProperty({ description: "图片地址，可以为[]" })
  imgUrl: string;
  @ApiProperty({ description: "食谱类型" })
  category: number; // 中餐0 西餐1
  @ApiProperty({ description: "烹饪方式" })
  cookingWay: string;
}
