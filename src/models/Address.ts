import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Business from "./Business";

@Entity("address")
class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  street: string;

  @Column()
  number: Number;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  cep: Number;

  @Column()
  complement: string;

  @Column()
  place_id: string;

  @Column()
  business_id: string;

  @ManyToOne(() => Business)
  @JoinColumn({ name: "business_id" })
  business: Business;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Address;
