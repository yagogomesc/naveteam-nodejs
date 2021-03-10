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
} from 'typeorm';
import { NaverProject } from './NaverProject';
import { Project } from './Project';
import { User } from './User';

@Entity('navers')
class Naver {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column()
  birthdate: Date;

  @Column()
  admission_date: Date;

  @Column()
  job_role: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(type => NaverProject, naverProject => naverProject.naver)
  public naverProject!: NaverProject[];
}

export { Naver };
