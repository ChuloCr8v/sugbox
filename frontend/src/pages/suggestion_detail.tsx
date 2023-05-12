import Comment from "@/components/Comment";
import CommentForm from "@/components/CommentForm";
import React, { useEffect, useState } from "react";
import { FaCommentAlt, FaEdit, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  getSuggestion,
  handleDownvoteSuggestion,
  handleUpvoteSuggestion,
} from "@/apiCalls/api";
import Button from "@/components/Button";
import { showEditSuggestionForm } from "../../redux/suggestionSlice";
import EditSuggestionModal from "@/components/EditSuggestionModal";

const SuggestionPage = (props: {
  userId: any;
  downVotes: [];
  suggester: string;
  user: any;
  id: string;
  status: string;
  firstName: string;
  lastName: string;
  title: string;
  suggestion: string;
  upVotes: string;
  downvotes: string;
}) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: any) => state.user);
  const { suggestion } = useSelector((state: any) => state.suggestions);
  const { suggestions } = useSelector((state: any) => state.suggestions);
  const { editSuggestionForm } = useSelector((state: any) => state.suggestions);
  const { comments } = useSelector((state: any) => state.comments);
  const access_token = currentUser.data.token;

  const id = props.id;

  useEffect(() => {
    getSuggestion({ id, dispatch });
  }, [suggestions]);

  useEffect(() => {
    getComments({ id, access_token, dispatch });
  }, []);

  return (
    <div className="bg-white flex justify-center p-4 pt-28 min-h-screen">
      <div className="max-w-7xl w-full">
        <div className="title_wrapper border-[1.5px] border-blue-200 p-4 rounded">
          <div className="flex items-center justify-between">
            {" "}
            <h3 className="title font-semibold text-xl text-blue-400">
              Suggestion: <span className="span text-black">{props.title}</span>
            </h3>
            {props.userId === currentUser.data.data._id && (
              <div className="">
                <Button
                  text={"Edit"}
                  className={
                    "bg-blue-400 font-semibold text-white duration-300"
                  }
                  handleBtnClick={() =>
                    dispatch(showEditSuggestionForm(suggestion.data))
                  }
                />
              </div>
            )}
          </div>

          <div className=" flex flex-col items-start mt-1">
            <p className=" text-blue-400 capitalize">
              By: <span className="text-black">{props.suggester}</span>
            </p>
            <p className=" text-blue-400 mt-1">
              Status:{" "}
              <span
                className={`${
                  props.status.toLowerCase() === "rejected"
                    ? "text-red-400"
                    : props.status.toLowerCase() === "accepted"
                    ? "text-green-400"
                    : "text-orange-400"
                } capitalize`}
              >
                {props.status}
              </span>
            </p>
          </div>

          <p className="body mt-6  font-semibold text-lg text-blue-400">
            Details:{" "}
            <span className="font-normal text-base text-black">
              {props.suggestion}
            </span>
          </p>
          <div className="votes_wrapper flex items-center gap-2 mt-4 border-[1.5px] border-gray-200 w-fit rounded">
            <div className="upVotes_wrapper flex items-center gap-4 border-r-[1.5px] p-3 py-1 ">
              <FaThumbsUp
                onClick={() => handleUpvoteSuggestion({ id, access_token })}
                className="text-green-400 text-2xl hover:-rotate-12 hover:scale-125 duration-300 cursor-pointer"
              />
              <p className="upVotes_counts font-semibold">
                {props.upVotes.length}
              </p>
            </div>
            <div className="downvotes_wrapper flex items-center gap-4 pr-3 py-1 ">
              <FaThumbsDown
                onClick={() => {
                  handleDownvoteSuggestion({ id, access_token });
                }}
                className="text-red-400 text-2xl hover:rotate-12 hover:scale-125 duration-300 cursor-pointer mt-2"
              />
              <p className="downvotes_counts font-semibold">
                {props.downVotes.length}
              </p>
            </div>
          </div>
        </div>

        <div className="comments_wrapper mt-12">
          <div className="">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold duration-200">
                Comments{" "}
                <span className="text-blue-400">({comments.length})</span>
              </h3>
              <div
                onClick={() => setShowCommentBox(!showCommentBox)}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <FaCommentAlt className=" group-hover:text-blue-400 duration-200 mt-1.5" />
                <p className=" group-hover:text-blue-400 duration-200">
                  Leave a comment
                </p>
              </div>
            </div>
            <CommentForm
              id={id}
              comment={comment}
              setComment={setComment}
              showCommentBox={showCommentBox}
              setShowCommentBox={setShowCommentBox}
            />
          </div>
          {comments.length < 1 ? (
            <div className="w-fit p-4 mt-4 shadow bg-white rounded font-semibold capitalize">
              {" "}
              <p className="">No comments</p>{" "}
            </div>
          ) : (
            <div className="comments_wrapper w-full mt-6 flex flex-col items-center gap-4">
              {comments.map(
                (
                  comment: {
                    replies: any;
                    likes: number;
                    dislikes: number;
                    date: string;
                    comment: string;
                  },
                  index: React.Key
                ) => (
                  <Comment comment={comment} key={index} />
                )
              )}
            </div>
          )}
        </div>
      </div>
      {editSuggestionForm && <EditSuggestionModal />}
    </div>
  );
};

export default SuggestionPage;

export async function getServerSideProps(context: {
  query: {
    userId: any;
    suggester: string;
    firstName: string;
    lastName: string;
    status: string;
    id: number;
    title: string;
    suggestion: string;
    upVotes: number;
    downVotes: number;
    date: Date;
  };
}) {
  return {
    props: {
      id: context.query.id,
      title: context.query.title,
      suggestion: context.query.suggestion,
      suggester: context.query.suggester,
      upVotes: context.query.upVotes,
      downVotes: context.query.downVotes,
      date: context.query.date,
      status: context.query.status,
      userId: context.query.userId,
    },
  };
}
