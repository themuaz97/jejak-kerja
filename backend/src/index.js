/** @format */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import router from "./router/index.route.js";
import authRouter from "./router/auth.route.js";
import cookieParser from "cookie-parser";
import prisma from "./db/prisma.js";
import passport from "./config/passport.js";
import routerAdmin from "./router/admin.route.js";

dotenv.config();

const server = express();

server.use(express.json()); // Parse JSON request bodies
server.use(cors(
  {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
));
server.use(cookieParser());

server.get("/", (req, res) => {
  res.status(200).send({
    message: "ok",
  });
})

const form = multer()

server.use(passport.initialize());

// TODO: Routes refactor code if that endpoint requires to upload image
server.use("/api/auth", (req, res, next) => {
  if (req.path === '/account/update') {
    return next();
  }
  form.none()(req, res, next);
}, authRouter);
server.use('/api/admin', form.none(), routerAdmin);
server.use("/api", form.none(), router);

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Ensure Prisma disconnects on process exit
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
