import { Router } from "express";
import { LoginController } from "./controllers/LoginController";
import { NaverController } from "./controllers/NaverController";
import { ProjectController } from "./controllers/ProjectController";
import { RegisterController } from "./controllers/RegisterController";
import { authenticateToken } from "./middlewares/authenticateUserToken";

const registerController = new RegisterController();
const loginController = new LoginController();
const projectController = new ProjectController();
const naverController = new NaverController();
const router = Router();

router.post("/register", registerController.register);

router.post("/login", loginController.login);

router.use(authenticateToken);

router.post("/project", projectController.create);

router.post("/naver", naverController.create);

export { router };
