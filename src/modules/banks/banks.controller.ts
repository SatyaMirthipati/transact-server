import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { BanksService } from './banks.service';
import { BanksQueryDto, CreateBankDto } from './dto/bank.dto';

@UseGuards(JwtAuthGuard)
@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Post()
  create(@Body() body: CreateBankDto) {
    return this.banksService.create(body);
  }

  @Get()
  findAll(@Query() query: BanksQueryDto) {
    return this.banksService.findAll(query);
  }

  @Get('verify/:ifscCode')
  async verifyIfsc(@Param('ifscCode') ifscCode: any) {
    try {
      const ifsc = require('ifsc');
      const bankDetails = await ifsc.fetchDetails(ifscCode);
      if (!bankDetails) {
        throw new NotFoundException('Invalid IFSC code');
      }

      return bankDetails;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.banksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: CreateBankDto) {
    return this.banksService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.banksService.remove(id);
  }
}
