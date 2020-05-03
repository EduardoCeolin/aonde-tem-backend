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

@Entity("products")
class Products {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  avatar: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  value: number;

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

export default Products;
