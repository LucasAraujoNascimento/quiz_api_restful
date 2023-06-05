import { Router, Request, Response } from "express";
import { registerQuestion, showQuestion } from "../controllers/questionController";
import authController from "../middlewares/authController";

const router = Router();

router.get('/', showQuestion)
router.post('/register', authController, registerQuestion)




export default router