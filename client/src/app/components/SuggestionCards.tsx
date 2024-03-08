import React from "react";
import SuggestionCard from "./SuggestionCard";
import { suggestionProps } from "../types";

interface Props {
  data?: Array<suggestionProps>;
}

const SuggestionCards = (props: Props) => {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
      {props.data?.map((s, index) => (
        <SuggestionCard data={s} key={index} />
      ))}
    </div>
  );
};

export default SuggestionCards;
