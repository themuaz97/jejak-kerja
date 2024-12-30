import express from "express";
import { protectAdminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { addRole, deleteRole, getRoles, updateRole } from "../controllers/role.controller.js";
import { activateUser, addUser, getUsers, updateUser } from "../controllers/user.controller.js";
import { activateApplyStatus, addApplyStatus, deleteApplyStatus, getApplyStatusAdmin, updateApplyStatus } from "../controllers/applyStatus.controller.js";
import { activateApplyOverall, addApplyOverall, deleteApplyOverall, getApplyOverallAdmin, updateApplyOverall } from "../controllers/applyOverall.controller.js";
import { activateFaqAnswer, activateFaqCategory, activateFaqQuestion, addFaqAnswer, addFaqCategory, addFaqQuestion, deleteFaqAnswer, deleteFaqCategory, deleteFaqQuestion, editFaqAnswer, editFaqCategory, editFaqQuestion, getFaqAnswersAdmin, getFaqCategoriesAdmin, getFaqQuestionsAdmin } from "../controllers/faq.controller.js";

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

// FAQs
// faq categories
routerAdmin.get('/faq/categories', getFaqCategoriesAdmin);
routerAdmin.post('/faq/category/add', addFaqCategory)	// for BE 
routerAdmin.put('/faq/category/:id/update', editFaqCategory)	// for BE 
routerAdmin.patch('/faq/category/:id/delete', deleteFaqCategory)// for BE
routerAdmin.patch('/faq/category/:id/activate', activateFaqCategory)// for BE

// faq questions
routerAdmin.get('/faq/questions', getFaqQuestionsAdmin);
routerAdmin.post('/faq/question/add', addFaqQuestion)	// for BE 
routerAdmin.put('/faq/question/:id/update', editFaqQuestion)	// for BE 
routerAdmin.patch('/faq/question/:id/delete', deleteFaqQuestion)	// for BE
routerAdmin.patch('/faq/question/:id/activate', activateFaqQuestion)	// for BE

// faq answers
routerAdmin.get('/faq/answers', getFaqAnswersAdmin);
routerAdmin.post('/faq/answer/add', addFaqAnswer)	// for BE 
routerAdmin.put('/faq/answer/:id/update', editFaqAnswer)	// for BE 
routerAdmin.patch('/faq/answer/:id/delete', deleteFaqAnswer)	// for BE 
routerAdmin.patch('/faq/answer/:id/activate', activateFaqAnswer)	// for BE 

export default routerAdmin;