import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { AppError } from "../errors/AppError";
import { Project } from "../models/Project";
import { NaversProjectsRepository } from "./NaversProjectsRepository";
import { NaversRepository } from "./NaversRepository";
import { UsersRepository } from "./UsersRepository";

@EntityRepository(Project)
class ProjectsRepository extends Repository<Project> {
  public async storeProjectNavers(
    user_id: number,
    project_id: number,
    navers: number[]
  ) {
    const usersRepository = getCustomRepository(UsersRepository);
    const naversRepository = getCustomRepository(NaversRepository);
    const naversProjectsRepository = getCustomRepository(
      NaversProjectsRepository
    );
    const userExists = usersRepository.find({ id: user_id });

    if (!userExists) {
      throw new AppError("Invalid user", 404);
    }

    await Promise.all(
      navers.map(async (id) => {
        const naverExists = await naversRepository.find({ id });

        if (!naverExists) {
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
