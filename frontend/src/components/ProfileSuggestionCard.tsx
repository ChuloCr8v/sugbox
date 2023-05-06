import { deleteSuggestion } from "@/apiCalls/api";
import React, { useEffect, useState } from "react";
import {
  FaComment,
  FaCommentAlt,
  FaCommentMedical,
  FaEdit,
  FaThumbsDown,
  FaThumbsUp,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showEditSuggestionForm } from "../../redux/suggestionSlice";
import Link from "next/link";

interface Props {
  data: {
    user: {
      _id:
        | string
        | number
        | boolean
        | readonly string[]
        | readonly number[]
        | readonly boolean[]
        | null
        | undefined;
      firstName: string;
      lastName: string;
    };
    suggester: string;
    upvotes: string;
    downvotes: string;
    createdAt: string;
    status: string;
    title: string;
    suggestion: string;
    upVotes: string;
    downVotes: string;
    comments: string;
    _id: any;
  };
}

interface stateProps {
  user: {
    currentUser: {
      data: {
        token: string;
      };
    };
  };
}

function ProfileSuggestionCard(props: Props) {
  const [editForm, setShowEditForm] = useState(false);
  const [suggester, setSuggester] = useState("");

  const { currentUser } = useSelector((state: stateProps) => state.user);

  useEffect(() => {
    setSuggester(props.data.user.firstName + " " + props.data.user.lastName);
  }, []);

  const dispatch = useDispatch();
  return (
    <div
      className={`${
        props.data.status.toLowerCase() === "rejected"
          ? "border-red-400"
          : props.data.status.toLowerCase() === "accepted"
          ? "border-green-400"
          : "border-orange-400"
      }  border-l-2 shadow rounded bg-white flex items-center justify-between p-4 w-full border-transparent hover:border-blue-400 duration-300`}
    >
      <div className="flex flex-col items-start gap-2">
        <div className="suggestion_body flex flex-col items-start gap-1">
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
                userId: props.data.user._id,
              },
            }}
          >
            <a className="title text-xl text-blue-400 font-semibold">
              {props.data.title}
            </a>
          </Link>
          <p className="body">{props.data.suggestion.slice(0, 80)}.</p>
          <p className="body">
            Status:{" "}
            <span
              className={`${
                props.data.status.toLowerCase() === "rejected"
                  ? "text-red-400"
                  : props.data.status.toLowerCase() === "accepted"
                  ? "text-green-400"
                  : "text-orange-400"
              } capitalize`}
            >
              {props.data.status}
            </span>
          </p>
        </div>
        <div className="votes_wrapper flex items-center gap-4">
          <div className="up_vote_wrapper flex items-center gap-2">
            <FaThumbsUp className="text-base text-green-400" />
            <p className="count text-base font-semibold mt-1">
              {" "}
              {props.data.upVotes.length}
            </p>
          </div>
          <div className="up_vote_wrapper flex items-center gap-2">
            <FaThumbsDown className="text-base text-red-400 mt-1" />
            <p className="count text-base font-semibold">
              {props.data.downVotes.length}
            </p>
          </div>
          <div className="up_vote_wrapper flex items-center gap-2">
            <FaCommentAlt className="text-base text-gray-500 mt-1" />
            <p className="count text-base font-semibold">
              {props.data.comments.length}
            </p>
          </div>
        </div>
      </div>
      <div className="icons flex gap-4 items-center">
        <FaEdit
          onClick={(e) => {
            e.stopPropagation();
            dispatch(showEditSuggestionForm(props.data));
          }}
          className="cursor-pointer text-blue-400 text-xl"
        />
        <FaTrash
          onClick={(e) => {
            e.stopPropagation();
            deleteSuggestion({
              id: props.data._id,
              access_token: currentUser.data.token,
              dispatch,
            });
          }}
          className="cursor-pointer text-red-700 text-md"
        />
      </div>
    </div>
  );
}

export default ProfileSuggestionCard;
