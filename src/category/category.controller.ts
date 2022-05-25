import { Controller, Get, HttpCode, HttpStatus, Post, Body, Delete, Query, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { throws } from 'assert';
import { Helper } from 'common/helpers';
import { diskStorage } from 'multer';
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
  @UseInterceptors(
    FileInterceptor(
      "file", {
        storage : diskStorage({
          destination : Helper.destinationPath,
          filename: Helper.customFileName,
        }),
        fileFilter : Helper.fileFilter
      }
    )
  )
  createCategory(@Body() dto : CategoryDto, @UploadedFile() file : Express.Multer.File) {
    return this.categoryService.createCategory(dto, file)
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  deleteCategory(@Query() deleteCategoryById : DeleteCategoryByIdQuery) {
    return this.categoryService.deleteCategory(deleteCategoryById);
  }
}
