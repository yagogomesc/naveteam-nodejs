import { EntityRepository, Repository } from "typeorm";
import { NaverProject } from "../models/NaverProject";

@EntityRepository(NaverProject)
class NaversProjectsRepository extends Repository<NaverProject> {
  async storeMultiNavers({ navers_ids, project_id }): Promise<void> {
    const naversAndProjects = [];

    navers_ids.forEach((id) => {
      naversAndProjects.push({
        naver_id: id,
        project_id,
      });
    });

    const naverProject = this.create(naversAndProjects);

    await this.save(naverProject);
  }

  async storeMultiProjects(naver_id: number, projects_ids: number[]) {
    const naversAndProjects = [];

    projects_ids.forEach((id) => {
      naversAndProjects.push({
        naver_id,
        project_id: id,
      });
    });

    const naverProject = this.create(naversAndProjects);

    await this.save(naverProject);
  }
}

export { NaversProjectsRepository };
