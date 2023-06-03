import { model, Schema } from "mongoose";
import { IsNumber, IsString } from "class-validator";

export class Ranking{
    @IsString()
    username!: string

    @IsNumber()

    score!: number
    @IsString()
    response_time!: string
}

const RankingSchema = new Schema({
    username:{type:String, required:true},
    score:{type:Number, required:true},
    response_time:{type:String}
})

export const RankingModel = model('Ranking', RankingSchema);