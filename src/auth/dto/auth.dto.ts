import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { OtpType } from 'src/utils/constants';

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
  @IsString()
  otp: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}

export class RegisterByOtpDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  mobile: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  token: string;
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
