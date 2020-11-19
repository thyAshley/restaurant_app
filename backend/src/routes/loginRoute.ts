import express from 'express';
import {body} from 'express-validator';
import {login, register} from '../controllers/loginController'

const router = express.Router();

router.post('/login', login)
router.post('/register', 
[
    body('email').isEmail().withMessage('Invalid Email')
],
register);

export default router;