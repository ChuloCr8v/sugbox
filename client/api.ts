"use client";

import { employeeSignupProps } from "@/app/types";
import axios from "axios";
import { NextRouter } from "next/router";
import { AnyAction, Dispatch } from "redux";
import { loginFailure, loginSuccess, startLogin } from "./redux/auth";
import {
  addCommentFailure,
  addCommentStart,
  addCommentSuccessful,
  getCommentsSuccess,
  upvoteComment,
} from "./redux/comments";
import {
  addEmployeeSuccess,
  deleteEmployeeFailure,
  deleteEmployeeStart,
  deleteEmployeeSuccess,
  getEmployeeFailure,
  getEmployeeSuccess,
  getSingleEmployee,
  giveModeratorPrivilege,
  removeModeratorPrivilege,
} from "./redux/employees";
import {
  hideAlert,
  hideNewCommentModal,
  hideNewEmployeeModal,
  hideNewSuggestionModal,
  showAlert,
  startLoading,
  stopLoading,
} from "./redux/modals";
import {
  addSingleUserSuggestion,
  addSuggestionSuccess,
  downVoteSingleSuggestion,
  getSingleSuggestion,
  getSuggestionSuccess,
  getSuggestionsFailure,
  getSuggestionsStart,
  upVoteSingleSuggestion,
} from "./redux/suggestion";

interface Props {
  signUpData: {};
  loginData: {};
  dispatch: Dispatch<AnyAction>;
  router: NextRouter;
  companyName: string;
}

interface authDataState {
  auth: {
    auth: {
      auth: {
        data: {
          others: {}; // Replace with the actual type
        };
      };
    };
  };
}

interface userTypeProps {
  auth: {
    auth: {
      auth: {
        data: {
          others: {}; // Replace with the actual type
        };
      };
    };
  };
}

interface tokenState {
  auth: {
    auth: {
      auth: {
        data: {
          token: string; // Replace with the actual type
        };
      };
    };
  };
}

interface voteProps {
  dispatch: Dispatch<AnyAction>;
  id: string;
  token: string;
  userId: number;
  upVotes?: Array<string>;
  downVotes?: Array<string>;
}

export const authData = ({ useSelector }: any) => {
  const user = useSelector((state: authDataState) => state.auth);
  const userDetails = user?.auth?.others;

  return userDetails;
};

export const getToken = ({ useSelector }: any) => {
  const user = useSelector((state: authDataState) => state.auth);
  const token = user.auth.token;
  return token;
};

export const userType = ({ useSelector }: any) => {
  const userData = useSelector(
    (state: userTypeProps) => state.auth.auth.auth.data.others
  );
  return userData.companyName ? "isCompany" : "isEmployee";
};

export const signUp = async ({
  signUpData,
  dispatch,
  router,
  companyName,
}: Props) => {
  dispatch(startLoading());
  try {
    await axios.post(
      `http://localhost:8000/api/auth/company/new-company`,
      signUpData
    );

    dispatch(
      showAlert({
        alertText: `${companyName} registered successfully`,
        alertType: "success",
      })
    );
    router.push("/login");
    console.log("Registeration Successfull");
  } catch (error) {
    console.log(error);
    dispatch(
      showAlert({
        alertText: `Unable to register ${companyName}! Please try again.`,
        alertType: "error",
      })
    );
  }
  dispatch(stopLoading());
  setTimeout(() => dispatch(hideAlert()), 3000);
};

