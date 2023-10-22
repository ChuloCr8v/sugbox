import React, { useEffect } from "react";
import Comment from "./Comment";
import { getComment, getComments, getToken } from "../../../api";
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
  }, []);

  return (
    <div className="bg-white shadow rounded-md">
      <div className="border-b-[1.5px] pb-2 flex items-center justify-between p-4">
        <p className="font-bold capitalize text-lg">Comments</p>
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
        {comments.map((comment: { _id?: any; comment: string }) => (
          <Comment data={comment} key={comment._id} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
