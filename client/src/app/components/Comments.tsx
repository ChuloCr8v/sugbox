import React, { useEffect } from "react";
import Comment from "./Comment";
import { getComments, getToken } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { comment } from "postcss";
import Button from "./Button";
import { showNewCommentModal } from "../../../redux/modals";

type Props = {
  suggestionId: string;
};

const Comments = (props: Props) => {
  const token = getToken({ useSelector });
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comments);

  useEffect(() => {
    getComments({ token, suggestionId: props.suggestionId, dispatch });
  }, [props.suggestionId]);

  return (
    <div className="bg-white shadow rounded-md">
      <div className="border-b-[1.5px] pb-2 flex items-center justify-between p-4">
        <p className="font-bold text-gray-600 text-lg flex items-center gap-2 uppercase">
          Comments{" "}
          <span className="bg-primaryblue rounded-full text-[12px] text-white h-6 w-6 flex items-center justify-center">
            {comments.length}
          </span>
        </p>
        <Button
          onClick={() => dispatch(showNewCommentModal())}
          className={
            "capitalize text-primaryblue hover:bg-gray-100 p-1 px-4 font-bold w-fit"
          }
          text={"Add comment"}
          disabled={false}
        />
      </div>
      <div className="px-4">
        {!comments.length ? (
          <span className="my-2 block">No comments yet</span>
        ) : (
          comments.map((comment: { _id?: any; comment: string }) => (
            <Comment data={comment} key={comment._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
