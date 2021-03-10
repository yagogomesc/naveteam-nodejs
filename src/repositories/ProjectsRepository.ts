import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';
import { AppError } from '../errors/AppError';
import { Project } from '../models/Project';
import { NaversProjectsRepository } from './NaversProjectsRepository';
import { NaversRepository } from './NaversRepository';

interface projectsQueryInterface {
  name?: string;
}

@EntityRepository(Project)
class ProjectsRepository extends Repository<Project> {
  public async storeProjectNavers(project_id: number, navers: number[]) {
    const naversRepository = getCustomRepository(NaversRepository);
    const naversProjectsRepository = getCustomRepository(
      NaversProjectsRepository
    );

    await Promise.all(
      navers.map(async id => {
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

  public async findAllByQuery(user_id: number, query: projectsQueryInterface) {
    let whereClause = 'user_id = :user_id';
    const whereVariables = { user_id };

    if (query.name) {
      whereClause += ' AND LOWER(name) LIKE LOWER(:name)';
      Object.assign(whereVariables, { name: `%${query.name}%` });
    }

    return getRepository(Project)
      .createQueryBuilder()
      .where(whereClause, whereVariables)
      .getMany();
  }
}

export { ProjectsRepository };
