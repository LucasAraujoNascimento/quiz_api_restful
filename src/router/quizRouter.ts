import { Router, Request, Response } from "express";
import { registerQuestion, showQuestion } from "../controllers/questionController";

const router = Router();

router.get('/', showQuestion)
router.post('/register', registerQuestion)




export default router