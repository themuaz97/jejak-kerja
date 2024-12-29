import prisma from "../db/prisma.js";

export const getDataJobApplications = async (req, res) => {
  try {
    const totalJobs = await prisma.job_application.count({
      where: {
        created_by: req.user.user_id,
      }
    });

    const totalJobsthisMonth = await prisma.job_application.count({
      where: {
        created_by: req.user.user_id,
        created_at: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        }
      }
    });

    const totalJobsLastMonth = await prisma.job_application.count({
      where: {
        created_by: req.user.user_id,
        created_at: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        }
      }
    });

    // Top platforms the user applied to
    const topPlatforms = await prisma.job_application.groupBy({
      by: ['platform'],
      where: {
        created_by: req.user.user_id,
      },
      _count: {
        platform: true,
      },
      orderBy: {
        _count: {
          platform: 'desc', // Sort by count of applications in descending order
        },
      },
      take: 1, // Limit to top count platforms
    });

    // Extract platform names and counts
    const topPlatformsData = topPlatforms.map((platform) => ({
      platform: platform.platform,
      count: platform._count.platform,
    }));

    res.status(200).send({
      message: "Dashboard data analytics fetched successfully",
      analytics: {
        totalJobs,
        totalJobsthisMonth,
        totalJobsLastMonth,
        topPlatforms: topPlatformsData,
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

export const getJobApplicationByStatus = async (req, res) => { 
  try {
    const jobApplicationByStatus = await prisma.job_application.groupBy({
      by: ['apply_status_id'],
      _count: { id: true },
      where: {
        created_by: req.user.user_id,
      },
    });

    const statusDetails = await prisma.application_status.findMany({
      where: { id: { in: jobApplicationByStatus.map((status) => status.apply_status_id) } }
    });

    const formattedStatusData = jobApplicationByStatus.map((status) => {
      const statusInfo = statusDetails.find((s) => s.id === status.apply_status_id);
      return {
        id: status.apply_status_id,
        name: statusInfo?.name || 'Unknown',
        color: statusInfo?.color_code || '#cccccc',
        count: status._count.id,
      };
    });

    res.status(200).send({
      message: "Dashboard data analytics fetched successfully",
        jobApplicationByStatus: formattedStatusData,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

export const getJobApplicationByPlatform = async (req, res) => {
  try {
    const jobApplicationsByPlatform = await prisma.job_application.groupBy({
      by: ['platform'],
      where: {
        created_by: req.user.user_id, 
        is_active: true, 
      },
      _count: {
        platform: true, // Count the occurrences of each platform
      },
    });

    const formattedPlatformData = jobApplicationsByPlatform.map(item => ({
      platform: item.platform || 'Others',
      count: item._count.platform,
    }));

    res.status(200).send({
      message: "Job applications by platform fetched successfully",
      jobApplicationsByPlatform: formattedPlatformData,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};
