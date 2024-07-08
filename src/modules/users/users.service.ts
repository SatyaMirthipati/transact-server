import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as moment from 'moment';
import { In } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { CreateUserDto, QueryUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(body: CreateUserDto) {
    try {
      // const queryRunner = this.manager.connection.createQueryRunner();
      const existing: User = await User.createQueryBuilder('user')
        .where('user.mobile= :mobile', { mobile: body.mobile })
        .orWhere('user.email= :email', { email: body.email })
        .getOne();
      if (existing) {
        throw new BadRequestException(
          `User already exists with mobile number ${body.mobile} or email ${body.email}`,
        );
      }

      const dateOfBirth = moment(body.dateOfBirth);
      const age: number = moment().diff(dateOfBirth, 'years');

      const categories: Category[] = await Category.findBy({
        id: In(body.categoryIds),
      });

      const user = new User();
      user.name = body.name;
      user.role = body.role;
      user.mobile = body.mobile;
      user.email = body.email;
      user.password = body.mobile;
      user.dateOfBirth = body.dateOfBirth;
      user.age = age;
      user.gender = body.gender;
      user.address = body.address;
      user.imageKey = body.imageKey;
      user.categories = categories;
      await user.save();

      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(query: QueryUserDto) {
    try {
      const builder = User.createQueryBuilder('user');

      if (query.role) {
        builder.where('user.role = :role', { role: query.role });
      }

      if (query.search) {
        builder.andWhere(
          '(user.name like :search OR user.email like :search OR user.mobile like :search)',
          { search: `%${query.search}%` },
        );
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
      const user: User = await User.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User not found with id ${id}`);
      }

      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, body: CreateUserDto) {
    try {
      const user: User = await User.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User not found with id ${id}`);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
