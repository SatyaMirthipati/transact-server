import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/repository/user.repository';
import { CreateCardDto } from './dto/card.dto';
import { Card } from './entities/card.entity';
import { CardRepository } from './repository/cards.repository';

@Injectable()
export class CardsService {
  constructor(
    private readonly cardsRepository: CardRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(userId: number, body: CreateCardDto) {
    try {
      const user: User = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(`User not found with id ${userId}`);
      }

      const card: Card = await this.cardsRepository.findOneBy({
        cardNumber: body.cardNumber,
        userId: user.id,
      });
      if (card) {
        throw new NotFoundException(
          `Card already exists with number ${body.cardNumber}`,
        );
      }

      const newCard = new Card();
      newCard.type = body.type;
      newCard.userId = user.id;
      newCard.cardNumber = body.cardNumber;
      newCard.cardHolderName = body.cardHolderName;
      newCard.monthExpire = body.monthExpire;
      await newCard.save();

      return newCard;
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

  async update(id: number, body: CreateCardDto) {
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
