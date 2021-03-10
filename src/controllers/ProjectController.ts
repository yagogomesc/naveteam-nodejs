import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { ProjectsRepository } from "../repositories/ProjectsRepository";

class ProjectController {
  async index(request: Request, response: Response) {
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const projects = await projectsRepository.find({
      user_id: request.id,
    });

    if (!projects) {
      throw new AppError("You don't have any registered projects");
    }

    return response.json(projects);
  }

  async create(request: Request, response: Response) {
    const { name, navers } = request.body;
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const project = projectsRepository.create({
      user_id: request.id,
      name,
    });

    await projectsRepository.save(project);

    projectsRepository.storeProjectNavers(request.id, project.id, navers);

    return response.status(201).json(project);
  }

  async delete(request: Request, response: Response) {
    const { project_id } = request.params;
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const project = await projectsRepository.find({
      id: Number(project_id),
      user_id: request.id,
    });

    if (!project) {
      throw new AppError(
        "Can't find project or you don't registered the project"
      );
    }

    await projectsRepository.delete(project_id);

    return response.status(200).json("Project Deleted!");
  }
}

export { ProjectController };
