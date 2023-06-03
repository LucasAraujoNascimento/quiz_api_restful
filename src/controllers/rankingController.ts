import { Request, Response } from "express";
import { RankingModel, Ranking } from "../models/Ranking";
import { validate } from "class-validator";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function createRanking(req:AuthenticatedRequest, res:Response){

    if(req.user.admin){

        const body = req.body;
        if(!body){
            throw new Error('Data is required');
        }
    
        try {
            const newRanking = new Ranking();
            newRanking.username = req.body.username;
            newRanking.score = req.body.score;
            newRanking.response_time = req.body.response_time;
    
            const errors = await validate(newRanking)
            if(errors.length > 0){
                return res.status(500).json(errors);
            }else{
                const ranking = await RankingModel.create(newRanking)
                res.status(201).send(ranking)
            }
        } catch (e: any) {
            console.log(`ERROR: ${e.message}`)
            res.status(500).json(`ERROR: ${e.message}`)
        }
    }else{
        res.status(400).send('Não é admin: acesso negado!');
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