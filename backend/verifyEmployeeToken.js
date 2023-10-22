import { createError } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyEmployeeToken = (req, res, next) => {
  //const tokenw = req.headers.cookie.slice(13);
  const token = req.headers.authorization;
  // console.log(req.headers.cookie.slice(13));
  console.log(req.authorization);
  console.log(token ? token : "empty");
  if (!token) return next(createError(401, "You are not authorized!"));
  jwt.verify(token, process.env.JWT_SEC_PHRASE, (err, user) => {
    // console.log(user);
    if (err) return next(createError(403, "Invalid Token!"));
    req.employeeId = user.employeeId;
  });
  next();
};
