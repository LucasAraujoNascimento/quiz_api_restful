import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction} from 'express';
import config from 'config';

interface AuthenticatedRequest extends Request {
    user?: any;
}

export default function (req: AuthenticatedRequest, res: Response, next:NextFunction) {

    const tokenHeader = req.header('Validate-Token');
    const token = config.get<string>('token')


    if(!tokenHeader){
        return res.status(401).json('Access denied')
    }

    try{
        const userVerified = jwt.verify(tokenHeader, token)
        req.user = userVerified
        next()
    }catch(e: any){
        res.status(401).send('Access denied')
    }
}


