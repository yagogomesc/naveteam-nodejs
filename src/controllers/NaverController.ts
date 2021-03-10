import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { NaversRepository } from "../repositories/NaversRepository";

class NaverController {
  async index(request: Request, response: Response) {
    const naversRepository = getCustomRepository(NaversRepository);

    const navers = await naversRepository.find({
      user_id: request.id,
    });

    if (!navers) {
      throw new AppError("You don't have any navers registered");
    }

    return response.json(navers);
  }

  async store(request: Request, response: Response) {
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

  async update(request: Request, response: Response) {}

  async show(request: Request, response: Response) {}

  async delete(request: Request, response: Response) {
    const { naver_id } = request.params;
    const naversRepository = getCustomRepository(NaversRepository);

    const naver = await naversRepository.find({
      id: Number(naver_id),
      user_id: request.id,
    });

    if (!naver) {
      throw new AppError("Can't found naver or you don't registered the naver");
    }

    await naversRepository.delete(naver_id);

    return response.status(200).json("Naver deleted!");
  }
}

export { NaverController };
