import { Router } from 'express';
import photyoController from '../controllers/PhotoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, photyoController.store);

export default router;
