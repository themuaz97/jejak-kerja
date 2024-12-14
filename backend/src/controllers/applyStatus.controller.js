import prisma from "../db/prisma.js";

export const getApplyStatus = async (req, res) => {
  try {
    const applyStatus = await prisma.application_status.findMany();

    res.status(200).send({ applyStatus });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

// TODO : add color to db applyStatus, applyOverall too
export const addApplyStatus = async (req, res) => { 
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const applyStatus = await prisma.application_status.create({
      data: {
        name,
        created_by: req.user.user_id,
      },
    });

    res.status(201).send({ applyStatus });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const updateApplyStatus = async (req, res) => { 
  try {
    const { id } = req.params;
    const { name } = req.body;

    const applyStatus = await prisma.application_status.update({
      where: { id: Number(id) },
      data: {
        name,
        updated_at: new Date(),
        updated_by: req.user.user_id,
      },
    });

    res.status(200).send({ applyStatus });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const deleteApplyStatus = async (req, res) => { 
  try {
    const { id } = req.params;

    const applyStatus = await prisma.application_status.update({
      where: { id: Number(id) },
      data: {
        is_active: false,
        updated_at: new Date(),
        updated_by: req.user.user_id,
      },
    });

    res.status(200).send({ applyStatus });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}