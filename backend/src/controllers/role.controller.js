/** @format */

import prisma from "../db/prisma.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await prisma.roles.findMany();

    res.status(200).send({ roles });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

export const addRole = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const role = await prisma.roles.create({
      data: {
        name,
      },
    });

    res.status(201).send({ message: "Role created successfully", role });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

export const updateRole = async (req, res) => { 
  try {
    const { id } = req.params;
    const { name } = req.body;

    const role = await prisma.roles.update({
      where: { id },
      data: {
        name,
        updated_at: new Date(),
      },
    });

    res.status(200).send({ message: "Role updated successfully", role });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const deleteRole = async (req, res) => { 
  try {
    const { id } = req.params;

    const role = await prisma.roles.update({
      where: { id },
      data: {
        is_active: false,
      },
    });

    res.status(200).send({ message: "Role deleted successfully", role });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}