import {
  EntityRepository,
  getCustomRepository,
  getRepository,
  Repository,
} from 'typeorm';
import { AppError } from '../errors/AppError';
import { Naver } from '../models/Naver';
import { NaversProjectsRepository } from './NaversProjectsRepository';
import { ProjectsRepository } from './ProjectsRepository';

interface naversQueryInterface {
  name?: string;
  admission_date?: Date;
  job_role?: string;
}

@EntityRepository(Naver)
class NaversRepository extends Repository<Naver> {
  public async storeNaverProjects(naver_id: number, projects: number[]) {
    const projectsRepository = getCustomRepository(ProjectsRepository);
    const naversProjectsRepository = getCustomRepository(
      NaversProjectsRepository
    );
    console.log('teste');
    await Promise.all(
      projects.map(async id => {
        const projectExists = await projectsRepository.find({ id });

        if (projectExists.length == 0) {
          throw new AppError(`Project with id ${id} not found`, 404);
        }
      })
    );

    await naversProjectsRepository.storeMultiProjects({
      naver_id,
      projects_ids: projects,
    });
  }

  public async findAllByQuery(user_id: number, query: naversQueryInterface) {
    let whereClause = 'user_id = :user_id';
    const whereVariables = { user_id };

    if (query.name) {
      whereClause += ' AND LOWER(name) LIKE LOWER(:name)';
      Object.assign(whereVariables, { name: `%${query.name}%` });
    }

    if (query.admission_date) {
      whereClause += ' AND admission_date = :admission_date';
      Object.assign(whereVariables, { admission_date: query.admission_date });
    }

    if (query.job_role) {
      whereClause += ' AND LOWER(job_role) LIKE LOWER(:job_role)';
      Object.assign(whereVariables, { job_role: `%${query.job_role}%` });
    }

    return getRepository(Naver)
      .createQueryBuilder()
      .where(whereClause, whereVariables)
      .getMany();
  }
}

export { NaversRepository };
