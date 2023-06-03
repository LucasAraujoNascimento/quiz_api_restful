import {Schema, model} from 'mongoose';
import { IsString, IsNumber } from 'class-validator'

export class Question {

    @IsString()
    question!: string

    options!: string[]

    @IsNumber()
    correct_answer!: number

}

const QuestionSchema = new Schema({
    question:{type:String, required:true},
    options:{type: Array, required:true},
    correct_answer:{type:Number}
})

export const QuestionModel = model('Question', QuestionSchema);