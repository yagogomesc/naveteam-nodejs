import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { NaversRepository } from "../repositories/NaversRepository";

class NaverController {
  async index(request: Request, response: Response) {}

  async create(request: Request, response: Response) {
    const { name, birthdate, admission_date, job_role } = request.body;
    const naversRepository = getCustomRepository(NaversRepository);

    const naver = naversRepository.create({
      user_id: request.id,
      name,
      birthdate,
      admission_date,
      job_role,
    });

    await naversRepository.save(naver);

    return response.status(200).json(naver);
  }

  async show(request: Request, response: Response) {}
}

export { NaverController };
