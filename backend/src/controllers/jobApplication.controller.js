import { parse } from "dotenv";
import prisma from "../db/prisma.js";

// TODO : add pagination if needed
export const getJobApplications = async (req, res) => {
  try {
    const jobApplications = await prisma.job_application.findMany({
      include: {
        application_status: true,
        application_overall: true,
      },
    });

    res.status(200).send({ jobApplications });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

export const addJobApplication = async (req, res) => { 
  try {
    const { position, positionLevel, company, platform, location, expectedSalary, offeredSalary, applyStatusId, applyOverallId, remarks } =
      req.body;
    
    const jobApplication = await prisma.job_application.create({
      data: {
        position,
        position_level: positionLevel,
        company,
        platform,
        location,
        expected_salary: parseFloat(expectedSalary),
        offered_salary: parseFloat(offeredSalary),
        apply_status_id: parseInt(applyStatusId),
        apply_overall_id: parseInt(applyOverallId),
        remarks,
        created_by: req.user.user_id,
      },
    });

    res.status(201).send({ message: "Job application added successfully", jobApplication });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const updateJobApplication = async (req, res) => { 
  try {
    const { id } = req.params;
    const { position, positionLevel, company, platform, location, expectedSalary, offeredSalary, applyStatusId, applyOverallId, remarks } =
      req.body;
    
    const jobApplication = await prisma.job_application.update({
      where: { id },
      data: {
        position,
        position_level: positionLevel,
        company,
        platform,
        location,
        expected_salary: parseFloat(expectedSalary),
        offered_salary: parseFloat(offeredSalary),
        apply_status_id: parseInt(applyStatusId),
        apply_overall_id: parseInt(applyOverallId),
        remarks,
        updated_by: req.user.user_id,
        updated_at: new Date(),
      },
    });

    res.status(200).send({ message: "Job application updated successfully", jobApplication });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const deleteJobApplication = async (req, res) => { 
  try {
    const { id } = req.params;

    const jobApplication = await prisma.job_application.update({
      where: { id },
      data: {
        is_active: false,
        updated_by: req.user.user_id,
        updated_at: new Date(),
      },
    });

    res.status(200).send({ message: "Job application deleted successfully", jobApplication });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}