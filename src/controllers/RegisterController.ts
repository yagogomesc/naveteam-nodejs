import { Request, Response } from 'express';
import { genSaltSync, hash } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { AppError } from '../errors/AppError';
import * as yup from 'yup';

class RegisterController {
  async register(request: Request, response: Response) {
    const { email, password } = request.body;

    const schema = yup.object().shape({
      email: yup.string().email('Please, insert a valid email').required(),
      password: yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });

      const usersRepository = getCustomRepository(UsersRepository);

      const userAlreadyExists = await usersRepository.findOne({ email });

      if (userAlreadyExists) {
        throw new AppError('User already exists');
      }
      const hashSalt = genSaltSync(Number(process.env.BCRYPT_SALT_ROUNDS));
      const passwordEncrypted = String(
        await hash(password, hashSalt).then(passHashed => {
          return passHashed;
        })
      );

      const user = usersRepository.create({
        email,
        password: passwordEncrypted,
      });

      await usersRepository.save(user);

      return response.status(201).json(user);
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { RegisterController };
