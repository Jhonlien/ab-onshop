import { IsNumber, IsString, IsUUID } from "class-validator";

export class DeleteCategoryByIdQuery {
  @IsString()
  @IsUUID()
  id : string
}

export class FindCategoryByIdQuery extends DeleteCategoryByIdQuery {}
