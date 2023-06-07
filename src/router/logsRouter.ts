import { Router } from "express";
import { allLogs, createLogs } from "../controllers/logsController";
import authController from "../middlewares/authController";

const router = Router();

router.get('/', allLogs)
router.post('/createLogs', authController, createLogs)


export default router