import { model, Schema } from 'mongoose';
import { IsString, IsNumber } from 'class-validator';

export class Logs {

    @IsString()
    username!: string

    @IsString()
    question!: string

    @IsString()
    option!: string

    @IsNumber()
    correct_answer!: number

    @IsString()
    response_time!: string
}

const LogsSchema = new Schema({
    username:{type:String, default:true},
    question:{type:String, default:true},
    option:{type:String, default:true},
    correct_answer:{type:Number, default:true},
    response_time:{type:String},
})

export const LogsModel = model('Log', LogsSchema)