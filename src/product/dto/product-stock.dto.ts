import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class ProductStockDto {
  @IsString()
  @IsNotEmpty()
  color : string
  
  @IsString()
  @IsNotEmpty()
  size : string
  
  @IsNumber()
  @IsNotEmpty()
  stock : number

}