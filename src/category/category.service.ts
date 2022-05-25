import { Injectable, UnprocessableEntityException,} from '@nestjs/common';
import { ProductCategory } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto';
import { DeleteCategoryByIdQuery } from './query';

@Injectable()
export class CategoryService {

  constructor(
    private prisma : PrismaService
  ){}

  async getCategory() : Promise<ProductCategory[]> {
    const category = await this.prisma.productCategory.findMany({});

    return category
  }

  async getCategoryById(
    id
  ) : Promise<ProductCategory> {
    const category = await this.prisma.productCategory.findFirst({
      where : {
        id : id
      }
    })

    return category
  }

  async createCategory(
    dto : CategoryDto,
    file : Express.Multer.File
    ) : Promise<ProductCategory> {

    try {

      const category = await this.prisma.productCategory.create({
        data : { 
          name : dto.category,
          file : file.path
        }
      })
  
      return category

    } catch(error) {
      throw new UnprocessableEntityException(error)
    }
  }

  async deleteCategory(
    deleteCategoryById : DeleteCategoryByIdQuery
  ) : Promise<ProductCategory> {
    const category = await this.prisma.productCategory.delete({
      where : {
        id : deleteCategoryById.id
      }
    })

    return category
  }

}
