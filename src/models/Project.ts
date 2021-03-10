import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Naver } from "./Naver";
import { NaverProject } from "./NaverProject";
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

  @OneToMany((type) => NaverProject, (naverProject) => naverProject.project)
  public naverProject!: NaverProject[];
}

export { Project };
