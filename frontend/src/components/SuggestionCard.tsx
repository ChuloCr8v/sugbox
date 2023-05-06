import { getEmployee } from "@/apiCalls/api";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../redux/loaderSlice";

interface Props {
  data: {
    upVotes: any;
    downVotes: any;
    user: any;
    isAnonymous: boolean;
    _id: string;
    userId: any;
    downvotes: any;
    createdAt: Date;
    upvotes: any;
    status: string;
    title: string;
    suggestion: string;
    date: any;
  };
}

const SuggestionCard = (props: Props) => {
  const [suggester, setSuggester] = useState("");

  const date = new Date(props.data.createdAt);
  const dispatch = useDispatch();

  useEffect(() => {
    setSuggester(props.data.user.firstName + " " + props.data.user.lastName);
  }, []);

  return (
    <Link
      legacyBehavior
      href={{
        pathname: "/suggestion_detail",
        query: {
          id: props.data._id,
          title: props.data.title,
          suggestion: props.data.suggestion,
          suggester: suggester,
          upVotes: props.data.upvotes,
          downVotes: props.data.downvotes,
          date: props.data.createdAt,
          status: props.data.status,
          user: props.data.user,
        },
      }}
    >
      <a className="w-full bg-white rounded shadow px-4 py-6  group border-[1.5px] border-transparent hover:border-blue-400 duration-300 cursor-pointer">
        <div className="top flex justify-between items-start xl:items-center gap-4">
          <p className="suggestion text-lg md:text-xl font-semibold capitalize text-blue-400">
            {props.data.title}
          </p>
          <p className="suggestion text-sm font-semibold capitalize text-right">
            {props.data.isAnonymous ? "Anonymous" : suggester}
          </p>
        </div>
        <div className="bottom flex justify-between items-center mt-4">
          <div className="votes_wrapper flex items-center gap-4">
            <div className="up_vote_wrapper flex items-center gap-2">
              <FaThumbsUp className="text-xl text-green-400" />
              <p className="count text-base font-semibold mt-1">
                {" "}
                {props.data.upVotes.length}
              </p>
            </div>
            <div className="up_vote_wrapper flex items-center gap-2">
              <FaThumbsDown className="text-xl text-red-400 mt-2" />
              <p className="count text-base font-semibold">
                {props.data.downVotes.length}
              </p>
            </div>
          </div>
          <p className="date font-semibold text-sm flex items-center gap-2">
            {new Date(props.data.createdAt).toDateString()}
            <span className="">
              {" "}
              {`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}{" "}
            </span>
          </p>
        </div>
      </a>
    </Link>
  );
};

export default SuggestionCard;
