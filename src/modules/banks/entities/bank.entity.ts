import { User } from 'src/modules/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Bank extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  accountNumber: number;

  @Column({ type: 'varchar', nullable: false })
  ifscCode: string;

  @Column({ type: 'varchar', nullable: false })
  branch: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'boolean', default: false })
  isBeneficiaryAdded: boolean;

  @Column({ type: 'simple-json', nullable: true })
  preBeneficiaryResponse: any;

  @Column({ type: 'simple-json', nullable: true })
  postBeneficiaryResponse: any;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
