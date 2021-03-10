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

    if (projects.length == 0) {
      throw new AppError("You don't have any registered projects");
    }

    return response.json(projects);
  }

  async store(request: Request, response: Response) {
    const { name, navers } = request.body;
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const project = projectsRepository.create({
      user_id: request.id,
      name,
    });

    await projectsRepository.save(project);

    await projectsRepository.storeProjectNavers(project.id, navers);

    return response.status(201).json(project);
  }

  async update(request: Request, response: Response) {
    const { name, navers } = request.body;
    const { project_id } = request.params;
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const project = await projectsRepository.findOne({
      user_id: request.id,
      id: Number(project_id),
    });

    project.name = name;

    await projectsRepository.storeProjectNavers(project.id, navers);

    const projectUpdated = await projectsRepository.save(project);

    return response.json(projectUpdated);
  }

  async show(request: Request, response: Response) {
    const { project_id } = request.params;
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const projects = await projectsRepository.find({
      where: { user_id: request.id, id: Number(project_id) },
      relations: ["naverProject", "naverProject.naver"],
    });

    if (projects.length == 0) {
      throw new AppError(
        `You don't have registered project or can't find project ID: ${project_id}`
      );
    }

    return response.json(projects);
  }

  async delete(request: Request, response: Response) {
    const { project_id } = request.params;
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const project = await projectsRepository.find({
      id: Number(project_id),
      user_id: request.id,
    });

    if (project.length == 0) {
      throw new AppError(
        `Can't find project or you don't registered the project ID: ${project_id}`
      );
    }

    await projectsRepository.delete(project_id);

    return response.status(200).json("Project Deleted!");
  }
}

export { ProjectController };
