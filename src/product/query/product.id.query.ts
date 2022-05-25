import { IsNotEmpty, IsUUID } from "class-validator";


export class ProductIdQuery {
  @IsUUID()
  @IsNotEmpty()
  id : string
}