import {Router} from "express";
import { createPost, getFeed } from "../controllers/postController.js";
import { authenticateUser } from "../middleware/jwtAuthMiddleware.js";
import {upload} from "../middleware/multer.js";

const router = Router();


router.post("/createPost",authenticateUser,upload.single("file"),createPost);
router.get("/feed",authenticateUser,getFeed);

export default router;