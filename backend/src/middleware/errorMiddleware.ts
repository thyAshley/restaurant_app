import {Request, Response, NextFunction} from 'express';

const errorMiddleWare = (err: Error, req: Request, res:Response, next: NextFunction) => {

    res.json({error: err.message})
}

export default errorMiddleWare