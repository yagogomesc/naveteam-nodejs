import { EntityRepository, Repository } from 'typeorm';
import { NaverProject } from '../models/NaverProject';

@EntityRepository(NaverProject)
class NaversProjectsRepository extends Repository<NaverProject> {
  async storeMultiNavers({ navers_ids, project_id }): Promise<void> {
    await this.deleteAllByProject(project_id);
    const naversAndProjects = [];

    navers_ids.forEach((id: number) => {
      naversAndProjects.push({
        naver_id: id,
        naver: id,
        project_id,
        project: project_id,
      });
    });

    const naverProject = this.create(naversAndProjects);

    await this.save(naverProject);
  }

  async storeMultiProjects({ naver_id, projects_ids }): Promise<void> {
    await this.deleteAllByNaver(naver_id);
    const naversAndProjects = [];

    projects_ids.forEach((id: number) => {
      naversAndProjects.push({
        naver_id,
        naver: naver_id,
        project_id: id,
        project: id,
      });
    });

    const naverProject = this.create(naversAndProjects);

    await this.save(naverProject);
  }

  async deleteAllByNaver(naver_id: number) {
    await this.delete({
      naver_id,
    });
  }

  async deleteAllByProject(project_id: number) {
    await this.delete({
      project_id,
    });
  }
}

export { NaversProjectsRepository };
