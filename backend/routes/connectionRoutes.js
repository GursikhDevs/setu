import { Router } from "express";
import { authenticateUser } from "../middleware/jwtAuthMiddleware.js"; 
import { sendConnectionRequest } from "../controllers/connections.js";

const router = Router();

router.get("/makeconnection",authenticateUser,sendConnectionRequest);

export default router;