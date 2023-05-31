import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validateRequest } from '../middlewares/auth.middleware';

const router = Router();

router.get('/users', validateRequest, UserController.getSubordinates);
router.get('/users/me', validateRequest, UserController.getUserInfo);
router.post('/users/:reporteeId', validateRequest, UserController.updateReporterId);
router.delete('/users/:reporteeId', validateRequest, UserController.deleteReportId);

export default router;
