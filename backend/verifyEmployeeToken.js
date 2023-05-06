import { createError } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyEmployeeToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(createError(401, "You are not authorized!"));
  jwt.verify(token, process.env.JWT_SEC_PHRASE, (err, user) => {
    // console.log(user);
    if (err) return next(createError(403, "Invalid Token!"));
    req.employeeId = user.employeeId;
  });
  next();
};
