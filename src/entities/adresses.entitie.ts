import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "addresses" })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45, nullable: false })
  street: string;

  @Column({ length: 8, nullable: false })
  zipCode: string;

  @Column({ length: 7 })
  number: string;

  @Column({ length: 20, nullable: false })
  city: string;

  @Column({ length: 2 })
  state: string;
}
