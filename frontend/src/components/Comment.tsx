import React, { Key, useState } from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentAlt,
  FaReply,
} from "react-icons/fa";
import CommentForm from "./CommentForm";
import { handleDownvoteComment, handleUpvoteComment } from "@/apiCalls/api";
import { useSelector } from "react-redux";

interface Props {
  comment: {
    replies: any;
    likes: number;
    dislikes: number;
    date: string;
    comment: string;
    upVotes: [];
    downVotes: [];
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

interface ReplyProps {
  reply: {
    date: string;
    comment: string;
    likes: number;
    dislikes: number;
  };
}

export const Reply = (props: ReplyProps) => {
  return (
    <div className="p-4 border-l-[1.5px] border-b-[1.5px] border-gray-200 rounded-xl w-full">
      <div className="profile flex justify-between items-center">
        <div className="profile_wrapper flex items-center gap-2 font-semibold">
          <div className="profile_picture_wrapper bg-gray-300 flex justify-center items-center border-[1.5px] border-gray-600 h-8 w-8 p-2 rounded-full">
            <p className="text-sm font-semibold ">AN</p>
          </div>
          <p className="text-blue-400">Anonymous</p>
        </div>
        <p className="date text-sm font-semibold">{props.reply.date}</p>
      </div>
      <p className="comment mt-4">{props.reply.comment}</p>
      <div className="votes_wrapper flex items-center gap-2 mt-4 border-[1.5px] border-gray-200 w-fit rounded">
        <div className="upvotes_wrapper flex items-center gap-4 border-r-[1.5px] p-3 py-1 ">
          <FaThumbsUp className="text-green-400 text-base hover:-rotate-12 hover:scale-125 duration-300 cursor-pointer" />
          <p className="upvotes_counts font-semibold"> {props.reply.likes}</p>
        </div>
        <div className="downvotes_wrapper flex items-center gap-4 pr-3 py-1 ">
          <FaThumbsDown className="text-red-400 text-base hover:rotate-12 hover:scale-125 duration-300 cursor-pointer mt-1" />
          <p className="downvotes_counts font-semibold">
            {props.reply.dislikes}
          </p>
        </div>
      </div>
    </div>
  );
};

const Comment = (props: Props) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const { currentUser } = useSelector((state: any) => state.user);

  const access_token = currentUser.data.token;

  return (
    <div className="border-[1.5px] border-blue-200 p-4 rounded-xl w-full">
      <div className="">
        <div className="profile flex justify-between items-center">
          <div className="profile_wrapper flex items-center gap-2 font-semibold">
            <div className="profile_picture_wrapper bg-gray-300 flex justify-center items-center border-[1.5px] border-gray-600 h-8 w-8 p-2 rounded-full">
              <p className="text-sm font-semibold uppercase inline-flex">
                {props.comment.user.firstName[0] +
                  props.comment.user.lastName[0]}
              </p>
            </div>
            <p className=" text-blue-400 ">
              {props.comment.user.firstName + " " + props.comment.user.lastName}
            </p>
          </div>
          <p className="date text-sm font-semibold">{props.comment.date}</p>
        </div>
        <div className=" mt-4 flex justify-between items-center">
          <p className="comment">{props.comment.comment}</p>
          {/* <div
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <FaReply className=" group-hover:text-blue-400 duration-200" />
            <p className=" group-hover:text-blue-400 duration-200">Reply</p>
          </div> */}
        </div>
        <div className="votes_wrapper flex items-center gap-2 mt-4 border-[1.5px] border-gray-200 w-fit rounded">
          <div className="upvotes_wrapper flex items-center gap-4 border-r-[1.5px] p-3 py-1 ">
            <FaThumbsUp
              onClick={() =>
                handleUpvoteComment({ id: props.comment._id, access_token })
              }
              className="text-green-400 text-base hover:-rotate-12 hover:scale-125 duration-300 cursor-pointer"
            />
            <p className="upvotes_counts font-semibold">
              {" "}
              {props.comment.upVotes.length}
            </p>
          </div>
          <div className="downvotes_wrapper flex items-center gap-4 pr-3 py-1 ">
            <FaThumbsDown
              onClick={() =>
                handleDownvoteComment({ id: props.comment._id, access_token })
              }
              className="text-red-400 text-base hover:rotate-12 hover:scale-125 duration-300 cursor-pointer mt-1"
            />
            <p className="downvotes_counts font-semibold">
              {props.comment.downVotes.length}
            </p>
          </div>
        </div>
      </div>
      {/* <CommentForm
        showCommentBox={showReplyBox}
        setShowCommentBox={setShowReplyBox}
      />
      {props.comment.replies && (
        <div className="replies_wrapper pl-8 mt-4">
          {props.comment.replies.map((reply: {}, index: Key) => (
            <Reply reply={reply} />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Comment;
