/** @format */

import express from "express";
import { addRole, deleteRole, getRoles, updateRole } from "../controllers/role.controller.js";
import { activateUser, addUser, deleteUser, getUsers, updateUser } from "../controllers/user.controller.js";
import { protectAdminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { activateApplyStatus, addApplyStatus, deleteApplyStatus, getApplyStatus, updateApplyStatus } from "../controllers/applyStatus.controller.js";
import { activateApplyOverall, addApplyOverall, deleteApplyOverall, getApplyOverall, updateApplyOverall } from "../controllers/applyOverall.controller.js";
import { addJobApplication, deleteJobApplication, getJobApplications, updateJobApplication } from "../controllers/jobApplication.controller.js";

const router = express.Router();

router.use(protectRoute);

router.use(protectAdminRoute);

// roles
router.get("/roles", getRoles);
router.post("/role/add", addRole);
router.put("/role/:id/update", updateRole);
router.patch("/role/:id/delete", deleteRole);

// users
router.get("/users", getUsers);
router.post("/user/add", addUser);
router.put("/user/:id/update", updateUser);
router.patch("/user/:id/delete", deleteUser);
router.patch("/user/:id/activate", activateUser);

// application status
router.get('/application-status', getApplyStatus)
router.post('/application-status/add', addApplyStatus)
router.put('/application-status/:id/update', updateApplyStatus)
router.patch('/application-status/:id/delete', deleteApplyStatus)
router.patch('/application-status/:id/activate', activateApplyStatus)

// application overall
router.get('/application-overall', getApplyOverall)
router.post('/application-overall/add', addApplyOverall)
router.put('/application-overall/:id/update', updateApplyOverall)
router.patch('/application-overall/:id/delete', deleteApplyOverall)
router.patch('/application-overall/:id/activate', activateApplyOverall)

// job application
router.get('/job-applications', getJobApplications)
router.post('/job-application/add', addJobApplication)
router.put('/job-application/:id/update', updateJobApplication)
router.patch('/job-application/:id/delete', deleteJobApplication)

export default router;
