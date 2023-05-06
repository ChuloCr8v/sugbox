import express from "express";
import {
  companyLogin,
  companySignup,
  employeeLogin,
  employeeSignup,
} from "../controllers/auth.js";
import { verifyAdminToken } from "../verifyAdminToken.js";

const router = express.Router();

router.post("/auth/company/new-company", companySignup);
router.post(
  "/auth/employee/new-employee/:id",
  verifyAdminToken,
  employeeSignup
);
router.put("/auth/company/login-company", companyLogin);
router.put("/auth/employee/login-employee", employeeLogin);

export default router;
