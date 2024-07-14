import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '../entities/bank.entity';

export class BankRepository extends Repository<Bank> {
  constructor(
    @InjectRepository(Bank) private readonly bankRepository: Repository<Bank>,
  ) {
    super(
      bankRepository.target,
      bankRepository.manager,
      bankRepository.queryRunner,
    );
  }
}
