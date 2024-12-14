/** @format */
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/token.js";
import { Provider } from "@prisma/client";
import transporter from "../config/emailConfig.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, username } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (password.length < 6) {
      return res
        .status(400)
        .send({ message: "Password must be at least 6 characters long" });
    }

    const profilePic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

    const roles = await prisma.roles.findFirst({
      where: {
        name: "user"
      }
    })

    const user = await prisma.users.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
        username,
        profile_img: profilePic,
        role_id: roles.id,
      },
    });

    const provider = await prisma.sso_providers.create({
      data: {
        user_id: user.id,
        provider: Provider.internal,
      },
    })

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Welcome to Our Jejak Kerja!",
      text: `Hello ${firstName} ${lastName},\n\nWelcome to our app! We're excited to have you on board.\n\nFeel free to start exploring and reach out if you have any questions.
        \n\nBest regards,\nJejak Kerja Support Team`,
      html: `<p>Hello ${firstName} ${lastName},</p>
               <p>Welcome to our app! We're excited to have you on board.</p>
               <p>Feel free to start exploring and reach out if you have any questions.</p>
               <p>Best regards,<br>Jejak Kerja Support Team</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).send({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    if (password.length < 6) {
      return res.status(400).send({ message: "Password must be at least 6 characters long" });
    }

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const provider = await prisma.sso_providers.findFirst({
      where: { user_id: user.id },
    });

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({ message: "email or password is incorrect" });
    }

    const { accessToken, refreshToken } = await generateToken(provider.id, user.id, res, Provider.internal, "auth");

    res.status(200).send({ message: "Login successful", user, accessToken, refreshToken });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const me = async (req, res) => {
  try {
    const user = await prisma.users.findFirst({
      where: { id: req.user.user_id },
    })

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_img: user.profile_img,
        role: user.roles
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }

    const user = await prisma.users.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).send({ error: "The email is not registered yet" });
    }

    const provider = await prisma.sso_providers.findFirst({
      where: { user_id: user.id },
    });

    const { accessToken } = await generateToken(
      provider.id,
      user.id,
      res,
      Provider.internal,
      "reset"
    );

    const resetLink = `${process.env.FRONTEND_URL}/user/forgot-password?token=${accessToken}`;

    // Email options
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Hello ${user.first_name} ${user.last_name},\n\nTo reset your password, please click the following link:\n${resetLink}\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nJejak Kerja Support Team`,
      html: `<p>Hello ${user.first_name} ${user.last_name},</p>
              <p>To reset your password, please click the following link:</p>
              <a href="${resetLink}">${resetLink}</a>
              <p>If you did not request a password reset, please ignore this email.</p>
              <p>Best regards,<br>Jejak Kerja Support Team</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).send({
      email: user.email,
      message: "Check your email for the reset link",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).send({ message: "Token and new password are required" });
    }

    // Verify the token and extract the user ID
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(400).send({ message: "Invalid or expired token", error: error.message });
    }

    const userId = decoded.userId;

    // Check if the user exists in the database
    const user = await prisma.users.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if the token exists in the database and has not expired
    const tokenRecord = await prisma.tokens.findFirst({
      where: {
        token: token,
        user_id: userId,
        token_type: "reset",
        expired_at: {
          gte: new Date(),
        },
      },
    });

    if (!tokenRecord) {
      return res.status(401).send({ error: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await prisma.users.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    // Delete the token after successful password reset to prevent reuse
    await prisma.tokens.delete({
      where: { id: tokenRecord.id },
    });

    res.status(200).send({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).send({ message: "refresh token cookie is missing!" });
    }

    let decoded;
    try {
      // Verify the refresh token with the secret key and decode it
      decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

    } catch (error) {
      return res
        .status(401)
        .send({
          message: "Invalid or expired refresh token",
          error: error.message,
        });
    }

    const userId = decoded.userId;

    // Generate a new access token
    const newAccessToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    // Calculate new expiration dates
    const newAccessTokenExpiresAt = new Date();
    newAccessTokenExpiresAt.setHours(newAccessTokenExpiresAt.getHours() + 1);

    // Update the database with the new refresh token and expiration dates
    await prisma.tokens.updateMany({
      where: { refresh_token: refreshToken },
      data: {
        token: newAccessToken,
        expired_at: newAccessTokenExpiresAt,
      },
    });

    res.status(200).send({ message: "Token refreshed successfully", accessToken: newAccessToken });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the refreshToken from the cookies
    res.clearCookie("refreshToken", {
      httpOnly: true, // Secure against XSS attacks
      sameSite: "strict", // Prevent cross-site cookie usage
      secure: process.env.NODE_ENV === "development", // Send cookie only over HTTPS in production
    });

    res.status(200).send({ message: "Successfully logged out" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};
