import { Router } from "express";
import {
  upsertMyAlumniProfile,
  getMyAlumniProfile,
  searchAlumniByDepartment,
} from "../controllers/alumniControllers.js";
import { authenticateUser } from "../middleware/jwtAuthMiddleware.js"; 

const router = Router();

router.put("/upsertprofile", authenticateUser, upsertMyAlumniProfile);
router.get("/profile/me", authenticateUser, getMyAlumniProfile);
router.get("/search", authenticateUser, searchAlumniByDepartment);

export default router;
