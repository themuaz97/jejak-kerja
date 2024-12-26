/** @format */

import express from "express";
import { forgotPassword, login, logout, me, refreshToken, register, resetPassword } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { googleCallback, googleLogin } from "../controllers/authGoogle.controller.js";
import { updateMe } from "../controllers/account.controller.js";
import upload from "../middleware/upload.middleware.js";

const authRouter = express.Router();

// account
authRouter.get('/me', protectRoute, me)
authRouter.put('/account/update', protectRoute, upload.single('profileImg'), updateMe)

// auth
authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout) 
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password', resetPassword)
authRouter.post('/refresh-token', refreshToken)

// google
authRouter.get('/google', googleLogin);
authRouter.get('/google/callback', googleCallback);
export default authRouter;
