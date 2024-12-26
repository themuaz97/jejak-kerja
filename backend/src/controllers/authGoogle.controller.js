import { Provider } from "@prisma/client";
import passport from "passport";
import { generateToken } from "../utils/token.js";
import prisma from "../db/prisma.js";

export const googleLogin = async (req, res, next) => {
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    session: false,
  })(req, res, next);
};

export const googleCallback = async (req, res, next) => {
  passport.authenticate('google', { session: false }, async (error, user, info) => {
    try {
      if (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
      }

      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      const provider = await prisma.sso_providers.findFirst({
        where: {
          user_id: user.id,
        }
      });

      // Generate tokens
      const {accessToken} = await generateToken(
        provider?.id || null,
        user.id,
        res,
        Provider.google,
        'bearer'
      );

      return res.redirect(`${process.env.FRONTEND_URL}/auth/callback?accessToken=${accessToken}`);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })(req, res, next);
};