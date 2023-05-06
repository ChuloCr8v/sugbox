import bcrypt from "bcrypt";
import CompanyModel from "../models/CompanyModel.js";
import EmployeeModel from "../models/EmployeeModel.js";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

//Company Signup
export const companySignup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newCompany = new CompanyModel({ ...req.body, password: hash });
    await newCompany.save();

    res.status(200).json({
      message: "New Company Added Successfully",
      company: newCompany,
    });
  } catch (err) {
    // next(createError(404, 'problem creating account'))
    next(err);
  }
};

//Company Sign in
export const companyLogin = async (req, res, next) => {
  try {
    const company = await CompanyModel.findOne({
      companyEmail: req.body.email,
    });
    if (!company)
      return res.status(404).json(createError(404, "company does not exist"));

    const verifyPassword = await bcrypt.compare(
      req.body.password,
      company.password
    );
    if (!verifyPassword)
      return res.status(401).json(createError(401, "Wrong credential"));

    const token = jwt.sign(
      { companyId: company._id },
      process.env.JWT_SEC_PHRASE
    );

    const { password, ...others } = company._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: `${company.companyName} logged in successfully!`,
        data: others,
        token: token,
      });
  } catch (error) {
    next(error);
  }
};

//Employee Signup
export const employeeSignup = async (req, res, next) => {
  if (req.params.id !== req.user)
    return res.status(401).json("You are not authorized!");

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const company = await CompanyModel.findById(req.params.id);
    const newEmployee = new EmployeeModel({
      ...req.body,
      password: hash,
      companyId: req.params.id,
      company: company,
    });

    //Update Company Employee List
    await CompanyModel.findByIdAndUpdate(req.params.id, {
      $push: { employees: newEmployee },
    });

    await newEmployee.save();

    res.status(200).json({
      message: "New Employee Added Successfully",
      employee: newEmployee,
    });
  } catch (err) {
    // next(createError(404, 'problem creating account'))
    next(err);
  }
};

//Employee Sign in
export const employeeLogin = async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOne({
      email: req.body.email,
    });
    if (!employee)
      return res.status(404).json(createError(404, "employee does not exist"));

    const verifyPassword = await bcrypt.compare(
      req.body.password,
      employee.password
    );
    if (!verifyPassword)
      return res.status(401).json(createError(401, "Wrong credential"));

    const token = jwt.sign(
      { employeeId: employee._id },
      process.env.JWT_SEC_PHRASE
    );

    console.log(token);

    const { password, ...others } = employee._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: `${employee.username} logged in successfully!`,
        data: others,
        token: token,
      });
  } catch (error) {
    next(error);
  }
};
