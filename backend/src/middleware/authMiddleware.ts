import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/userModel';

export const authMiddleWare = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            const payload = <any>jwt.verify(token, process.env.JWT_SECRET!);
            console.log('find user')
            const user = await User.findById(payload.id).select('-password')
            console.log('found user', user)
            if (user) {
                res.locals.user = user;
                res.send('authorized')
                next();
            } else {
               next(new Error('You are not authorize or something went wrong, please log in again'))
            }
        } else {
            return next(new Error('You are not authorize or something went wrong, please log in again'))
        }
    } catch (error) {
        console.log(error);
       next(new Error('You are not authorize or something went wrong, please log in again'))
    }
}