import { compare, hash } from 'bcrypt';
import { Bank } from 'src/banks/entities/bank.entity';
import { Category } from 'src/categories/entities/category.entity';
import { UserTypes } from 'src/utils/constants';
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', default: UserTypes.USER })
  role: string;

  @Column({ type: 'date', nullable: false })
  dateOfBirth: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  mobile: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'varchar', nullable: false })
  gender: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  imageKey: string;

  @ManyToMany(() => Category)
  @JoinTable({ name: 'users_ids_categories_ids' })
  categories: Category[];

  @OneToMany(() => Bank, (bank) => bank.user)
  bank: Bank[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  imageUrl: string;

  async verifyPassword(plainTextPassword: string) {
    return compare(plainTextPassword, this.password);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @AfterLoad()
  renderUrl() {
    if (this.imageUrl) {
      this.imageUrl = `${process.env.AWS_BASE_URL}/${this.imageUrl}`;
    } else {
      this.imageUrl = null;
    }
  }
}
