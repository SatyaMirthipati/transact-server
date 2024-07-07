import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { OtpType, UserTypes } from 'src/utils/constants';

export class OtpDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(OtpType))
  type: string;

  @ValidateIf((e: OtpDto) => e.type === OtpType.MOBILE)
  @IsNotEmpty()
  @IsString()
  mobile: string;

  @ValidateIf((e: OtpDto) => e.type === OtpType.EMAIL)
  @IsNotEmpty()
  email: string;
}

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsNumber()
  otp: number;

  @IsNotEmpty()
  @IsString()
  token: string;
}

export class RegisterByOtpDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  mobile: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  @IsIn(Object.keys(UserTypes))
  role: string;

  @IsOptional()
  @IsString()
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  imageKey: string;
}

export class AdminLoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
