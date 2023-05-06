import express from "express";
import {
  addComment,
  deleteComment,
  downVoteComment,
  editComment,
  getAllComments,
  getComment,
  upVoteComment,
} from "../controllers/Comment.js";
import { verifyEmployeeToken } from "../verifyEmployeeToken.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/new-comment/:id", verifyToken, addComment);
router.put("/edit-comment/:id", verifyEmployeeToken, editComment);
router.delete("/delete-comment/:id", verifyEmployeeToken, deleteComment);
router.put("/upvote/:id", verifyToken, upVoteComment);
router.put("/downvote/:id", verifyEmployeeToken, downVoteComment);
router.get("/:id", verifyEmployeeToken, getComment);
router.get("/comments/all", verifyEmployeeToken, getAllComments);

export default router;
