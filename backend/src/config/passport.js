import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from '../db/prisma.js';
import { Provider } from '@prisma/client';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_URI,
  passReqToCallback: true
},
  async (request, response, accessToken, refreshToken, profile, done) => {
    try {
      const userRole = await prisma.roles.findFirst({
        where: { name: "user" }
      });

      if (!userRole) {
        throw new Error('Default user role not found');
      }

      // Check if user exists and is inactive
      const existingUser = await prisma.users.findFirst({
        where: {
          email: profile.emails[0].value,
        },
      });

      if (existingUser && !existingUser.is_active) {
        // User exists but is inactive
        return done(null, false, {
          message: 'User account has been deleted',
        });
      }

      // Check if user exists
      let user = await prisma.users.findUnique({
        where: { email: profile.emails[0].value },
        include: {
          ssoProviders: true
        }
      });

      if (!user) {
        // Create new user
        user = await prisma.users.create({
          data: {
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            username: profile.displayName,
            email: profile.emails[0].value,
            profile_img: profile.photos[0].value,
            role_id: userRole.id,
            ssoProviders: {
              create: {
                provider: Provider.google,
                provider_id: profile.id
              }
            }
          },
          include: {
            ssoProviders: true
          }
        });
      } else {
        // Update existing user if needed
        if (!user.ssoProviders.some(p => p.provider === Provider.google)) {
          await prisma.sso_providers.create({
            data: {
              user_id: user.id,
              provider_id: profile.id
            }
          });
        }
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

export default passport;