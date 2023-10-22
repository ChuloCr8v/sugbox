import express from "express";
import {
  editEmployee,
  deleteEmployee,
  getEmployees,
  getEmployee,
} from "../controllers/Employee.js";
import { verifyEmployeeToken } from "../verifyEmployeeToken.js";
import { verifyAdminToken } from "../verifyAdminToken.js";

const router = express.Router();

router.put("/edit-employee/:id", verifyAdminToken, editEmployee);
router.delete("/:id", verifyAdminToken, deleteEmployee);
router.get("/all", getEmployees);
router.get("/:id", getEmployee);

export default router;
