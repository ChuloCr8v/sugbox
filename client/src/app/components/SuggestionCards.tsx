import React from "react";
import SuggestionCard from "./SuggestionCard";

interface Props {
  data: [];
}

const SuggestionCards = (props: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {props.data?.map((s, index) => (
        <SuggestionCard data={s} key={index} />
      ))}
    </div>
  );
};

export default SuggestionCards;
