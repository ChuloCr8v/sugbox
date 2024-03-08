import Link from "next/link";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { suggestionProps } from "../types";

interface Props {
  data: suggestionProps;
}

const SuggestionCard = (props: Props) => {
  const titleColor = (status: string) => {
    if (status === "pending") {
      return "orange-500";
    } else if (status === "approved") {
      return "green-500";
    } else if (status === "rejected") {
      return "red-500";
    } else return "primaryblue";
  };

  return (
    <Link
      href={{
        pathname: "/suggestion",
        query: {
          id: props.data._id,
        },
      }}
      className="bg-white max-w-[700px] grid grid-rows-4 w-full shadow rounded-md border border-gray-50 hover:border-blue-100 duration-200"
    >
      <div className="flex flex-col p-4 border-b border-gray-100 w-full row-span-1">
        <p className="font-semibold text-primaryblue capitalize">
          {props.data.title.slice(0, 30)}
          {props.data.title.length > 30 && "..."}
        </p>
      </div>
      <div className="p-4 row-span-2 flex flex-col justify-between">
        <p className=" text-textcolor text-[14px]">
          {props.data.suggestion.slice(0, 100)}...
        </p>
        <p className="mt-2 text-sm text-primaryblue">
          {props.data.comments.length}{" "}
          <span className="capitalize text-textcolor text-[14px]">
            comment
            {props.data.comments.length > 1 && (
              <span className="lowercase">s</span>
            )}
          </span>
        </p>
      </div>

      <div className="p-4 flex justify-between items-center border-t border-gray-100 row-span-1">
        <p className="capitalize font-semibold text-sm">
          status:
          <span
            className={twMerge(`text-${titleColor(props.data.status)} ml-1`)}
          >
            {props.data.status}
          </span>
        </p>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <FaThumbsUp className="text-green-500" />
            {props.data.upVotes.length}
          </span>
          <span className="flex items-center gap-2">
            <FaThumbsDown className="mt-[5px] text-red-500" />
            {props.data.downVotes.length}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SuggestionCard;
