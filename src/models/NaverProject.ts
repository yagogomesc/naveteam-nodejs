import { Column, Entity, JoinColumn, ManyToMany } from "typeorm";
import { Naver } from "./Naver";
import { Project } from "./Project";

@Entity("navers_projects")
class NaverProject {
  @Column()
  naver_id: number;

  @ManyToMany(() => Naver)
  @JoinColumn({ name: "naver_id" })
  naver: Naver;

  @Column()
  project_id: number;

  @ManyToMany(() => Project)
  @JoinColumn({ name: "project_id" })
  project: Project;
}

export { NaverProject };