export const employeeSignUp = async ({
  signUpData,
  dispatch,
  id,
  token,
}: employeeSignupProps) => {
  dispatch(startLogin());
  try {
    const employees = await axios.post(
      `http://localhost:8000/api//auth/employee/new-employee/${id}`,
      signUpData,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    dispatch(addEmployeeSuccess(employees.data.employee));
    dispatch(
      showAlert({
        alertText: `${signUpData.firstName} registered successfully`,
        alertType: "success",
      })
    );
    dispatch(hideNewEmployeeModal());
    console.log("Registeration Successfull");
  } catch (error) {
    console.log(error);
    dispatch(
      showAlert({
        alertText: `Unable to register ${signUpData.firstName}! Please try again.`,
        alertType: "error",
      })
    );
  }
  dispatch(loginFailure());
  setTimeout(() => dispatch(hideAlert()), 3000);
};

export const getEmployees = async ({ dispatch, id }) => {
  dispatch(startLoading());
  console.log(id);
  try {
    const fetch = await axios.get("http://localhost:8000/api/employee/all");
    const employees = fetch.data.filter(
      (d: { companyId: string }) => d.companyId === id
    );
    dispatch(getEmployeeSuccess(employees));
  } catch (error) {
    console.log(error);
  }
  dispatch(stopLoading());
};

export const getOneEmployee = async ({ dispatch, id }) => {
  try {
    const employee = await axios.get(
      `http://localhost:8000/api/employee/${id}`
    );
    console.log(employee.data);
    dispatch(getSingleEmployee(employee.data));
  } catch (error) {
    dispatch(getEmployeeFailure());
    console.log(error);
  }
};

export const makeModerator = async ({
  dispatch,
  id,
  token,
  setShowConfirmModal,
}) => {
  dispatch(startLoading());

  try {
    const newAdmin = await axios.put(
      `http://localhost:8000/api/employee/edit-employee/${id}`,
      {
        role: "moderator",
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    dispatch(giveModeratorPrivilege(id));
    setShowConfirmModal(false);
  } catch (error) {
    console.log(error);
  }
  dispatch(stopLoading());
};

export const removeModerator = async ({
  dispatch,
  id,
  token,
  setShowConfirmModal,
}) => {
  dispatch(startLoading());
  try {
    await axios.put(
      `http://localhost:8000/api/employee/edit-employee/${id}`,
      {
        role: "staff",
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    dispatch(removeModeratorPrivilege(id));
    setShowConfirmModal(false);
  } catch (error) {
    console.log(error);
  }
  dispatch(stopLoading());
};

export const addSuggestion = async ({
  dispatch,
  token,
  id,
  title,
  suggestion,
  isAnonymous,
}) => {
  dispatch(startLoading());
  try {
    const newSuggestion = await axios.post(
      `http://localhost:8000/api/suggestion/new-suggestion/${id}`,
      { title, suggestion, isAnonymous },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const res = newSuggestion.data;
    dispatch(addSuggestionSuccess(res.data));
    dispatch(addSingleUserSuggestion(res.data));
    dispatch(hideNewSuggestionModal());
  } catch (error) {
    dispatch(
      showAlert({
        alertText: `Unable to add new suggestion!`,
        alertType: "error",
      })
    );
    console.log(error);
  }
  dispatch(stopLoading());
};
export const getSuggestions = async ({ dispatch, token, companyId }) => {
  dispatch(getSuggestionsStart());

  try {
    const getSuggestions = await axios.get(
      `http://localhost:8000/api/suggestion/all/${companyId}`
    );

    const res = getSuggestions.data.filter(
      (suggestion: { companyId: string }) => suggestion.companyId === companyId
    );

    dispatch(getSuggestionSuccess(res));
  } catch (error) {
    dispatch(
      showAlert({
        alertText: `Unable to fetch suggestions!`,
        alertType: "error",
      })
    );
    dispatch(getSuggestionsFailure());
    console.log(error);
  }
};

export const getSuggestion = async ({ dispatch, id }) => {
  dispatch(startLoading());
  try {
    const getSuggestion = await axios.get(
      `http://localhost:8000/api/suggestion/get-suggestion/${id}`
    );
    const res = getSuggestion.data;
    dispatch(getSingleSuggestion(res));
  } catch (error) {
    dispatch(
      showAlert({
        alertText: `Unable to fetch suggestion!`,
        alertType: "error",
      })
    );
    console.log(error);
  }
  dispatch(stopLoading());
};

export const upVoteSuggestion = ({
  dispatch,
  id,
  token,
  userId,
  upVotes,
}: voteProps) => {
  try {
    axios.put(
      `http://localhost:8000/api/suggestion/upvote/${id}`,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    dispatch(upVoteSingleSuggestion({ userId, upVotes }));
  } catch (error) {
    console.log(error);
  }
};

export const downVoteSuggestion = ({
  dispatch,
  id,
  token,
  userId,
  downVotes,
}: voteProps) => {
  console.log(token);
  try {
    axios.put(
      `http://localhost:8000/api/suggestion/downvote/${id}`,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    dispatch(downVoteSingleSuggestion({ userId, downVotes }));
  } catch (error) {
    console.log(error);
  }
};

export const commentSuggestion = async ({
  dispatch,
  id,
  comment,
  token,
  setComment,
}) => {
  dispatch(addCommentStart());
  try {
    const newComment = await axios.post(
      `http://localhost:8000/api/comment/new-comment/${id}`,
      {
        comment,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    const res = newComment.data.data;
    dispatch(addCommentSuccessful(res));
    dispatch(hideNewCommentModal());
    setComment("");
    dispatch(
      showAlert({
        alertText: `Comment Added Successfully`,
        alertType: "success",
      })
    );
  } catch (error) {
    dispatch(
      showAlert({
        alertText: `Unable to Add Comment, Try Again!!`,
        alertType: "error",
      })
    );
    console.log(error);
    dispatch(addCommentFailure());
  }
};

export const getComments = async ({ token, suggestionId, dispatch }) => {
  try {
    const res = await axios.get(
      "http://localhost:8000/api/comment/comments/all",
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const data = res.data;
    const comment = data.filter(
      (item: { suggestionId: string }) => item.suggestionId === suggestionId
    );
    dispatch(getCommentsSuccess(comment));
  } catch (error) {
    throw error;
  }
  dispatch(stopLoading());
};

// ///Get SINGLE COMMENT

// export const getComment = async ({ token, suggestionId, dispatch, id }) => {
//   // dispatch(startLoading());
//   try {
//     const res = await axios.get(`http://localhost:8000/api/comment/${id}`, {
//       headers: {
//         Authorization: `${token}`,
//       },
//     });
//     const data = res.data;
//     dispatch(getCommentsSuccess(data));
//   } catch (error) {
//     console.log(error);
//   }
//   // dispatch(stopLoading());
// };

///UPVOTE COMMENT

export const upvoteSingleComment = async ({
  token,
  suggestionId,
  dispatch,
  id,
  userId,
}) => {
  // dispatch(startLoading());

  try {
    const res = await axios.put(
      `http://localhost:8000/api/comment/upvote/${id}`,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    dispatch(upvoteComment({ id: userId, commentId: id }));
  } catch (error) {
    console.log(error);
  }
  // dispatch(stopLoading());
};
