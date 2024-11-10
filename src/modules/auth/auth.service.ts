import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { OtpType, UserTypes } from 'src/utils/constants';
import { In } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { OtpDto, RegisterByOtpDto, UserLoginDto, VerifyOtpDto } from './dto/auth.dto';
import { UserRepository } from '../users/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/user.dto';


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private readonly userRepository: UserRepository) { }

  async requestOtp(body: OtpDto) {
    try {
      const otp = 1234;

      if (body.type === OtpType.MOBILE) {
        const token = this.jwtService.sign({
          mobile: body.mobile,
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

  async verifyOtp(body: VerifyOtpDto) {
    try {
      const decoded: any = this.jwtService.decode(body.token);

      const { mobile, email, otp } = decoded;
      const newUser = await User.createQueryBuilder('user')
        .where('user.mobile = :mobile', { mobile })
        .orWhere('user.email = :email', { email })
        .getOne();

      console.log(newUser);
      console.log('mobile', mobile);
      console.log('email', email);
      console.log('email', otp);

      if (parseInt(otp) === body.otp) {
        if (newUser) {
          await newUser.save();
          return await this.login(newUser);
        } else {
          return await this.registerThroughOtp(mobile, email);
        }
      } else {
        throw new BadRequestException('Otp is invalid');
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async login(user: User) {
    const payload = { userId: user.id, mobile: user.mobile, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      userExists: true,
    };
  }

  async registerThroughOtp(mobile: string, email: string) {
    const payload = { mobile: mobile, email: email, time: new Date() };
    return {
      access_token: this.jwtService.sign(payload),
      userExists: false,
    };
  }

  async registerByOtp(body: RegisterByOtpDto) {
    try {
      const mobile = await User.createQueryBuilder('user')
        .where('user.mobile = :mobile', { mobile: body.mobile })
        .orWhere('user.email = :email', { email: body.email })
        .getOne();
      if (mobile) {
        throw new BadRequestException(
          `A user with exists with email ${body.email} or mobile number ${body.mobile}`,
        );
      }

      const payload = this.jwtService.verify(body.token);
      let nMobile: string;
      let nEmail: string;

      if (payload.mobile) {
        nMobile = payload?.mobile?.toString();
      } else {
        nEmail = payload?.email?.toString();
      }

      const dateOfBirth = moment(body.dateOfBirth);
      const age: number = moment().diff(dateOfBirth, 'years');

      let categories: Category[];
      if (body?.categoryIds?.length > 0) {
        categories = await Category.findBy({
          id: In(body.categoryIds),
        });
      }

      const user = new User();
      user.name = body.name;
      user.mobile = body.mobile;
      user.email = body.email;
      user.role = body.role || UserTypes.USER;
      user.dateOfBirth = body.dateOfBirth;
      user.age = age;
      user.gender = body.gender;
      user.address = body.address;
      user.password = body.mobile;
      user.imageKey = body.imageKey;
      user.categories = categories;
      await user.save();

      return await this.login(user);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async register(body: CreateUserDto) {
    try {
      const existing: User = await this.userRepository
        .createQueryBuilder('user')
        .where('user.mobile= :mobile', { mobile: body.mobile })
        .orWhere('user.email= :email', { email: body.email })
        .getOne();
      if (existing) {
        throw new BadRequestException(
          `User already exists with mobile number ${body.mobile} or email ${body.email}`,
        );
      }

      const dateOfBirth = moment(body.dateOfBirth);
      const age: number = moment().diff(dateOfBirth, 'years');

      const categories: Category[] = await Category.findBy({
        id: In(body.categoryIds),
      });

      const user = new User();
      user.name = body.name;
      user.role = body.role;
      user.mobile = body.mobile;
      user.email = body.email;
      user.password = body.mobile;
      user.dateOfBirth = body.dateOfBirth;
      user.age = age;
      user.gender = body.gender;
      user.address = body.address;
      user.imageKey = body.imageKey;
      user.categories = categories;
      await user.save();

      return await this.login(user);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async userLogin(body: UserLoginDto) {
    try {
      const { username, password } = body;

      const user: User = await this.userRepository.createQueryBuilder('u')
        .andWhere('u.mobile = :username', { mobile: username })
        .orWhere('u.email = :username', { email: username })
        .getOne();
      if (!user) {
        throw new NotFoundException(`User not found ${body.username}`);
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new BadRequestException('Invalid Password');
      }

      return {
        access_token: this.jwtService.sign({ id: user.id, userId: user.id }),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
