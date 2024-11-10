import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpDto, RegisterByOtpDto, UserLoginDto, VerifyOtpDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('request-otp')
  requestOtp(@Body() body: OtpDto) {
    return this.authService.requestOtp(body);
  }

  @Post('verify-otp')
  verifyOtp(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtp(body);
  }

  @Post('register-otp')
  registerByOtp(@Body() body: RegisterByOtpDto) {
    return this.authService.registerByOtp(body);
  }

  @Post('register')
  register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Post('user-login')
  userLogin(@Body() body: UserLoginDto) {
    return this.authService.userLogin(body);
  }

  // @Post('admin-login')
  // adminLogin(@Body() body: AdminLoginDto) {
  //   return this.authService.adminLogin(body);
  // }

  // @Post('reset-password')
  // resetPassword(@Body() body: ResetPasswordDto) {
  //   return this.authService.resetPassword(body);
  // }
}
