import {Router} from "express";
import { getProfilePage } from "../controllers/profilePageController.js";
import { authenticateUser } from "../middleware/jwtAuthMiddleware.js";

const router=Router();

router.get("/:userId", authenticateUser, getProfilePage);


export default router;
