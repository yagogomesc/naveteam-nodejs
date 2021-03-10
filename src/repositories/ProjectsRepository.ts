import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { AppError } from "../errors/AppError";
import { Project } from "../models/Project";
import { NaversProjectsRepository } from "./NaversProjectsRepository";
import { NaversRepository } from "./NaversRepository";

@EntityRepository(Project)
class ProjectsRepository extends Repository<Project> {
  public async storeProjectNavers(project_id: number, navers: number[]) {
    const naversRepository = getCustomRepository(NaversRepository);
    const naversProjectsRepository = getCustomRepository(
      NaversProjectsRepository
    );

    await Promise.all(
      navers.map(async (id) => {
        const naverExists = await naversRepository.find({ id });

        if (naverExists.length == 0) {
          throw new AppError(`Naver with id ${id} not found`, 404);
        }
      })
    );

    await naversProjectsRepository.storeMultiNavers({
      navers_ids: navers,
      project_id: project_id,
    });
  }
}

export { ProjectsRepository };
