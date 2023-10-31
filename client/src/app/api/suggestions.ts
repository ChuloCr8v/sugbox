import axios from "axios";
import {
  hideAlert,
  hideEditSuggestionModal,
  showAlert,
  startLoading,
  stopLoading,
} from "../../../redux/modals";
import {
  approveSingleSuggestion,
  deleteSuggestionSuccess,
  editSingleSuggestion,
  getSingleUserSuggestions,
  rejectSingleSuggestion,
} from "../../../redux/suggestion";
import { useRouter } from "next/router";
import {
  stopSuggestionsLoading,
  suggestionLoading,
  suggestionsLoading,
} from "../../../redux/loading";

export const approveSuggestions = ({
  dispatch,
  token,
  id,
  setShowActionModal,
}) => {
  dispatch(startLoading());
  try {
    axios.put(
      `http://localhost:8000/api/suggestion/approve-suggestion/${id}`,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log("Suggestion Approved Successfully");
    dispatch(approveSingleSuggestion({ id }));
    setShowActionModal(false);
  } catch (error) {
    console.log(error);
  }
  dispatch(stopLoading());
};

export const rejectSuggestion = ({
  dispatch,
  token,
  id,
  setShowActionModal,
}) => {
  dispatch(startLoading());
  try {
    axios.put(
      `http://localhost:8000/api/suggestion/reject-suggestion/${id}`,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log("Suggestion rejected Successfully");
    dispatch(rejectSingleSuggestion(id));
    setShowActionModal(false);
  } catch (error) {
    console.log(error);
  }
  dispatch(stopLoading());
};

export const editSuggestion = async ({
  dispatch,
  title,
  suggestion,
  isAnonymous,
  token,
  id,
}) => {
  dispatch(suggestionLoading(true));

  try {
    await axios.put(
      `http://localhost:8000/api/suggestion/edit-suggestion/${id}`,
      {
        title,
        suggestion,
        isAnonymous,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    dispatch(editSingleSuggestion({ title, suggestion, isAnonymous }));
    dispatch(
      showAlert({
        alertText: `Suggestion updated succesfully!`,
        alertType: "success",
      })
    );
    console.log("suggestion edited successfully");
    dispatch(hideEditSuggestionModal());
  } catch (error) {
    console.log(error);
    dispatch(
      showAlert({
        alertText: `unable to update suggestion. Please check your connection and try again!`,
        alertType: "error",
      })
    );
  }
  dispatch(suggestionLoading(false));
};

export const deleteSuggestion = async ({
  dispatch,
  id,
  token,
  router,
  setShowActionModal,
}) => {
  dispatch(startLoading());

  try {
    await axios.delete(`http://localhost:8000/api/suggestion/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    console.log("suggestion deleted successfully");
    setShowActionModal(false);
    dispatch(deleteSuggestionSuccess(id));
    dispatch(
      showAlert({
        alertText: `suggestion deleted successfully`,
        alertType: "success",
      })
    );
    window.history.back();
  } catch (error) {
    console.log(error);
  }
  dispatch(stopLoading());
  setTimeout(() => dispatch(hideAlert()), 3000);
};

export const getUserSuggestions = async ({ dispatch, userId, companyId }) => {
  dispatch(suggestionsLoading());

  try {
    const getSuggestions = await axios.get(
      `http://localhost:8000/api/suggestion/all/${companyId}`
    );

    const res = getSuggestions.data.filter(
      (suggestion: { userId: string }) => suggestion.userId === userId
    );

    dispatch(getSingleUserSuggestions(res));
  } catch (error) {
    dispatch(
      showAlert({
        alertText: `Unable to fetch suggestions!`,
        alertType: "error",
      })
    );
    console.log(error);
  }
  dispatch(stopSuggestionsLoading());
};
