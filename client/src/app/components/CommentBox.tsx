import TextArea from "antd/es/input/TextArea";
import React, { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { hideNewCommentModal } from "../../../redux/modals";

type Props = {
  handleBtnClick: () => void;
  placeholder: string;
  comment: string;
  onchange: ChangeEventHandler<HTMLTextAreaElement>;
  setComment: Dispatch<SetStateAction<string>>;
};

const CommentBox = (props: Props) => {
  const { newCommentModal } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  return (
    <div
      className={twMerge(
        "flex flex-col w-full items-end gap-4 bg-white shadow rounded-md overflow-hidden duration-150",
        newCommentModal ? "h-fit p-4" : "h-0 overflow-y-hidden"
      )}
    >
      <TextArea
        rows={4}
        placeholder={props.placeholder}
        onChange={props.onchange}
        value={props.comment}
      />
      <div className="flex items-center gap-4">
        <Button
          className={"bg-primaryred hover:bg-red-600 text-white p-1"}
          text={"Cancel"}
          disabled={false}
          onClick={() => {
            props.setComment("");
            dispatch(hideNewCommentModal());
          }}
        />{" "}
        <Button
          className={"bg-primaryblue text-white hover:bg-blue-600 p-1"}
          text={"Submit"}
          disabled={false}
          onClick={props.handleBtnClick}
        />
      </div>
    </div>
  );
};

export default CommentBox;
