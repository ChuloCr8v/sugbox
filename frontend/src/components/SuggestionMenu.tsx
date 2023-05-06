import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestions } from "@/apiCalls/api";
import { startLoading, stopLoading } from "../../redux/loaderSlice";
import { getCurrentSuggestionsView } from "../../redux/suggestionSlice";

const SuggestionMenu = () => {
  const dispatch = useDispatch();

  const { currentSuggestionView } = useSelector(
    (state: { suggestions: { currentSuggestionView: string } }) =>
      state.suggestions
  );

  return (
    <div className="mt-8 flex justify-center sm:justify-start">
      <button
        onClick={() => dispatch(getCurrentSuggestionsView("user"))}
        className={`${
          currentSuggestionView === "user"
            ? "border-blue-400 text-blue-400"
            : "border-gray-300"
        } font-semibold py-2 px-4 sm:px-8 text-center border-b-2 hover:border-blue-400 hover:text-blue-400 duration-200`}
      >
        My Suggestions
      </button>
      <button
        onClick={() => dispatch(getCurrentSuggestionsView("all"))}
        className={`${
          currentSuggestionView === "all"
            ? "border-blue-400 text-blue-400"
            : "border-gray-300"
        } font-semibold py-2 px-4 sm:px-8 text-center border-b-2 hover:border-blue-400 hover:text-blue-400 duration-200`}
      >
        All Suggestions
      </button>
    </div>
  );
};

export default SuggestionMenu;
