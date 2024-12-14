/** @format */

import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    const users = await prisma.users.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        username: true,
        roles: true,
      },
      skip,
      take: pageSize,
    });

    const totalCount = await prisma.users.count({
      where: {
        is_active: true,
      },
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    const hasPreviousPage = pageNumber > 1;
    const hasNextPage = pageNumber < totalPages;

    res.status(200).send({
      users,
      meta: {
        page: pageNumber,
        limit: pageSize,
        totalCount,
        totalPages,
        hasPreviousPage,
        hasNextPage,
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      username,
      roleId,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !username ||
      !roleId
    ) {
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

    const profilePic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

    const user = await prisma.users.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
        username,
        role_id: roleId,
        profile_img: profilePic,
      },
    });

    res.status(201).send({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};
