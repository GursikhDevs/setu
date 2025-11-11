import { Router } from "express";
import { alumniSuggestionList } from "../controllers/suggesionControllers.js";
import { authenticateUser } from "../middleware/jwtAuthMiddleware.js"; 

const router = Router();

router.get("/suggestAlumni",authenticateUser,alumniSuggestionList);

export default router;