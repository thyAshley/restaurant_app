import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/userModel';

export const authMiddleWare = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            const payload = <any>jwt.verify(token, process.env.JWT_SECRET!)
            const user = await User.findById(payload.id).select('-password')
            if (user) {
                res.locals.user = user;
                return next();
            } 
        }
        res.status(500);
        return next(new Error('Something went wrong, please try again'))
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401);
            return next(new Error('You session has expired, please log in again'))
        }
        res.status(500);
        next(new Error('Something went wrong, please try again'))
    }
}

export const session = (req: Request, res:Response, next: NextFunction) => {
    if (!res.locals.user) next(new Error('You session has expired, please log in again'))
    res.json(res.locals.user);
}