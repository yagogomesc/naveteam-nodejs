import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { NaversRepository } from '../repositories/NaversRepository';
import * as yup from 'yup';

class NaverController {
  async index(request: Request, response: Response) {
    const query = request.query;
    const naversRepository = getCustomRepository(NaversRepository);

    const schema = yup.object().shape({
      name: yup.string(),
      admission_date: yup.date(),
      job_role: yup.string(),
    });

    try {
      await schema.validate(request.query, { abortEarly: false });

      const navers = await naversRepository.findAllByQuery(request.id, query);

      if (navers.length == 0) {
        throw new AppError("You don't have any navers registered");
      }

      return response.json(navers);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async store(request: Request, response: Response) {
    const {
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    } = request.body;
    const naversRepository = getCustomRepository(NaversRepository);

    const naver = naversRepository.create({
      user_id: request.id,
      name,
      birthdate,
      admission_date,
      job_role,
    });

    await naversRepository.save(naver);

    await naversRepository.storeNaverProjects(naver.id, projects);

    return response.status(200).json(naver);
  }

  async update(request: Request, response: Response) {
    const {
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      birthdate: yup.date().required(),
      admission_date: yup.date().required(),
      job_role: yup.string().required(),
      projects: yup.array().of(yup.number()).required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });

      const { naver_id } = request.params;
      const naversRepository = getCustomRepository(NaversRepository);

      const naver = await naversRepository.findOne({
        user_id: request.id,
        id: Number(naver_id),
      });

      naver.name = name;
      naver.birthdate = birthdate;
      naver.admission_date = admission_date;
      naver.job_role = job_role;

      await naversRepository.storeNaverProjects(naver.id, projects);

      const updatedNaver = await naversRepository.save(naver);

      return response.status(200).json(updatedNaver);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async show(request: Request, response: Response) {
    const { naver_id } = request.params;
    const naversRepository = getCustomRepository(NaversRepository);

    const schema = yup.object().shape({
      naver_id: yup.number().required('Please insert ID number'),
    });

    try {
      await schema.validate(request.params);

      const navers = await naversRepository.find({
        where: { user_id: request.id, id: Number(naver_id) },
        relations: ['naverProject', 'naverProject.project'],
      });

      if (navers.length == 0) {
        throw new AppError(
          `You don't have registered this naver or can't find naver ID: ${naver_id}`
        );
      }

      return response.json(navers);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async delete(request: Request, response: Response) {
    const { naver_id } = request.params;
    const naversRepository = getCustomRepository(NaversRepository);

    const schema = yup.object().shape({
      naver_id: yup.number().required('Please insert ID number'),
    });

    try {
      const naver = await naversRepository.find({
        id: Number(naver_id),
        user_id: request.id,
      });

      if (naver.length == 0) {
        throw new AppError(
          `Can't found naver or you don't registered the naver ID ${naver_id}`
        );
      }

      await naversRepository.delete(naver_id);

      return response.status(200).json('Naver deleted!');
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { NaverController };
