import { Router } from "express";
import { LoginController } from "./controllers/LoginController";
import { ProjectController } from "./controllers/ProjectController";
import { RegisterController } from "./controllers/RegisterController";
import { authenticateToken } from "./middlewares/authenticateUserToken";

const registerController = new RegisterController();
const loginController = new LoginController();
const projectController = new ProjectController();
const router = Router();

router.post("/register", registerController.register);

router.post("/login", loginController.login);

router.use(authenticateToken);

router.get("/projects", projectController.test);

export { router };
