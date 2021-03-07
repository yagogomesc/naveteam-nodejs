import { Request, Response } from "express";
import { genSaltSync, hash } from "bcrypt";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { AppError } from "../errors/AppError";

class RegisterController {
  async register(request: Request, response: Response) {
    const { email, password } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }
    const hashSalt = genSaltSync(Number(process.env.BCRYPT_SALT_ROUNDS));
    const passwordEncrypted = String(
      await hash(password, hashSalt).then((passHashed) => {
        return passHashed;
      })
    );

    const user = usersRepository.create({
      email,
      password: passwordEncrypted,
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export { RegisterController };
