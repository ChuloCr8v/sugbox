import axios from "axios";
import {
  hideAlert,
  showAlert,
  startLoading,
  stopLoading,
} from "../../../redux/modals";
import {
  approveSingleSuggestion,
  deleteSuggestionSuccess,
  rejectSingleSuggestion,
} from "../../../redux/suggestion";
import { useRouter } from "next/router";

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
    dispatch(deleteSuggestionSuccess({ id }));
    setShowActionModal(false);
    dispatch(
      showAlert({
        alertText: `suggestion deleted successfully`,
        alertType: "success",
      })
    );
    router.push("/dashboard");
  } catch (error) {
    console.log(error);
  }
  dispatch(stopLoading());
  setTimeout(() => dispatch(hideAlert()), 3000);
};
