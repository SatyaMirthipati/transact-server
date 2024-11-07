import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { CardTypes } from 'src/utils/constants';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.keys(CardTypes))
  type: string;

  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  cardHolderName: string;

  @IsNotEmpty()
  @IsString()
  monthExpire: string;
}
