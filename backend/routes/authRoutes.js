import express from "express";
import { signup, login } from "../controllers/authControllers.js";
import { upload } from "../middleware/multer.js";
import { updateProfilePicture } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);


router.post(
  "/update-picture/:userId",
  upload.single("avatar"), 
  updateProfilePicture
);

export default router;
