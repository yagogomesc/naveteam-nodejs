import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ProjectsRepository } from "../repositories/ProjectsRepository";

class ProjectController {
  async create(request: Request, response: Response) {
    const { name, navers } = request.body;
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const project = projectsRepository.create({
      user_id: request.id,
      name,
    });

    await projectsRepository.save(project);

    projectsRepository.storeProjectNavers(request.id, project.id, navers);

    return response.status(200).json(project);
  }
}

export { ProjectController };
