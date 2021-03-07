import { Router } from "express";
import { RegisterController } from "./controllers/RegisterController";

const registerController = new RegisterController();
const router = Router();

router.post("/register", registerController.register);

export { router };
