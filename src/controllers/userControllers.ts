import { Request, Response } from "express";
import { User, UserModel } from "../models/User";
import { validate } from 'class-validator'
import { hashSync, compareSync } from "bcryptjs";
import config from 'config';
import jwt from 'jsonwebtoken';


export async function registerUser(req:Request, res:Response) {
    const body = req.body;

    if(!body){
        throw new Error('Data is required');
    }

    const selectedUser = await UserModel.findOne({email:req.body.email});

    if(selectedUser){
        return res.status(400).json('Email already exists')
    }

    try{
        const newUser = new User();
        newUser.username = body.username;
        newUser.email = body.email;
        newUser.password = hashSync(body.password);

        const errors = await validate(newUser);
        if(errors.length > 0){
            return res.status(500).json(errors);
        }else{
            const user = await UserModel.create(newUser)
            return res.status(201).json(user);
        }
    }catch(e: any){
        console.log(`ERROR: ${e.message}`);
        res.status(500).json(e.message);
    }
}

export async function loginUser(req:Request, res:Response){

    const selectedUser = await UserModel.findOne({email:req.body.email})

    if(!selectedUser){
        return res.status(404).json('Incorrect email or password')
    }

    const passwordMatch = compareSync(req.body.password, selectedUser.password)
    if(!passwordMatch){
        return res.status(404).json('Password incorrect')
    }

    const token = config.get<string>('token');

    const validateToken = jwt.sign({_id:selectedUser._id, admin:selectedUser.admin}, token)
    res.header('Validate-Token', validateToken)
    
    
    res.status(200).json('Logged')

   
}