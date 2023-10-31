import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true,
    },
    company: {
      type: {},
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: false,
    },
    img: {
      type: String,
    },
    suggestions: {
      type: [],
    },
    upvotes: {
      type: [],
    },
    downVotes: {
      type: [],
    },
    comments: {
      type: [],
    },
    replies: {
      type: [],
    },
    approvedSuggestions: {
      type: [],
    },
    rejectedSuggestions: {
      type: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("employee", EmployeeSchema);
