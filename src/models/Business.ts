import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import User from "./User";
import Address from "./Address";

@Entity("business")
class Business {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  avatar: string;

  @Column()
  nome: string;

  @Column()
  setor: string;

  @Column()
  cnpj_cpf: string;

  @Column()
  openHour: Number;

  @Column()
  closeHour: Number;

  @Column()
  instagram: string;

  @Column()
  facebook: string;

  @Column()
  whatsapp: string;

  @Column()
  fone_cel: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  address: Address;
}

export default Business;
