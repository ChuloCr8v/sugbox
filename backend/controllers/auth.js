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
    const getCompany = await CompanyModel.findOne({
      companyEmail: req.body.email,
    });
    if (!getCompany)
      return res.status(404).json(createError(404, "company does not exist"));

    const verifyPassword = await bcrypt.compare(
      req.body.password,
      getCompany.password
    );
    if (!verifyPassword)
      return res.status(401).json(createError(401, "Wrong credential"));

    const token = jwt.sign(
      { companyId: getCompany._id },
      process.env.JWT_SEC_PHRASE
    );

    const { password, suggestions, employees, ...others } = getCompany._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: `${getCompany.companyName} logged in successfully!`,
        others,
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
    console.log(newEmployee);

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

    const { password, company, comments, ...others } = employee._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: `${
          employee.firstName + " " + employee.lastName
        } logged in successfully!`,
        others,
        token: token,
      });
  } catch (error) {
    next(error);
  }
};

// //Moderator Signup
// export const moderatorSignup = async (req, res, next) => {
//   if (req.params.id !== req.user)
//     return res.status(401).json("You are not authorized!");

//   try {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);
//     const company = await CompanyModel.findById(req.params.id);
//     const newModerator = new ModeratorModel({
//       ...req.body,
//       password: hash,
//       companyId: req.params.id,
//       company: company,
//     });

//     await newModerator.save();

//     //Update Company Employee List
//     await CompanyModel.findByIdAndUpdate(req.params.id, {
//       $push: { moderators: newModerator },
//     });

//     res.status(200).json({
//       message: "New Moderator Added Successfully",
//       moderator: newEmployee,
//     });
//   } catch (err) {
//     // next(createError(404, 'problem creating account'))
//     next(err);
//   }
// };

// //Moderator Sign in
// export const moderatorLogin = async (req, res, next) => {
//   try {
//     const moderator = await ModeratorModel.findOne({
//       email: req.body.email,
//     });
//     if (!moderator)
//       return res.status(404).json(createError(404, "moderator does not exist"));

//     const verifyPassword = await bcrypt.compare(
//       req.body.password,
//       moderator.password
//     );
//     if (!verifyPassword)
//       return res.status(401).json(createError(401, "Wrong credential"));

//     const token = jwt.sign(
//       { moderatorId: moderator._id },
//       process.env.JWT_SEC_PHRASE
//     );

//     const { password, company, ...others } = moderator._doc;

//     res
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .json({
//         message: `${
//           moderator.firstName + " " + moderator.lastName
//         } logged in successfully!`,
//         others,
//         token: token,
//       });
//   } catch (error) {
//     next(error);
//   }
// };
