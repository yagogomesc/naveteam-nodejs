import { Entity, JoinColumn, ManyToMany, PrimaryColumn } from "typeorm";
import { Naver } from "./Naver";
import { Project } from "./Project";

@Entity("navers_projects")
class NaverProject {
  @PrimaryColumn()
  naver_id: number;

  @ManyToMany(() => Naver)
  @JoinColumn({ name: "naver_id" })
  naver: Naver;

  @PrimaryColumn()
  project_id: number;

  @ManyToMany(() => Project)
  @JoinColumn({ name: "project_id" })
  project: Project;
}

export { NaverProject };
