import { Request, Response } from "express";
import { QuestionModel, Question } from "../models/QuestionsAndAnswers";
import { validate } from 'class-validator' ;

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function registerQuestion (req:AuthenticatedRequest, res:Response){

    if(req.user.admin){

        try{

        const body = req.body;

        if(!body){
            throw new Error('Data is required');
        }

        const newQuestion = new Question()
        newQuestion.question = body.question;
        newQuestion.options = body.options;
        newQuestion.correct_answer = body.correct_answer;

        const errors = await validate(newQuestion)

        if(errors.length > 0){
            res.status(500).json(errors);
        }else{
            const question = await QuestionModel.create(newQuestion);
            res.status(201).json(question)
        }


        }catch(e: any){
            console.log(`ERROR: ${e.message}`)
            res.status(500).json(e.message)
        }
    }else{
        console.log('Acess denied Not Admin!')
        res.status(500).json('Acess denied Not Admin!')
    }
}


export async function showQuestion (req:Request, res:Response) {

    try{
        const allQuestions = await QuestionModel.find()
        res.status(200).json(allQuestions)
    }catch(e: any){
        console.log(`ERROR: ${e.message}`)
        res.status(404).json(e.message)
    }
}