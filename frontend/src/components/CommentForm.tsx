import React from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { startLoading, stopLoading } from "../../redux/loaderSlice";

interface Props {
  id: string;
  comment: string;
  setComment: (arg0: string) => void;
  showCommentBox: boolean;
  setShowCommentBox: (arg0: boolean) => void;
}

const CommentForm = (props: Props) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { loading } = useSelector((state: any) => state.loading);
  const access_token = currentUser.data.token;

  const dispatch = useDispatch();

  const handleComment = async () => {
    dispatch(startLoading());

    try {
      await axios.post(
        `http://localhost:8000/api/comment/new-comment/${props.id}`,
        { comment: props.comment },
        {
          headers: {
            Authorization: access_token,
          },
        }
      );
      console.log("comment successfull");
      props.setShowCommentBox(false);
    } catch (error) {
      console.log(error);
    }
    dispatch(stopLoading());
  };
  return (
    <div
      className={`${
        props.showCommentBox ? "h-auto mt-4" : "h-0 mt-0"
      } overflow-hidden duration-200`}
    >
      {props.showCommentBox && (
        <>
          <textarea
            required
            onChange={(e) => {
              props.setComment(e.target.value);
            }}
            name=""
            id=""
            className="border-[1.5px] border-gray-200 rounded w-full p-4 hover:border-blue-200"
          ></textarea>
          <div className="btn_wrapper flex items-center gap-2">
            <Button
              text={"Submit"}
              className={"bg-blue-400 w-fit text-white mt-2 px-8"}
              handleBtnClick={handleComment}
            />
            <Button
              text={"Cancel"}
              className={"bg-red-400 w-fit text-white mt-2 px-8"}
              handleBtnClick={() => props.setShowCommentBox(false)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CommentForm;
