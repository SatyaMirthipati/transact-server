import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OtpType, UserTypes } from 'src/utils/constants';
import {
  AdminLoginDto,
  OtpDto,
  RegisterByOtpDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async requestOtp(body: OtpDto) {
    try {
      const otp = 1234;

      if (body.type === OtpType.MOBILE) {
        const token = this.jwtService.sign({
          mobileNumber: body.mobile,
          otp: otp.toString(),
        });

        return { token, otp };
      } else {
        const token = this.jwtService.sign({
          email: body.email,
          otp: otp.toString(),
        });

        return { token, otp };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  // async verifyOtp(body: VerifyOtpDto) {
  //   try {
  //     const decoded: any = this.jwtService.decode(body.token);

  //     const { mobileNumber, email, otp } = decoded;
  //     const newUser = await this.userModel
  //       .findOne({
  //         $or: [{ mobileNumber: mobileNumber }, { email: email }],
  //       })
  //       .exec();

  //     if (otp === body.otp) {
  //       if (newUser) {
  //         await newUser.save();
  //         return await this.login(newUser);
  //       } else {
  //         return await this.registerThroughOtp(mobileNumber, email);
  //       }
  //     } else {
  //       throw new BadRequestException('Otp is invalid');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new HttpException(error.message, error.status);
  //   }
  // }

  // async login(user: User) {
  //   const payload = { userId: user.id, mobile: user.mobileNumber };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //     userExists: true,
  //   };
  // }

  async registerThroughOtp(mobile: string, email: string) {
    const payload = { mobile: mobile, email: email, time: new Date() };
    return {
      access_token: this.jwtService.sign(payload),
      userExists: false,
    };
  }

  // async registerByOtp(body: RegisterByOtpDto) {
  //   try {
  //     const mobile = await this.userModel
  //       .findOne({
  //         $or: [{ mobileNumber: body.mobile }, { email: body.email }],
  //       })
  //       .exec();
  //     if (mobile) {
  //       throw new BadRequestException(
  //         `A user with exists with email ${body.email} or mobile number ${body.mobile}`,
  //       );
  //     }

  //     const payload = this.jwtService.verify(body.token);
  //     let nMobile: string;
  //     let nEmail: string;

  //     if (payload.mobile) {
  //       nMobile = payload.mobile.toString();
  //     } else {
  //       nEmail = payload.email.toString();
  //     }

  //     const vendorStatus = {
  //       status: vendorRequestStatus.PENDING,
  //       comments: '',
  //       images: [],
  //     };

  //     const user = await this.userModel.create({
  //       firstName: body.firstName,
  //       lastName: body.lastName,
  //       mobileNumber: body.mobile || nMobile,
  //       email: body.email || nEmail,
  //       vendorStatus: [vendorStatus],
  //     });

  //     return await this.login(user);
  //   } catch (error) {
  //     console.log(error);
  //     throw new HttpException(error.message, error.status);
  //   }
  // }

  // async adminLogin(body: AdminLoginDto) {
  //   try {
  //     const user = await this.userModel
  //       .findOne({
  //         $or: [{ mobileNumber: body.username }, { email: body.username }],
  //         role: UserTypes.ADMIN,
  //       })
  //       .exec();
  //     if (!user) {
  //       throw new NotFoundException(
  //         `We can't find the user with ${body.username}`,
  //       );
  //     }

  //     //password validation
  //     const verify = await bcrypt.compare(body.password, user.password);
  //     if (!verify) {
  //       throw new UnauthorizedException(`Wrong password for ${body.username}`);
  //     }

  //     const payload = {
  //       sub: user?._id,
  //       userId: user?._id,
  //     };

  //     return {
  //       access_token: this.jwtService.sign(payload),
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     throw new HttpException(error.message, error.status);
  //   }
  // }

  // async resetPassword(body: ResetPasswordDto) {
  //   try {
  //     const decoded: any = this.jwtService.decode(body.token);

  //     const password = await bcrypt.hash(body.password, 10);

  //     const user = await this.userModel
  //       .findOneAndUpdate(
  //         { mobileNumber: decoded.mobile },
  //         {
  //           password: password,
  //         },
  //       )
  //       .exec();

  //     if (!user) {
  //       throw new NotFoundException(
  //         `We couldn't find a user with that mobile number. ${decoded.mobile} Please try again.`,
  //       );
  //     }

  //     return { success: true };
  //   } catch (error) {
  //     console.log(error);
  //     throw new HttpException(error.message, error.status);
  //   }
  // }
}
