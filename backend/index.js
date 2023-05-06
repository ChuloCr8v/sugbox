import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import company from "./routes/company.js";
import employee from "./routes/employee.js";
import suggestion from "./routes/suggestion.js";
import comment from "./routes/comment.js";
import reply from "./routes/reply.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

const PORT = process.env;

//middlewares
app.use(express.json());
dotenv.config();
app.use(cors());

mongoose.set("strictQuery", false);

const connect = async () => {
  await mongoose
    .connect(`${process.env.MONGOOSE_URL}`)
    .then(() => {
      console.log("Database Connected successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

//Routers
app.use("/api/", auth);
app.use("/api/company", company);
app.use("/api/employee", employee);
app.use("/api/suggestion/", suggestion);
app.use("/api/comment/", comment);
app.use("/api/reply/", reply);

app.listen("8000", () => {
  console.log("app is listening on port 8000");
  connect();
});
