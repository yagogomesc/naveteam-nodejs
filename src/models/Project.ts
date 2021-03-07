import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("projects")
class Project {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;
}

export { Project };
