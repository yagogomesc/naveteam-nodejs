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

router.get("/projects", projectController.index);
router.post("/projects", projectController.create);
router.delete("/projects/:project_id", projectController.delete);

router.get("/navers", naverController.index);
router.post("/navers", naverController.create);
router.delete("/navers/:naver_id", naverController.delete);

export { router };
