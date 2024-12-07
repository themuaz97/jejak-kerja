/** @format */
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import { Provider } from "@prisma/client";

export const register = async (req, res) => {
  try {
    const {firstName, lastName, email, password, confirmPassword, username, roleId} = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword || !username || !roleId) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).send({ message: "User already exists" });
  }
  
  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match" });
  }

  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);

  const profilePic =`https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

  const user = await prisma.users.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
      username,
      profile_img: profilePic,
      role_id: roleId,
    },
  });
    
  const provider = await prisma.sso_providers.create({
    data: {
      user_id: user.id,
    },
  })
    
  res.status(201).send({ message: "User registered successfully", data: user });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

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
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateToken(provider.id, user.id, res, Provider.internal, "auth");
    
    res.status(200).send({ message: "Login successful", data: { user, accessToken, refreshToken } });
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
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.roles
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}