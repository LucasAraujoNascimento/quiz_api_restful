import { Request, Response } from "express";
import { RankingModel, Ranking } from "../models/Ranking";
import { validate } from "class-validator";

interface AuthenticatedRequest extends Request {
    user?: any;
}


export async function createRanking(req:AuthenticatedRequest, res:Response){

    if(req.user.admin){

        try {
            const body = req.body;

            if(!body){
                throw new Error('Data is required');
            }

            const newRanking = new Ranking()
            newRanking.username = body.username
            newRanking.score = body.score
            newRanking.response_time = body.response_time

            const errors = await validate(newRanking)

            if(errors.length > 0){
                res.status(400).json(errors);
            }else{
                const ranking = await RankingModel.create(newRanking)
                res.status(201).json(ranking)
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

export async function allRanking (req:Request, res:Response) {

    try{
        const allQuestions = await RankingModel.find()
        res.status(200).json(allQuestions)
    }catch(e: any){
        console.log(`ERROR: ${e.message}`)
        res.status(404).json(e.message)
    }
}