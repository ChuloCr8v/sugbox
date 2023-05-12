import axios, { AxiosResponse } from "axios";
import {
  getSuggestionSuccess,
  getSuggestionsSuccess,
} from "../../redux/suggestionSlice";
import { Dispatch, AnyAction } from "redux";
import { startLoading, stopLoading } from "../../redux/loaderSlice";
import { getCommentsSuccess } from "../../redux/commentSlice";

interface getSuggestionsProps {
  id: string;
  currentUser?: any;
  currentSuggestionView?: string;
  dispatch(arg0: { payload: any; type: any }): unknown;
}

//getSuggestions

export const getSuggestions = async (props: getSuggestionsProps) => {
  props.dispatch(startLoading());
  try {
    const data = await axios.get("http://localhost:8000/api/suggestion/all");
    const companySuggestions = data.data.filter(
      (data: { companyId: string }) => {
        return data.companyId === props.currentUser.data.data.companyId;
      }
    );
    if (props.currentSuggestionView === "user") {
      const userSuggestions = companySuggestions.filter(
        (data: { user: { _id: string } }) => {
          return data.user._id === props.currentUser.data.data._id;
        }
      );

      props.dispatch(getSuggestionsSuccess(userSuggestions));
    } else {
      props.dispatch(getSuggestionsSuccess(companySuggestions));
    }
  } catch (error) {
    console.log(error);
  }
  props.dispatch(stopLoading());
};

export const getSuggestion = async (props: getSuggestionsProps) => {
  props.dispatch(startLoading());
  try {
    const data = await axios.get(
      `http://localhost:8000/api/suggestion/get-suggestion/${props.id}`
    );
    props.dispatch(getSuggestionSuccess(data));
  } catch (error) {
    console.log(error);
  }
  props.dispatch(stopLoading());
};

//Delete Suggestion

export const deleteSuggestion = async (props) => {
  props.dispatch(startLoading());
  try {
    await axios.delete(`http://localhost:8000/api/suggestion/${props.id}`, {
      headers: {
        Authorization: props.access_token,
      },
    });
  } catch (error) {
    console.log(error);
  }
  props.dispatch(stopLoading());
};

// //getEmployee
// export const getEmployee = async ({ id, setSuggester }) => {
//   try {
//     const data = await axios.get(`http://localhost:8000/api/employee/${id}`);
//     setSuggester(data);
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

//Upvote suggestion

export const handleUpvoteSuggestion = async (props) => {
  const config = {
    headers: {
      Authorization: props.access_token,
    },
  };
  try {
    const upvote = await axios.put(
      `http://localhost:8000/api/suggestion/upvote/${props.id}`,
      null,
      {
        headers: {
          Authorization: props.access_token,
        },
      }
    );
    console.log("upvote successful");
  } catch (error) {
    console.log(error);
  }
};

//Downvote Suggestion

export const handleDownvoteSuggestion = async (props) => {
  const id = props.id;
  const dispatch = props.dispatch;
  const config = {
    headers: {
      Authorization: props.access_token,
    },
  };
  try {
    const upvote = await axios.put(
      `http://localhost:8000/api/suggestion/downvote/${id}`,
      null,
      {
        headers: {
          Authorization: props.access_token,
        },
      }
    );

    console.log("downvote successful");
  } catch (error) {
    console.log(error);
  }
};

//COMMENTS

export const getComments = async (props) => {
  try {
    const comments = await axios.get(
      "http://localhost:8000/api/comment/comments/all",
      {
        headers: {
          Authorization: props.access_token,
        },
      }
    );
    const filteredComments = comments.data.filter((data) => {
      return data.suggestionId === props.id;
    });
    console.log(props.data.suggestionId);
    console.log(props.id);
    props.dispatch(getCommentsSuccess(filteredComments));
  } catch (error) {
    console.log(error);
  }
};

//Upvote comment

export const handleUpvoteComment = async (props) => {
  const config = {
    headers: {
      Authorization: props.access_token,
    },
  };
  try {
    const upvote = await axios.put(
      `http://localhost:8000/api/comment/upvote/${props.id}`,
      null,
      {
        headers: {
          Authorization: props.access_token,
        },
      }
    );
    console.log("upvote successful");
  } catch (error) {
    console.log(error);
  }
};

//Downvote Comment

export const handleDownvoteComment = async (props) => {
  const id = props.id;
  const dispatch = props.dispatch;
  const config = {
    headers: {
      Authorization: props.access_token,
    },
  };
  try {
    const upvote = await axios.put(
      `http://localhost:8000/api/comment/downvote/${id}`,
      null,
      {
        headers: {
          Authorization: props.access_token,
        },
      }
    );

    console.log("downvote successful");
  } catch (error) {
    console.log(error);
  }
};
