import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber,  IsString, IsArray, ValidateNested, ArrayMinSize, IsUUID } from "class-validator";
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
  price : number

  @IsUUID()
  @IsNotEmpty()
  category_id : string

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ProductStockDto)
  product_stock : ProductStockDto[]
}

export class updateProductDto {
  
}