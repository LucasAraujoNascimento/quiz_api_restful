import { Router } from "express";
import { allRanking, createRanking } from "../controllers/rankingController";
import authController from "../middlewares/authController";

const router = Router();

router.get('/showRanking', allRanking);
router.post('/registerRanking', authController, createRanking);


export default router;