import { Request, Response } from "express";
import { hash } from "bcrypt";

class RegisterController {
  async register(request: Request, response: Response) {
    const { email, password } = request.body;

    const passwordEncrypted = hash(
      password,
      process.env.BCRYPT_SALT_ROUNDS
    ).then((passHashed) => {
      return passHashed;
    });

    // const user = userRepository.create({
    //   email,
    //   password,
    // });

    return response.status(201).json("user");
  }
}

export { RegisterController };
