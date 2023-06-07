import { Request, Response } from "express";
import { Logs, LogsModel } from "../models/Logs";
import { validate } from 'class-validator';

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function createLogs(req:AuthenticatedRequest, res:Response){
 
    if(req.user.admin){

        try {
            const body = req.body
            if(!body){
                throw new Error('Data is required')
            }

            const newLogs = new Logs()
            newLogs.username = body.username;
            newLogs.question = body.question;
            newLogs.option = body.option
            newLogs.correct_answer = body.correct_answer
            newLogs.response_time = body.response_time

            const errors = await validate(newLogs)
            if(errors.length > 0){
                res.status(500).json(errors)
            }else{
                const logs = await LogsModel.create(newLogs)
                res.status(201).send(logs)
            }
        } catch (e: any) {
            console.log(`ERROR: ${e.message}`)
            res.status(500).json(e.message)
        }
    }else{
        console.log('Acess denied Not Admin!')
        res.status(500).json('Acess denied Not Admin!')
    }
}

export async function allLogs(req:Request, res:Response){

    try {
        const logs = await LogsModel.find();
        res.status(200).json(logs)
    } catch (e: any) {
        console.log(`ERROR: ${e.message}`)
        res.status(500).json(e.message)
    }
}