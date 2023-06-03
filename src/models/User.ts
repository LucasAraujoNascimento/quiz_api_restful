import { model, Schema } from "mongoose";
import { IsString, IsEmail, Length} from 'class-validator';

export class User {
    @IsString()
    username!: string

    @IsEmail()
    email!: string

    @IsString()
    @Length(6)
    password!:string

}

const UserSchema = new Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, minlength: 6, required:true},
    admin:{type:Boolean, default:false},
    createdAt:{type:Date, default:Date.now}
})


export const UserModel = model('User', UserSchema);