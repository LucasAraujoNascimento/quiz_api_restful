import { Router, Request, Response } from "express";
import { loginUser, registerUser } from "../controllers/userControllers";
import authController from "../middlewares/authController";

interface AuthenticatedRequest extends Request {
    user?: any;
}


const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);



export default router