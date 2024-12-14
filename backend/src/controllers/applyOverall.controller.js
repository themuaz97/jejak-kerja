import prisma from "../db/prisma.js";

export const getApplyOverall = async (req, res) => {
  try {
    const applyOverall = await prisma.application_overall.findMany();

    res.status(200).send({ applyOverall });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const addApplyOverall = async (req, res) => { 
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const applyOverall = await prisma.application_overall.create({
      data: {
        name,
        created_by: req.user.user_id,
      },
    });

    res.status(201).send({ applyOverall });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const updateApplyOverall = async (req, res) => { 
  try {
    const { id } = req.params;
    const { name } = req.body;

    const applyOverall = await prisma.application_overall.update({
      where: { id: Number(id) },
      data: {
        name,
        updated_at: new Date(),
        updated_by: req.user.user_id,
      },
    });

    res.status(200).send({ applyOverall });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const deleteApplyOverall = async (req, res) => { 
  try {
    const { id } = req.params;

    const applyOverall = await prisma.application_overall.update({
      where: { id: Number(id) },
      data: {
        is_active: false,
        updated_at: new Date(),
        updated_by: req.user.user_id,
      },
    });

    res.status(200).send({ applyOverall });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}