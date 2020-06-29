import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// router.get('/', loginRequired, UserController.index);
// router.get('/:id', UserController.show);

router.post('/', loginRequired, UserController.store);
router.put('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.delete);

export default router;
/*
index: lista os usuarios
store ou create : cria usuario
delete: delete
show: mostra usuario
update: atualiza

*/
