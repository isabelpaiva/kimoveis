import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.entitie";
import { Address } from "./adresses.entitie";

@Entity({ name: "real_estate" })
export class RealEstate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false, type: "boolean" })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  value: number | string;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToOne(() => Category, (categories) => categories.id)
  categoryId: Category;

  @OneToOne(() => Address, (addresses) => addresses.id)
  adressId: Address;
}
