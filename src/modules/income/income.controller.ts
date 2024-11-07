import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateIncomeDto } from './dto/income.dto';
import { IncomeService } from './income.service';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  create(@Body() body: CreateIncomeDto) {
    return this.incomeService.create(body);
  }

  @Get()
  findAll() {
    return this.incomeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: CreateIncomeDto) {
    return this.incomeService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomeService.remove(+id);
  }
}
