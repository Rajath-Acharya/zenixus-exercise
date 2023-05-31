import { Router } from 'express';
import PersonalDetails from '../controllers/personal-details.controller';
import { validateRequest } from '../middlewares/auth.middleware';

const router = Router();

router.post('/personalDetails', validateRequest, PersonalDetails.addPersonalDetails);

export default router;
