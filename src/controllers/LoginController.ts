import { Request, Response } from "express";
import { compare, hash } from "bcrypt";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { AppError } from "../errors/AppError";
import * as jwt from "jsonwebtoken";

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

    const userToken = jwt.sign(
      { id: user.id, email },
      process.env.ACCESS_JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES || 36000,
      }
    );

    return response.status(201).json(`Bearer ${userToken}`);
  }
}

export { LoginController };
