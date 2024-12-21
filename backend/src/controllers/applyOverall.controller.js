import prisma from "../db/prisma.js";

export const getApplyOverall = async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const pageNumber = parseInt(page, 10);

    const applyOverall = await prisma.application_overall.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    const totalCount = await prisma.application_overall.count();

    res.status(200).send({ message: "Apply Overall fetched successfully", applyOverall, meta: { page: pageNumber, totalCount } });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const addApplyOverall = async (req, res) => { 
  try {
    const { name, colorCode } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const applyOverall = await prisma.application_overall.create({
      data: {
        name,
        color_code: colorCode,
        created_by: req.user.user_id,
      },
    });

    res.status(201).send({ message: "Apply Overall created successfully", applyOverall });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const updateApplyOverall = async (req, res) => { 
  try {
    const { id } = req.params;
    const { name, colorCode } = req.body;

    const applyOverall = await prisma.application_overall.update({
      where: { id: Number(id) },
      data: {
        name,
        color_code: colorCode,
        updated_at: new Date(),
        updated_by: req.user.user_id,
      },
    });

    res.status(200).send({ message: "Apply Overall updated successfully", applyOverall });
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

    res.status(200).send({ message: "Apply Overall deleted successfully", applyOverall });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const activateApplyOverall = async (req, res) => { 
  try {
    const { id } = req.params;

    const applyOverall = await prisma.application_overall.findUnique({
      where: { id },
    });

    if (!applyOverall) {
      return res.status(404).send({ message: "Apply Overall not found" });
    }

    if (applyOverall.is_active) {
      return res.status(400).send({ message: "Apply Overall is already active" });
    }

    const updatedApplyOverall = await prisma.application_overall.update({
      where: { id },
      data: { is_active: true, updated_at: new Date() },
    });

    res.status(200).send({ message: "Apply Overall activated successfully", applyOverall: updatedApplyOverall });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}