import CommentModel from "../models/CommentModel.js";
import EmployeeModel from "../models/EmployeeModel.js";
import CompanyModel from "../models/CompanyModel.js";
import SuggestionModel from "../models/SuggestionModel.js";

export const addComment = async (req, res, next) => {
  const userId = req.employeeId || req.user;
  const suggestionId = req.params.id;

  const getEmployee = await EmployeeModel.findById(userId);
  const getCompany = await CompanyModel.findById(userId);

  try {
    const user = req.employeeId ? getEmployee : getCompany;
    const {
      comments,
      upvotes,
      password,
      company,
      suggestions,
      downVotes,
      replies,
      ...updatedUser
    } = user._doc;

    const newComment = new CommentModel({
      userId: user.id,
      user: updatedUser,
      suggestionId: suggestionId,
      ...req.body,
    });
    const addComment = await newComment.save();
    await SuggestionModel.findByIdAndUpdate(req.params.id, {
      $push: { comments: newComment._id },
    });
    await EmployeeModel.findByIdAndUpdate(req.employeeId, {
      $push: { comments: newComment._id },
    });
    res.status(200).json({
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) return res.status(404).json("Comment not found");
    if (comment.userId !== req.employeeId)
      return res.status(404).json("You can only edit your comment");

    const updateComment = await CommentModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      message: "comment updated successfully",
      data: updateComment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) return res.status(404).json("Comment not found");
    if (comment.userId !== req.employeeId)
      return res.status(401).json("You can only delete your comment");
    await SuggestionModel.findByIdAndUpdate(comment.suggestionId, {
      $pull: { comments: comment._id },
    });
    await EmployeeModel.findByIdAndUpdate(comment.userId, {
      $pull: { comments: comment._id },
    });
    await CommentModel.findByIdAndDelete(req.params.id);

    res.status(200).json("comment deleted successfully");
  } catch (error) {
    next(error);
  }
};

//Upvote comment
export const upVoteComment = async (req, res, next) => {
  // if (!req.employeeId || !req.user)
  //   return res.status(401).json("Login to add your vote");
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (comment.userId === req.employeeId)
      return res.status(403).json("You cant vote your comment");

    if (comment.upVotes.includes(req.employeeId)) {
      await CommentModel.findByIdAndUpdate(req.params.id, {
        $pull: { upVotes: req.employeeId },
      });
      return;
    }

    if (comment.downVotes.includes(req.employeeId)) {
      await CommentModel.findByIdAndUpdate(req.params.id, {
        $pull: {
          downVotes: req.employeeId,
        },
      });
    }
    await CommentModel.findByIdAndUpdate(req.params.id, {
      $push: { upVotes: req.employeeId || req.user },
    });
    res.status(200).json({
      message: "upvote added successfully",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

//Downvote comment
export const downVoteComment = async (req, res, next) => {
  if (!req.employeeId) return res.status(401).json("Login to add your vote");
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (comment.userId === req.employeeId)
      return res.status(403).json("You cant vote your comment");
    if (comment.downVotes.includes(req.employeeId))
      return res.status(403).json("You have already downvoted");
    if (comment.upVotes.includes(req.employeeId)) {
      await CommentModel.findByIdAndUpdate(req.params.id, {
        $pull: {
          upVotes: req.employeeId,
        },
      });
    }
    await CommentModel.findByIdAndUpdate(req.params.id, {
      $push: { downVotes: req.employeeId },
    });
    res.status(200).json({
      message: "downvote added successfully",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req, res, next) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    if (!comment) return res.status(404).json("Comment not found");
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const getAllComments = async (req, res, next) => {
  try {
    const comments = await CommentModel.find();
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
