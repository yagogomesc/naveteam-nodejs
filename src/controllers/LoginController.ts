import { Request, Response } from 'express';
import { compare, hash } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { AppError } from '../errors/AppError';
import * as jwt from 'jsonwebtoken';
import * as yup from 'yup';

class LoginController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const schema = yup.object().shape({
      email: yup.string().email('Please, insert a valid email').required(),
      password: yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });

      const usersRepository = getCustomRepository(UsersRepository);

      const user = await usersRepository.findOne({ email });

      if (!user) {
        throw new AppError('Username or Password was invalid');
      }

      const passwordCheck = await compare(password, user.password);

      if (!passwordCheck) {
        throw new AppError('Username or Password was invalid');
      }

      const userToken = jwt.sign(
        { id: user.id, email },
        process.env.ACCESS_JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES || 36000,
        }
      );

      return response.status(201).json(`Bearer ${userToken}`);
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { LoginController };
