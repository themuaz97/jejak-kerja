/** @format */

import { Provider } from "@prisma/client";
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const pageNumber = parseInt(page, 10);

    const users = await prisma.users.findMany({
      include: {
        roles: true
      },
      orderBy: {
        created_at: "desc",
      }
    });

    const totalCount = await prisma.users.count();

    res.status(200).send({
      users,
      meta: {
        page: pageNumber,
        totalCount,
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
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
      return res.status(400).send({ message: "Email already exists" });
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

    const provider = await prisma.sso_providers.create({
      data: {
        user_id: user.id,
        provider: Provider.internal,
      },
    })

    res.status(201).send({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

export const updateUser = async (req, res) => { 
  try {
    const { id } = req.params;
    const { firstName, lastName, email, username, phoneNo, password, roleId } = req.body;

    if (!firstName || !lastName || !email || !roleId) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const existingRole = await prisma.roles.findUnique({
      where: { id: roleId },
    });

    if (!existingRole) {
      return res.status(404).send({ message: "Role doesn't exist" });
    }

    const profilePic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

    // Prepare the update data
    const updateData = {
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      phone_no: phoneNo,
      profile_img: profilePic,
      roles: { connect: { id: roleId } },
      updated_at: new Date(),
    };

    // If a new password is provided, hash and include it in the update
    if (password) {
      const salt = bcrypt.genSaltSync();
      updateData.password = bcrypt.hashSync(password, salt);
    }

    // Update the user in the database
    const user = await prisma.users.update({
      where: { id },
      data: updateData,
    });

    res.status(200).send({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const deleteUser = async (req, res) => { 
  try {
    const { id } = req.params;

    const user = await prisma.users.update({
      where: { id },
      data: {
        is_active: false,
        updated_at: new Date(),
      },
    });

    res.status(200).send({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const activateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.is_active) {
      return res.status(400).send({ message: "User is already active" });
    }

    const updatedUser = await prisma.users.update({
      where: { id },
      data: { is_active: true, updated_at: new Date() },
    });

    res.status(200).send({ message: "User activated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};