import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto, QueryCategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(body: CreateCategoryDto) {
    try {
      const categoryName = body.name?.toLowerCase();

      const existing = await this.categoryRepository
        .createQueryBuilder('category')
        .where('LOWER(category.name) LIKE :name', { name: `%${categoryName}%` })
        .getOne();
      if (existing) {
        throw new BadRequestException(
          `Category with name ${body.name} already exists`,
        );
      }

      const category = new Category();
      category.name = body.name;
      return await this.categoryRepository.save(category);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(query: QueryCategoryDto) {
    try {
      const builder = this.categoryRepository.createQueryBuilder('category');
      if (query.search) {
        builder.andWhere('category.name like :search', {
          search: `%${query.search}%`,
        });
      }

      const count = await builder.getCount();

      if (query.limit) {
        builder.take(+query.limit);
      }

      if (query.offset) {
        builder.skip(+query.offset);
        if (!query.limit) {
          builder.take(Number.MAX_SAFE_INTEGER);
        }
      }

      const data = await builder.getMany();

      return { count, data };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const category: Category = await this.categoryRepository.findOneBy({
        id,
      });
      if (!category) {
        throw new NotFoundException(`Category not found with id ${id}`);
      }

      return category;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, body: CreateCategoryDto) {
    try {
      const category: Category = await this.categoryRepository.findOneBy({
        id: id,
      });
      if (!category) {
        throw new NotFoundException(`Category not found with id ${id}`);
      }

      const categoryName = body.name?.toLowerCase();

      const existing = await this.categoryRepository
        .createQueryBuilder('category')
        .where('category.name = :name', { name: `%${categoryName}%` })
        .getOne();
      if (existing) {
        throw new BadRequestException(
          `Category with name ${body.name} already exists`,
        );
      }

      category.name = body.name;
      return await this.categoryRepository.save(category);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      const category: Category = await this.categoryRepository.findOneBy({
        id,
      });
      if (!category) {
        throw new NotFoundException(`Category not found with id ${id}`);
      }

      await this.categoryRepository.remove(category);

      return {
        success: true,
        message: 'Category deleted successfully',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
