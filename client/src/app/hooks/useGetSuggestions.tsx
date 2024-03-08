"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../../redux/modals";
import {
  getSuggestionSuccess,
  getSuggestionsFailure,
} from "../../../redux/suggestion";
import UseGetAuth from "./useGetAuth";

type suggestionsProps = {
  suggestions: { suggestions: [] };
};

const useGetSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("total");

  const { id } = UseGetAuth();
  const { suggestions: allSuggestions } = useSelector(
    (state: suggestionsProps) => state.suggestions
  );

  const dispatch = useDispatch();

  const approvedSuggestions = suggestions.filter(
    (s: { status: string }) => s.status === "approved"
  );
  const rejectedSuggestions = suggestions.filter(
    (s: { status: string }) => s.status === "rejected"
  );
  const pendingSuggestions = suggestions.filter(
    (s: { status: string }) => s.status === "pending"
  );

  useEffect(() => {
    const getSuggestions = async () => {
      setIsLoading(true);

      try {
        const getSuggestions = await axios.get(
          `http://localhost:8000/api/suggestion/all/${id}`
        );

        const res = getSuggestions.data.filter(
          (suggestion: { companyId: string }) => suggestion.companyId === id
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
      setIsLoading(false);
    };

    getSuggestions();
  }, []);

  useEffect(() => {
    if (filter === "total") {
      setSuggestions(allSuggestions);
    } else {
      setSuggestions(
        allSuggestions.filter((s: { status: string }) => s.status === filter)
      );
    }
  }, [filter]);

  return {
    isLoading,
    suggestions,
    filter,
    setFilter,
    approvedSuggestions,
    rejectedSuggestions,
    pendingSuggestions,
  };
};

export default useGetSuggestions;
