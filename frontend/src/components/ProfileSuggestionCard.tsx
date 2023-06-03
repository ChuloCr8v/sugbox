import { deleteSuggestion, getSuggestions } from "@/apiCalls/api";
import React, { useEffect, useState } from "react";
import {
  FaComment,
  FaCommentAlt,
  FaCommentMedical,
  FaEdit,
  FaEllipsisH,
  FaThumbsDown,
  FaThumbsUp,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showEditSuggestionForm } from "../../redux/suggestionSlice";
import Link from "next/link";
import Button from "./Button";

interface Props {
  data: {
    isAnonymous: any;
    user: {
      _id: string;
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
    _id: string;
  };
}

interface stateProps {
  user: {
    currentUser: {
      data: {
        data: {
          _id: string;
          isAdmin: boolean;
        };
        token: string;
      };
    };
  };
}

function ProfileSuggestionCard(props: Props) {
  const [showCardMenu, setShowCardMenu] = useState(false);
  const [suggester, setSuggester] = useState("");

  const { currentUser } = useSelector((state: stateProps) => state.user);
  const { currentSuggestionView } = useSelector(
    (state: any) => state.suggestions
  );

  useEffect(() => {
    setSuggester(props.data.user.firstName + " " + props.data.user.lastName);
  }, []);

  const dispatch = useDispatch();
  const isAdmin = currentUser && currentUser.data.data.isAdmin;
  const isCurrentUser =
    currentUser && currentUser.data.data._id === props.data.user._id;

  const CardMenu = () => {
    return (
      <div className=" w-32 bg-white shadow rounded flex flex-col items-start gap-2 p-2">
        {isCurrentUser && (
          <button
            className={
              "cursor-pointer hover:text-blue-600 hover:bg-blue-100 px-2 duration-300 w-full text-left rounded"
            }
            onClick={() => {
              dispatch(showEditSuggestionForm(props.data));
            }}
          >
            Edit
          </button>
        )}
        {isAdmin && (
          <button
            className={
              "cursor-pointer hover:text-green-600 hover:bg-green-100 px-2 duration-300 w-full text-left rounded"
            }
            onClick={() => {
              deleteSuggestion({
                id: props.data._id,
                access_token: currentUser.data.token,
                dispatch,
              });
            }}
          >
            Approve
          </button>
        )}
        {isAdmin && (
          <button
            className={
              "cursor-pointer hover:text-red-600 hover:bg-red-100 px-2 duration-300 w-full text-left rounded"
            }
            onClick={() => {
              deleteSuggestion({
                id: props.data._id,
                access_token: currentUser.data.token,
                dispatch,
              });
            }}
          >
            Reject
          </button>
        )}
        {(isCurrentUser || isAdmin) && (
          <button
            className={
              "cursor-pointer hover:text-red-600 hover:bg-red-100 px-2 duration-300 w-full text-left rounded"
            }
            onClick={() => {
              deleteSuggestion({
                id: props.data._id,
                access_token: currentUser.data.token,
                dispatch,
                currentUser,
                currentSuggestionView,
              });
            }}
          >
            Delete
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      className={`${
        props.data.status.toLowerCase() === "rejected"
          ? "border-red-600 hover:shadow-red-600"
          : props.data.status.toLowerCase() === "approved"
          ? "border-green-400 hover:shadow-green-400"
          : "border-orange-400 hover:shadow-orange-400"
      } relative  border-l-2  shadow rounded bg-white flex items-start justify-between p-4 w-full duration-300`}
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
            <a className="title text-xl hover:text-blue-400 duration-300 font-semibold capitalize">
              {props.data.title}
            </a>
          </Link>
          <p className="">
            <span className="inline text-blue-400 font-semibold">
              Details:{" "}
            </span>
            {props.data.suggestion}
          </p>
          <div className="">
            <p className="suggester capitalize">
              <span className="inline text-blue-400 font-semibold">By: </span>{" "}
              {props.data.isAnonymous
                ? "Anonymous"
                : props.data.user.firstName + " " + props.data.user.lastName}
            </p>
          </div>

          <p className="body text-blue-400 font-semibold">
            Status:{" "}
            <span
              className={`${
                props.data.status.toLowerCase() === "rejected"
                  ? "text-red-400"
                  : props.data.status.toLowerCase() === "accepted"
                  ? "text-green-400"
                  : "text-orange-400"
              } capitalize font-normal`}
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
      {(isAdmin || isCurrentUser) && (
        <div className="icons flex gap-4 items-center">
          <div
            onMouseEnter={() => setShowCardMenu(true)}
            onMouseLeave={() => setShowCardMenu(false)}
            className="p-2 rounded-full group hover:bg-blue-400 duration-300"
          >
            <FaEllipsisH className="group-hover:text-white duration-300" />
            <div
              className={`${
                showCardMenu ? "scale-100 top-8" : "scale-0 top-0"
              } duration-200 absolute z-40 right-8`}
            >
              <CardMenu />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSuggestionCard;
