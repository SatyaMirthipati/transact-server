import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';
import { CardRepository } from './repository/cards.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), forwardRef(() => UsersModule)],
  controllers: [CardsController],
  providers: [CardRepository, CardsService],
  exports: [CardRepository],
})
export class CardsModule {}
