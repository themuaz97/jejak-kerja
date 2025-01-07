/** @format */

import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";

export const generateToken = async (ssoId, userId, res, provider, token_type) => {
  // Clean up expired tokens
  await deleteExpiredTokens();

  // 1. Generate the JWT access accessToken
  const accessToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "1h", // Access accessToken expires in 1 hour
  });

  const accessTokenExpiresAt = new Date();
  accessTokenExpiresAt.setHours(accessTokenExpiresAt.getHours() + 1);

  // 2. Generate the JWT refresh token
  const refreshToken = jwt.sign({ userId },process.env.REFRESH_SECRET_KEY,
    {
      expiresIn: "7d", // Refresh token expires in 7 days
    }
  );

  const refreshTokenExpiresAt = new Date();
  refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

  const ssoProviders = await prisma.sso_providers.upsert({
    where: {
      id: ssoId,
    },
    update: {
      provider: provider,
    },
    create: {
      provider: provider,
      user_id: userId,
    },
  });

  // 3. Store the tokens in the database
  await prisma.tokens.create({
    data: {
      user_id: userId,
      token: accessToken,
      expired_at: accessTokenExpiresAt,
      refresh_token: refreshToken,
      refresh_expired_at: refreshTokenExpiresAt,
      token_type,
    },
  });

  // 4. Set the access accessToken as an HTTP-only cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: process.env.NODE_ENV === "development",
    secure: process.env.NODE_ENV === "development",
    sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return { accessToken, refreshToken };
};

const deleteExpiredTokens = async () => {
  await prisma.tokens.deleteMany({
    where: {
      expired_at: {
        lte: new Date(),
      },
    },
  });
};