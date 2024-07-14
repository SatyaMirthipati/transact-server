import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { BanksController } from './banks.controller';
import { BanksService } from './banks.service';
import { Bank } from './entities/bank.entity';
import { BankRepository } from './repository/bank.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Bank]), forwardRef(() => UsersModule)],
  controllers: [BanksController],
  providers: [BankRepository, BanksService],
  exports: [BankRepository],
})
export class BanksModule {}
