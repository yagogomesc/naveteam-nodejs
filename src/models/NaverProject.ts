import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Naver } from './Naver';
import { Project } from './Project';

@Entity('navers_projects')
class NaverProject {
  @PrimaryColumn()
  naver_id: number;

  @ManyToOne(type => Naver, naver => naver.naverProject)
  @JoinTable()
  naver!: Naver;

  @PrimaryColumn()
  project_id: number;

  @ManyToOne(type => Project, project => project.naverProject)
  @JoinTable()
  project!: Project;
}

export { NaverProject };
