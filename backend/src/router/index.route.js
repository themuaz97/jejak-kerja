/** @format */

import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getApplyStatus } from "../controllers/applyStatus.controller.js";
import { getApplyOverall } from "../controllers/applyOverall.controller.js";
import { addJobApplication, deleteJobApplication, getJobApplications, updateJobApplication } from "../controllers/jobApplication.controller.js";
import { me } from "../controllers/auth.controller.js";
import { updatePassword } from "../controllers/account.controller.js";

const router = express.Router();

router.use(protectRoute);

// account
router.get('/me', me)
router.put('/account/password/update', updatePassword)

// job application
router.get('/job-applications', getJobApplications)
router.post('/job-application/add', addJobApplication)
router.put('/job-application/:id/update', updateJobApplication)
router.patch('/job-application/:id/delete', deleteJobApplication)

// application status
router.get('/application-status', getApplyStatus)

// application overall
router.get('/application-overall', getApplyOverall)

export default router;
