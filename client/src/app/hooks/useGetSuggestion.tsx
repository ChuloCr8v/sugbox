import React, { ReactNode, useEffect, useState } from "react";
import { showAlert } from "../../../redux/modals";
import { useDispatch, useSelector } from "react-redux";
import { getSingleSuggestion } from "../../../redux/suggestion";
import axios from "axios";

type suggestionProps = {
  upVotes: string[] | undefined;
  downVotes: string[] | undefined;
  isAnonymous: any;
  user: any;
  title: ReactNode;
  suggestion: any;
  status: ReactNode;
  createdAt: string;
  userId: any;
};

const useGetSuggestion = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { singleSuggestion } = useSelector((state) => state.suggestions);
  const [suggestion, setSuggestion] = useState({});

  const dispatch = useDispatch();

  const getSuggestion = async (id: string) => {
    console.log("ayam running");
    setIsLoading(true);
    try {
      const getSuggestion = await axios.get(
        `http://localhost:8000/api/suggestion/get-suggestion/${id}`
      );
      const res = await getSuggestion.data;
      dispatch(getSingleSuggestion(res));
      setSuggestion(singleSuggestion);
      console.log(res);
      console.log(suggestion);
    } catch (error) {
      dispatch(
        showAlert({
          alertText: `Unable to fetch suggestion!`,
          alertType: "error",
        })
      );
      console.log(error);
    }
    setIsLoading(false);
  };

  return { isLoading, getSuggestion, suggestion, setSuggestion };
};

export default useGetSuggestion;
