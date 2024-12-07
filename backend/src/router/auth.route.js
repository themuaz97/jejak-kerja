/** @format */

import express from "express";
import { login, me, register } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/me', protectRoute, me)

export default authRouter;
