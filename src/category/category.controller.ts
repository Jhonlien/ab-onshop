import { Controller, Get, HttpCode, HttpStatus, Post, Body, Delete, Query, Param } from '@nestjs/common';
import { throws } from 'assert';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';
import { DeleteCategoryByIdQuery } from './query';

@Controller('categories')
export class CategoryController {
  
  constructor(
    private categoryService : CategoryService
  ){}
  
  @Get()
  @HttpCode(HttpStatus.OK)
  getCategory() {
    return this.categoryService.getCategory()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getCategoryById(@Param('id') id) {
    return this.categoryService.getCategoryById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCategory(@Body() dto : CategoryDto) {
    return this.categoryService.createCategory(dto)
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  deleteCategory(@Query() deleteCategoryById : DeleteCategoryByIdQuery) {
    return this.categoryService.deleteCategory(deleteCategoryById);
  }
}
