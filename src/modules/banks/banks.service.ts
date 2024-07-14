import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Not } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/repository/user.repository';
import { BanksQueryDto, CreateBankDto } from './dto/bank.dto';
import { Bank } from './entities/bank.entity';
import { BankRepository } from './repository/bank.repository';

@Injectable()
export class BanksService {
  constructor(
    private readonly bankRepository: BankRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(body: CreateBankDto) {
    try {
      const user: User = await this.userRepository.findOneBy({
        id: body.userId,
      });
      if (!user) {
        throw new NotFoundException(`User not found with id ${body.userId}`);
      }

      const existing = await this.bankRepository.findOne({
        where: { accountNumber: body.accountNumber, ifscCode: body.ifscCode },
      });
      if (existing) {
      }

      const bank = new Bank();
      bank.userId = user.id;
      bank.user = user;
      bank.name = body.name;
      bank.accountNumber = body.accountNumber;
      bank.ifscCode = body.ifscCode;
      bank.branch = body.branch;
      bank.address = body.address;
      await this.bankRepository.save(bank);

      return bank;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(query: BanksQueryDto) {
    try {
      const { search, limit, offset } = query;

      const builder = this.bankRepository
        .createQueryBuilder('bank')
        .leftJoinAndSelect('bank.user', 'user');

      if (query.search) {
        builder.where(
          `bank.name LIKE :search OR bank.accountNumber LIKE :search OR bank.ifscCode LIKE :search`,
          { search: `%${search}%` },
        );
      }

      if (limit) {
        builder.take(+limit);
      }

      if (offset) {
        builder.skip(+offset);
        if (!limit) {
          builder.take(Number.MAX_SAFE_INTEGER);
        }
      }

      const result = await builder.orderBy('bank.id', 'DESC').getManyAndCount();

      return { count: result[1], data: result[0] };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const bank = await this.bankRepository.findOne({
        where: { id },
        relations: { user: true },
      });
      if (!bank) {
        throw new NotFoundException(`Bank not found with id ${id}`);
      }

      return bank;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, body: CreateBankDto) {
    try {
      const bank = await this.bankRepository.findOneBy({ id });
      if (!bank) {
        throw new NotFoundException(`Bank not found with id ${id}`);
      }

      const user: User = await this.userRepository.findOneBy({
        id: body.userId,
      });
      if (!user) {
        throw new NotFoundException(`User not found with id ${body.userId}`);
      }

      const existing = await this.bankRepository.findOne({
        where: { accountNumber: body.accountNumber, id: Not(id) },
      });
      if (existing) {
        throw new BadRequestException('Bank details already exists');
      }

      bank.userId = user.id;
      bank.user = user;
      bank.name = body.name;
      bank.accountNumber = body.accountNumber;
      bank.ifscCode = body.ifscCode;
      bank.branch = body.branch;
      bank.address = body.address;
      return await this.bankRepository.save(bank);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      throw new ForbiddenException('You are not allowed to delete this record');
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
