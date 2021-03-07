import { Request, Response } from "express";
import { compare, hash } from "bcrypt";

class LoginController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const passHashed = userRepository.findOne({ email });

    const passwordCheck = await compare(password, passHashed.password);

    // const user = userRepository.create({
    //   email,
    //   password,
    // });

    return response.status(201).json("user");
  }
}

export { LoginController };
