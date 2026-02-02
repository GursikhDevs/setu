import { Router } from "express";
import { otherUsersChattedWith, startChat } from "../controllers/message.js";
import {authenticateUser} from "../middleware/jwtAuthMiddleware.js";   // <-- your auth middleware

const router = Router();

router.post("/start/:targetId", authenticateUser, startChat);
router.get("/everChated",authenticateUser,otherUsersChattedWith);

export default router;
