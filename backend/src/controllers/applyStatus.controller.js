import prisma from "../db/prisma.js";

export const getApplyStatus = async (req, res) => {
  try {
    const applyStatus = await prisma.application_status.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    res.status(200).send({ applyStatus });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const getApplyStatusAdmin = async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const pageNumber = parseInt(page, 10);

    const applyStatus = await prisma.application_status.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    const totalCount = await prisma.application_status.count();

    res.status(200).send({ applyStatus, meta: { page: pageNumber, totalCount } });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const addApplyStatus = async (req, res) => {
  try {
    const { name, colorCode } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const applyStatus = await prisma.application_status.create({
      data: {
        name,
        color_code: colorCode,
        created_by: req.user.user_id,
      },
    });

    res.status(201).send({ message: "Apply Status created successfully", applyStatus });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const updateApplyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, colorCode } = req.body;

    const applyStatus = await prisma.application_status.update({
      where: { id: Number(id) },
      data: {
        name,
        color_code: colorCode,
        updated_at: new Date(),
        updated_by: req.user.user_id,
      },
    });

    res.status(200).send({ message: "Apply Status updated successfully", applyStatus });
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

    res.status(200).send({ message: "Apply Status deleted successfully", applyStatus });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const activateApplyStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const applyStatus = await prisma.application_status.findUnique({
      where: { id: Number(id) },
    });

    if (!applyStatus) {
      return res.status(404).send({ message: "Apply Status not found" });
    }

    if (applyStatus.is_active) {
      return res.status(400).send({ message: "Apply Status is already active" });
    }

    const updatedApplyStatus = await prisma.application_status.update({
      where: { id: Number(id) },
      data: {
        is_active: true,
        updated_at: new Date(),
        updated_by: req.user.user_id,
      },
    })

    res.status(200).send({ message: "Apply Status activated successfully", applyStatus: updatedApplyStatus });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}