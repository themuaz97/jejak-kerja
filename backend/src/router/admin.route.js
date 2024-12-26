import express from "express";
import { protectAdminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { addRole, deleteRole, getRoles, updateRole } from "../controllers/role.controller.js";
import { activateUser, addUser, deleteUser, getUsers, updateUser } from "../controllers/user.controller.js";
import { activateApplyStatus, addApplyStatus, deleteApplyStatus, getApplyStatusAdmin, updateApplyStatus } from "../controllers/applyStatus.controller.js";
import { activateApplyOverall, addApplyOverall, deleteApplyOverall, getApplyOverallAdmin, updateApplyOverall } from "../controllers/applyOverall.controller.js";

const routerAdmin = express.Router();

routerAdmin.use(protectRoute, protectAdminRoute);

// roles
routerAdmin.get("/roles", getRoles);
routerAdmin.post("/role/add", addRole);
routerAdmin.put("/role/:id/update", updateRole);
routerAdmin.patch("/role/:id/delete", deleteRole);

// users
routerAdmin.get("/users", getUsers);
routerAdmin.post("/user/add", addUser);
routerAdmin.put("/user/:id/update", updateUser);
routerAdmin.patch("/user/:id/delete", deleteUser);
routerAdmin.patch("/user/:id/activate", activateUser);

// application status
routerAdmin.get('/application-status', getApplyStatusAdmin)
routerAdmin.post('/application-status/add', addApplyStatus)
routerAdmin.put('/application-status/:id/update', updateApplyStatus)
routerAdmin.patch('/application-status/:id/delete', deleteApplyStatus)
routerAdmin.patch('/application-status/:id/activate', activateApplyStatus)

// application overall
routerAdmin.get('/application-overall', getApplyOverallAdmin)
routerAdmin.post('/application-overall/add', addApplyOverall)
routerAdmin.put('/application-overall/:id/update', updateApplyOverall)
routerAdmin.patch('/application-overall/:id/delete', deleteApplyOverall)
routerAdmin.patch('/application-overall/:id/activate', activateApplyOverall)

export default routerAdmin;