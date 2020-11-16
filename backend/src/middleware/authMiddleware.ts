import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/userModel';

export const authMiddleWare = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            const payload = <any>jwt.verify(token, process.env.JWT_SECRET!);
            const user = await User.findById(payload.id).select('-password')
            if (user) {
                res.locals.user = user;
                return next();
            } 
        }
        res.status(401);
        return next(new Error('You are not authorize or something went wrong, please log in again'))
        
    } catch (error) {
       res.status(500);
       next(new Error('Something went wrong, please try again'))
    }
}