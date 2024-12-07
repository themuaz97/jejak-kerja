/** @format */

import express from "express";
import { addRole, deleteRole, getRoles, updateRole } from "../controllers/role.controller.js";
import { addUser, getUsers } from "../controllers/user.controller.js";
import { protectAdminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { addApplyStatus, deleteApplyStatus, getApplyStatus, updateApplyStatus } from "../controllers/applyStatus.controller.js";
import { addApplyOverall, deleteApplyOverall, getApplyOverall, updateApplyOverall } from "../controllers/applyOverall.controller.js";

const router = express.Router();

router.use(protectRoute);

router.use(protectAdminRoute);

// roles
router.get("/roles", getRoles);
router.post("/role/add", addRole);
router.put("/role/:id/update", updateRole);
router.put("/role/:id/delete", deleteRole);

// users
router.get("/users", getUsers);
router.post("/user/add", addUser);

// application status
router.get('/application-status', getApplyStatus)
router.post('/application-status/add', addApplyStatus)
router.put('/application-status/:id/update', updateApplyStatus)
router.put('/application-status/:id/delete', deleteApplyStatus)

// application overall
router.get('/application-overall', getApplyOverall)
router.post('/application-overall/add', addApplyOverall)
router.put('/application-overall/:id/update', updateApplyOverall)
router.put('/application-overall/:id/delete', deleteApplyOverall)

export default router;
