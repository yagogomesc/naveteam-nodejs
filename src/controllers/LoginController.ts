import { Request, Response } from "express";
import { compare, hash } from "bcrypt";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { AppError } from "../errors/AppError";

class LoginController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError("Username or Password was invalid");
    }

    const passwordCheck = await compare(password, user.password);

    if (!passwordCheck) {
      throw new AppError("Username or Password was invalid");
    }

    return response.status(201).json("Login OK");
  }
}

export { LoginController };
