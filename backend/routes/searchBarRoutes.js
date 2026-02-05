import Router from "express";
import  {authenticateUser}  from "../middleware/jwtAuthMiddleware.js";
import { searchUsers } from "../controllers/searchBarController.js";


const router = Router();

router.post("/searchBar", authenticateUser, searchUsers);
 
export default router;