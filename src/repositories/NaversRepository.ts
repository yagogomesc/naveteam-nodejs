import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { AppError } from "../errors/AppError";
import { Naver } from "../models/Naver";
import { NaversProjectsRepository } from "./NaversProjectsRepository";
import { ProjectsRepository } from "./ProjectsRepository";

@EntityRepository(Naver)
class NaversRepository extends Repository<Naver> {
  public async storeNaverProjects(naver_id: number, projects: number[]) {
    const projectsRepository = getCustomRepository(ProjectsRepository);
    const naversProjectsRepository = getCustomRepository(
      NaversProjectsRepository
    );

    await Promise.all(
      projects.map(async (id) => {
        const projectExists = await projectsRepository.find({ id });

        if (projectExists.length == 0) {
          throw new AppError(`Project with id ${id} not found`, 404);
        }
      })
    );

    await naversProjectsRepository.storeMultiProjects({
      projects_ids: projects,
      naver_id: naver_id,
    });
  }
}

export { NaversRepository };
