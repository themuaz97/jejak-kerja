/** @format */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import router from "./router/index.route.js";
import authRouter from "./router/auth.route.js";
import cookieParser from "cookie-parser";
import prisma from "./db/prisma.js";

dotenv.config();

const server = express();

server.use(express.json()); // Parse JSON request bodies
server.use(cors());
server.use(cookieParser());

server.get("/", (req, res) => {
  res.status(200).send({
    message: "ok",
  });
})

const form = multer()

// Routes
server.use("/api/auth", form.none(), authRouter);
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
