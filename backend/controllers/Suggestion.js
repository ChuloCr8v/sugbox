import CompanyModel from "../models/CompanyModel.js";
import SuggestionModel from "../models/SuggestionModel.js";
import EmployeeModel from "../models/EmployeeModel.js";

export const newSuggestion = async (req, res, next) => {
  const companyId = req.params.id;
  const userId = req.employeeId || req.user;
  try {
    const user = await EmployeeModel.findById(req.employeeId);
    const {
      company,
      suggestions,
      upvotes,
      downVotes,
      comments,
      replies,
      ...others
    } = user._doc;
    const newSuggestion = new SuggestionModel({
      userId: userId,
      user: others,
      companyId: companyId,
      ...req.body,
    });
    const addSuggestion = await newSuggestion.save();
    await CompanyModel.findByIdAndUpdate(req.params.id, {
      $push: { suggestions: addSuggestion._id },
    });
    await EmployeeModel.findByIdAndUpdate(req.employeeId, {
      $push: { suggestions: addSuggestion._id },
    });
    res.status(200).json({
      message: "New suggestion added successfully",
      data: newSuggestion,
    });
  } catch (error) {
    next(error);
  }
};

export const getSuggestion = async (req, res, next) => {
  try {
    const suggestion = await SuggestionModel.findById(req.params.id);
    if (!suggestion) return res.status(404).json("Suggestion not found");
    res.status(200).json(suggestion);
  } catch (error) {
    next(error);
  }
};
export const getAllSuggestions = async (req, res, next) => {
  try {
    const suggestions = await SuggestionModel.find();
    res.status(200).json(suggestions);
    console.log(suggestions);
  } catch (error) {
    next(error);
  }
};

export const editSuggestion = async (req, res, next) => {
  try {
    const suggestion = await SuggestionModel.findById({ _id: req.params.id });
    if (suggestion.userId !== req.employeeId)
      return res.status(401).json("You can only edit your suggestion!");
    const timeElasped =
      Math.floor(
        new Date(suggestion.createdAt).getTime() - new Date().getTime()
      ) /
      (1000 * 60 * 60);
    console.log(timeElasped);

    if (timeElasped > 24)
      return res
        .status(401)
        .json(
          "you cant edit a suggestion that has surpassed 24 hours timeframe"
        );
    const updateSuggestion = await SuggestionModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Update successful", data: updateSuggestion });
  } catch (error) {
    next(error);
  }
};

//Approve Suggestion

export const approveSuggestion = async (req, res, next) => {
  console.log(req.user);
  try {
    const suggestion = await SuggestionModel.findById(req.params.id);
    if (suggestion.companyId !== req.user)
      return res.status(401).json("You are not authorized");
    const approve = await SuggestionModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: "approved",
        },
      },
      { new: true }
    );
    res.status(200).json({
      msg: "Suggestion approved successfully",
      approve,
    });
  } catch (error) {
    next(error);
  }
};

//Reject Suggestion

export const rejectSuggestion = async (req, res, next) => {
  console.log(req.user);
  try {
    const suggestion = await SuggestionModel.findById(req.params.id);
    if (suggestion.companyId !== req.user)
      return res.status(401).json("You are not authorized");
    const approve = await SuggestionModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: "rejected",
        },
      },
      { new: true }
    );
    res.status(200).json({
      msg: "Suggestion rejected successfully",
      approve,
    });
  } catch (error) {
    next(error);
  }
};

// export const approveSuggestion = async (req, res, next) => {
//   try {
//     const suggestion = await SuggestionModel.findById(req.params.id);
//     if (suggestion.companyId !== req.user)
//       return res.status(401).json("You are not authorized");
//     const approve = await suggestion.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           isAdmin: true,
//         },
//       },
//       { new: true }
//     );
//     res.status(200).json({
//       msg: "Suggestion approved successfully",
//       approve,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteSuggestion = async (req, res, next) => {
  try {
    const suggestion = await SuggestionModel.findById(req.params.id);
    // if (suggestion.companyId !== req.user)
    //   return res
    //     .status(401)
    //     .json("You can only delete your suggestions for your company");
    await CompanyModel.findByIdAndUpdate(suggestion.companyId, {
      $pull: { suggestions: suggestion._id },
    });
    await EmployeeModel.findByIdAndUpdate(suggestion.userId, {
      $pull: { suggestions: suggestion._id },
    });
    await SuggestionModel.findByIdAndDelete(req.params.id);

    res.status(200).json("Suggestion deleted successfully");
  } catch (error) {
    next(error);
  }
};

//Upvote suggestion
export const upVoteSuggestion = async (req, res, next) => {
  if (!req.employeeId) return res.status(401).json("Login to add your vote");
  try {
    const suggestion = await SuggestionModel.findById(req.params.id);

    if (suggestion.userId === req.employeeId)
      return res.status(403).json("You cant vote your suggestion");
    if (suggestion.upVotes.includes(req.employeeId)) {
      await SuggestionModel.findByIdAndUpdate(req.params.id, {
        $pull: { upVotes: req.employeeId },
      });
      return;
    }
    // return res.status(403).json("You have already upvoted");
    if (suggestion.downVotes.includes(req.employeeId)) {
      await SuggestionModel.findByIdAndUpdate(req.params.id, {
        $pull: {
          downVotes: req.employeeId,
        },
      });
    }
    await SuggestionModel.findByIdAndUpdate(req.params.id, {
      $push: { upVotes: req.employeeId },
    });
    res.status(200).json({
      message: "upvote added successfully",
      data: suggestion,
    });
  } catch (error) {
    next(error);
  }
};

//Downvote suggestion
export const downVoteSuggestion = async (req, res, next) => {
  if (!req.employeeId) return res.status(401).json("Login to add your vote");
  try {
    const suggestion = await SuggestionModel.findById(req.params.id);
    if (suggestion.userId === req.employeeId)
      return res.status(403).json("You cant vote your suggestion");
    if (suggestion.downVotes.includes(req.employeeId))
      if (suggestion.downVotes.includes(req.employeeId)) {
        // return res.status(403).json("You have already downvoted");
        await SuggestionModel.findByIdAndUpdate(req.params.id, {
          $pull: { downVotes: req.employeeId },
        });
        return;
      }
    if (suggestion.upVotes.includes(req.employeeId)) {
      await SuggestionModel.findByIdAndUpdate(req.params.id, {
        $pull: {
          upVotes: req.employeeId,
        },
      });
    }
    await SuggestionModel.findByIdAndUpdate(req.params.id, {
      $push: { downVotes: req.employeeId },
    });
    res.status(200).json({
      message: "downvote added successfully",
      data: suggestion,
    });
  } catch (error) {
    next(error);
  }
};
