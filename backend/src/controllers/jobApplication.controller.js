import prisma from "../db/prisma.js";

// TODO : add sortBy, filterBy
export const getJobApplications = async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const pageNumber = parseInt(page, 10);

    const jobApplications = await prisma.job_application.findMany({
      where: {
        created_by: req.user.user_id,
      },
      include: {
        application_status: true,
        application_overall: true,
      },
    });

    const totalCount = await prisma.job_application.count({
      where: {
        created_by: req.user.user_id,
      },
    });

    res.status(200).send({ message: "Job applications fetched successfully", jobApplications, meta: { page: pageNumber, totalCount } });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

export const addJobApplication = async (req, res) => { 
  try {
    const { position, positionLevel, company, platform, location, expectedSalary, offeredSalary, applyStatusId, applyOverallId, remarks } =
      req.body;
    
    if (!position || !company || !platform || !expectedSalary || !applyStatusId) {
      return res.status(400).send({ message: "Missing required fields" });
    }
    
    const jobApplication = await prisma.job_application.create({
      data: {
        position,
        position_level: positionLevel,
        company,
        platform,
        location,
        expected_salary: parseFloat(expectedSalary),
        offered_salary: parseFloat(offeredSalary),
        application_status: { connect: { id: parseInt(applyStatusId) } },
        application_overall: { connect: { id: parseInt(applyOverallId) } },
        remarks,
        users_created_by: { connect: { id: req.user.user_id } },
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
    
    if (!position || !company || !platform || !expectedSalary || !applyStatusId) {
      return res.status(400).send({ message: "Missing required fields" });
    }
    
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
        application_status: { connect: { id: parseInt(applyStatusId) } },
        application_overall: { connect: { id: parseInt(applyOverallId) } },
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