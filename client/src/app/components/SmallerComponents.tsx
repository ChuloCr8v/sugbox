"use client";

import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { upVoteSuggestion, downVoteSuggestion } from "../../../api";
import suggestion from "../../../redux/suggestion";
import { labelProps, inputProps, formGroupProps } from "../types";

export const Label = (props: labelProps) => {
  return (
    <label className="text-textcolor text-sm font-semibold">
      {props.title}
    </label>
  );
};

export const Input = (props: inputProps) => {
  return (
    <input
      name={props.name}
      type={props.type}
      className="w-full border-solid border-2 border-bordercolor rounded-md px-3 py-3 hover:border-primaryblue duration-200 focus:outline-primaryblue"
      onChange={props.onchange}
      placeholder={props.placeholder}
      required={props.required}
      value={props.value}
    />
  );
};

export const TextArea = (props: inputProps) => {
  return (
    <textarea
      name={props.name}
      type={props.type}
      className="w-full border-solid border-2 border-bordercolor rounded-md px-3 py-3 hover:border-primaryblue duration-200 focus:outline-primaryblue"
      onChange={props.onchange}
      placeholder={props.placeholder}
      required={props.required}
      value={props.value}
    />
  );
};

export const FormGroup = (props: formGroupProps) => {
  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <Label title={props.label} />
      {props.inputType === "textarea" ? (
        <TextArea
          onchange={props.onInputChange}
          placeholder={props.placeholder}
          name={props.name}
          required={props.required}
          type={""}
          value={props.value}
        />
      ) : (
        <Input
          type={props.inputType}
          onchange={props.onInputChange}
          placeholder={props.placeholder}
          name={props.name}
          required={props.required}
          value={props.value}
        />
      )}
    </div>
  );
};

export const VoteComponent = (props) => {
  return (
    <div className="flex items-center gap-6 mt-4 shadow-md rounded-lg px-3 py-2 w-fit">
      <div className="flex items-center gap-4">
        <FaThumbsUp
          onClick={props.upVotesClick}
          className={twMerge(
            "hover:text-primaryblue hover:scale-110 cursor-pointer duration-200 hover:-rotate-[20deg]",
            props.upVotesConditionalStyle
          )}
        />
        <p className="duration-300">{props.upVotesLength}</p>
      </div>
      <div className="flex items-center gap-4">
        <FaThumbsDown
          onClick={props.downVotesClick}
          className={twMerge(
            "mt-2 hover:text-primaryred hover:scale-110 cursor-pointer duration-200 hover:rotate-[20deg]",
            props.downVoteConditionalStyle
          )}
        />
        <p className="">{props.downVotesLength}</p>
      </div>
    </div>
  );
};
