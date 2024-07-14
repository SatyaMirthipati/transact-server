import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBankDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  accountNumber: number;

  @IsNotEmpty()
  @IsString()
  ifscCode: string;

  @IsNotEmpty()
  @IsString()
  branch: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsBoolean()
  isBeneficiaryAdded: boolean;

  @IsOptional()
  preBeneficiaryResponse: any;

  @IsOptional()
  postBeneficiaryResponse: any;
}

export class BanksQueryDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsNumber()
  offset: number;
}
