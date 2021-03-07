import { Router } from "express";
import { LoginController } from "./controllers/LoginController";
import { RegisterController } from "./controllers/RegisterController";

const registerController = new RegisterController();
const loginController = new LoginController();
const router = Router();

router.post("/register", registerController.register);

router.post("/login", loginController.login);

export { router };
