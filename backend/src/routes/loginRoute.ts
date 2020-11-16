import express from 'express';

import {authMiddleWare} from '../middleware/authMiddleware'
import {login, register} from '../controllers/loginController'

const router = express.Router();

router.post('/login', login)
router.post('/register', register);
router.get('/auth', authMiddleWare);

export default router;