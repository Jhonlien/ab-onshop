import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber,  IsString, IsArray, ValidateNested, ArrayMinSize } from "class-validator";
import { ProductStockDto } from "./product-stock.dto";

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name : string

  @IsString()
  @IsNotEmpty()
  desc : string

  @IsNumber()
  @IsNotEmpty()
  price : string

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ProductStockDto)
  products_stocks : ProductStockDto[]
}