import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { ProjectsRepository } from '../repositories/ProjectsRepository';
import * as yup from 'yup';

class ProjectController {
  async index(request: Request, response: Response) {
    const query = request.query;
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const schema = yup.object().shape({
      name: yup.string(),
    });

    try {
      await schema.validate(request.query);

      const projects = await projectsRepository.findAllByQuery(
        request.id,
        query
      );

      if (projects.length == 0) {
        throw new AppError("You don't have any registered projects");
      }

      return response.json(projects);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async store(request: Request, response: Response) {
    const { name, navers } = request.body;
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const schema = yup.object().shape({
      name: yup.string().required(),
      navers: yup.array().of(yup.number()),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });

      const project = projectsRepository.create({
        user_id: request.id,
        name,
      });

      await projectsRepository.save(project);

      await projectsRepository.storeProjectNavers(project.id, navers);

      return response.status(201).json(project);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async update(request: Request, response: Response) {
    const { name, navers } = request.body;
    const { project_id } = request.params;
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const schema = yup.object().shape({
      name: yup.string().required(),
      navers: yup.array().of(yup.number()),
    });

    const schemaProjectId = yup.object().shape({
      project_id: yup.number().required('Please insert ID number'),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
      await schemaProjectId.validate(request.params);

      const project = await projectsRepository.findOne({
        user_id: request.id,
        id: Number(project_id),
      });

      project.name = name;

      await projectsRepository.storeProjectNavers(project.id, navers);

      const projectUpdated = await projectsRepository.save(project);

      return response.json(projectUpdated);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async show(request: Request, response: Response) {
    const { project_id } = request.params;
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const schema = yup.object().shape({
      project_id: yup.number().required('Please insert ID number'),
    });

    try {
      await schema.validate(request.params);

      const projects = await projectsRepository.find({
        where: { user_id: request.id, id: Number(project_id) },
        relations: ['naverProject', 'naverProject.naver'],
      });

      if (projects.length == 0) {
        throw new AppError(
          `You don't have registered project or can't find project ID: ${project_id}`
        );
      }

      return response.json(projects);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async delete(request: Request, response: Response) {
    const { project_id } = request.params;
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const schema = yup.object().shape({
      project_id: yup.number().required('Please insert ID number'),
    });

    try {
      await schema.validate(request.params);

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

      return response.status(200).json('Project Deleted!');
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { ProjectController };
