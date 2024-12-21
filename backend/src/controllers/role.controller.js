/** @format */

import prisma from "../db/prisma.js";

export const getRoles = async (req, res) => {
  try {
    const { page = 1 } = req.query;

    // // Ensure page are numbers
    const pageNumber = parseInt(page, 10);

    // Fetch paginated roles
    const roles = await prisma.roles.findMany({
      where: {
        is_active: true
      },
      orderBy: {
        created_at: "desc",
      },
    });

    // Count total roles for pagination metadata
    const totalCount = await prisma.roles.count({
      where: {
        is_active: true
      },
    });

    res.status(200).send({
      roles,
      meta: {
        page: pageNumber,
        totalCount,
      }
    });
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

    if (!name) {
      return res.status(400).send({ message: "Missing required fields" });
    }

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