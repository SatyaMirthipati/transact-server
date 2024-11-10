import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserTypes } from 'src/utils/constants';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsIn(Object.keys(UserTypes))
  role: string;

  @IsNotEmpty()
  @IsString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  mobile: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  imageKey: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  categoryIds: number[];
}

export class QueryUserDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsNumber()
  offset: number;

  @IsOptional()
  @IsString()
  @IsIn(Object.keys(UserTypes))
  role: string;
}
