import { Repository } from "typeorm";
import { Income } from "../entities/income.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class IncomeRepository extends Repository<Income> {
    constructor(
      @InjectRepository(Income)
      
      private readonly categoryRepository: Repository<Income>,
    ) {
      super(
        categoryRepository.target,
        categoryRepository.manager,
        categoryRepository.queryRunner,
      );
    }
  }