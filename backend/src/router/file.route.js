import express from "express";
import { updateMe } from "../controllers/account.controller.js";
import upload from "../middleware/upload.middleware.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const fileRouter = express.Router();

// Update personal information with optional profile image
fileRouter.put('/account/personal/update', protectRoute, upload.single('profileImg'), updateMe);

export default fileRouter;