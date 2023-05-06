import Image from "next/image";
import React, { ReactNode } from "react";

interface Props {
  number: number;
  title: string;
  icon: ReactNode;
  handleClick: (arg0: string) => void;
  currentSuggestionsDisplay: string;
}

const SuggestionViewCard = (props: Props) => {
  return (
    <div
      onClick={() => props.handleClick(props.title)}
      className={`${
        props.currentSuggestionsDisplay === props.title
          ? "border-blue-400"
          : "border-transparent"
      } bg-white border-2 flex group justify-between items-center  shadow px-4 py-6 rounded hover:bg-blue-400 duration-300 cursor-pointer`}
    >
      <div className="flex flex-col items-start gap-4">
        <p className="number font-semibold text-3xl text-blue-400 group-hover:text-white">
          {props.number}
        </p>
        <p className="title text-base font-semibold text-blue-400 group-hover:text-white">
          {props.title}
        </p>
      </div>
      <div className=" bg-blue-400 rounded-full h-16 w-16 flex items-center justify-center group-hover:bg-white duration-300">
        {props.icon}
      </div>
    </div>
  );
};

export default SuggestionViewCard;
