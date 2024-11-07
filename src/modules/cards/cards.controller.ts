import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/card.dto';

@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Req() req: any, @Body() body: CreateCardDto) {
    return this.cardsService.create(req.user.userId, body);
  }

  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ParseIntPipe) {
    return this.cardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: ParseIntPipe, @Body() body: CreateCardDto) {
    return this.cardsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: ParseIntPipe) {
    return this.cardsService.remove(+id);
  }
}
