import { Router } from 'express';
import { LoginController } from './controllers/LoginController';
import { NaverController } from './controllers/NaverController';
import { ProjectController } from './controllers/ProjectController';
import { RegisterController } from './controllers/RegisterController';
import { authenticateToken } from './middlewares/authenticateUserToken';

const registerController = new RegisterController();
const loginController = new LoginController();
const projectController = new ProjectController();
const naverController = new NaverController();
const router = Router();

router.post('/register', registerController.register);

router.post('/login', loginController.login);

router.use(authenticateToken);

router.get('/projects', projectController.index);
router.get('/projects/:project_id', projectController.show);
router.post('/projects', projectController.store);
router.post('/projects/:project_id', projectController.update);
router.delete('/projects/:project_id', projectController.delete);

router.get('/navers', naverController.index);
router.get('/navers/:naver_id', naverController.show);
router.post('/navers', naverController.store);
router.post('/navers/:naver_id', naverController.update);
router.delete('/navers/:naver_id', naverController.delete);

export { router };
