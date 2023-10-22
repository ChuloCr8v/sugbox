import React, { useEffect } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { VoteComponent } from "./SmallerComponents";
import { dateFormatter } from "../utils";
import {
  authData,
  getComment,
  getToken,
  upvoteSingleComment,
} from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

type Props = {
  data: {
    _id: string;
    comment: string;
    user: { firstName: string; lastName: string; isAdmin: boolean };
    createdAt: string;
  };
};

const Comment = (props: Props) => {
  const isAdmin = props.data.user?.isAdmin;
  const user = authData({ useSelector });
  const userId = user._id;
  const id = props.data._id;
  const token = getToken({ useSelector });
  const dispatch = useDispatch();

  useEffect(() => {
    getComment({ id, token });
  }, []);

  console.log(props.data);
  console.log(isAdmin);

  return (
    <div className="border-b-[1.5px] py-4">
      <div className="flex items-start flex-col gap-3">
        <p className="text-[14px] font-bold text-primaryblue">
          {isAdmin
            ? "Admin"
            : `${props.data.user?.firstName} ${props.data.user?.lastName}`}
        </p>
        <div className="flex flex-col items-start gap-3">
          <p className="normal-case">{props.data.comment}</p>{" "}
          <div className="flex gap-2 items-center font-bold text-gray-500">
            <p className="text-[12px]">{dateFormatter(props.data.createdAt)}</p>
            <p className="text-[12px]">
              {dayjs(props.data.createdAt).format("hh.mm.ss")}
            </p>
          </div>
        </div>
      </div>
      {/* 
      <VoteComponent
        upVotesClick={() =>
          upvoteSingleComment({ id, token, userId, dispatch })
        }
        upVotesLength={props.data.upVotes.length}
      /> */}
    </div>
  );
};

export default Comment;
