import { Router } from "express";
import { startChat } from "../controllers/message.js";
import {authenticateUser} from "../middleware/jwtAuthMiddleware.js";   // <-- your auth middleware

const router = Router();

router.post("/start/:targetId", authenticateUser, startChat);

export default router;
