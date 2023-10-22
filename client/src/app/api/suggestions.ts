import axios from "axios";
import { startLoading, stopLoading } from "../../../redux/modals";

export const approveSuggestions = ({ dispatch, token, id }) => {
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
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(stopLoading());
  }
};
