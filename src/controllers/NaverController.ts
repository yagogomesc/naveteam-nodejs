import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { NaversProjectsRepository } from "../repositories/NaversProjectsRepository";
import { NaversRepository } from "../repositories/NaversRepository";

class NaverController {
  async index(request: Request, response: Response) {
    const naversRepository = getCustomRepository(NaversRepository);

    const navers = await naversRepository.find({
      user_id: request.id,
    });

    if (navers.length == 0) {
      throw new AppError("You don't have any navers registered");
    }

    return response.json(navers);
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
    console.log("teste");
    const { naver_id } = request.params;
    const naversRepository = getCustomRepository(NaversRepository);

    const naver = await naversRepository.findOne({
      user_id: request.id,
      id: Number(naver_id),
    });
    console.log(naver);
    naver.name = name;
    naver.birthdate = birthdate;
    naver.admission_date = admission_date;
    naver.job_role = job_role;

    await naversRepository.storeNaverProjects(naver.id, projects);

    const updatedNaver = await naversRepository.save(naver);

    return response.status(200).json(updatedNaver);
  }

  async show(request: Request, response: Response) {
    const { naver_id } = request.params;
    const naversRepository = getCustomRepository(NaversRepository);

    const navers = await naversRepository.find({
      where: { user_id: request.id, id: Number(naver_id) },
      relations: ["naverProject", "naverProject.project"],
    });

    if (navers.length == 0) {
      `You don't have registered this naver or can't find naver ID: ${naver_id}`;
    }

    return response.json(navers);
  }

  async delete(request: Request, response: Response) {
    const { naver_id } = request.params;
    const naversRepository = getCustomRepository(NaversRepository);

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

    return response.status(200).json("Naver deleted!");
  }
}

export { NaverController };
