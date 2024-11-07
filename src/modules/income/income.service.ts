import { HttpException, Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/income.dto';

@Injectable()
export class IncomeService {
  async create(body: CreateIncomeDto) {
    try {
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, body: CreateIncomeDto) {
    try {
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
