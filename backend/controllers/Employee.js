import { createError } from "../error.js";
import CompanyModel from "../models/CompanyModel.js";
import EmployeeModel from "../models/EmployeeModel.js";

export const editEmployee = async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOne({ _id: req.params.id });
    if (!employee) return res.status(401).json("Employee does not exist.");

    if (employee.companyId !== req.user)
      return res.status(401).json("You can only edit your employee details.");
    const updateEmployee = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateEmployee);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOne({ _id: req.params.id });
    if (!employee) return res.status(401).json("Employee does not exist.");
    console.log(employee.companyId.toString(16) + " " + req.user);
    if (employee.companyId.toString(16) !== req.user)
      return res.status(401).json("You can only delete your employee.");
    await EmployeeModel.findByIdAndDelete(req.params.id);
    const test = await CompanyModel.findByIdAndUpdate(req.user, {
      $pull: { employees: { _id: employee._id } },
    });
    res.status(200).json("Employee deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};
4;

export const getEmployee = async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOne({ _id: req.params.id });
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};
