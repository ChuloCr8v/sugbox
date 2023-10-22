"use client";

import {
  CheckOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import {
  FaCheck,
  FaCheckDouble,
  FaThumbsDown,
  FaThumbsUp,
  FaTimes,
  FaTrash,
  FaUserNinja,
} from "react-icons/fa";
import {
  authData,
  commentSuggestion,
  downVoteSuggestion,
  getSuggestion,
  getToken,
  upVoteSuggestion,
} from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { twMerge } from "tailwind-merge";
import CommentBox from "../components/CommentBox";
import Comments from "../components/Comments";
import { VoteComponent } from "../components/SmallerComponents";
import moment from "moment";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import ModalComponent from "../components/modals/Modal";
import { approveSuggestions } from "../api/suggestions";

interface Props {
  searchParams: {
    id: string;
    upVotes: [];
    suggestion: string;
    title: string;
    suggester: string;
    isAnonymous: string;
    isAdmin: string;
  };
}

const page = (props: Props) => {
  const [comment, setComment] = useState("");
  const [showActionModal, setShowActionModal] = useState(false);
  const [btnTitle, setBtnTitle] = useState("");

  const id = props.searchParams.id;

  const dispatch = useDispatch();

  const user = authData({ useSelector });
  const token = getToken({ useSelector });
  const auth = localStorage.getItem("auth");

  const { singleSuggestion: suggestion } = useSelector(
    (state) => state.suggestions
  );

  useEffect(() => {
    getSuggestion({ dispatch, id: props.searchParams.id });
  }, []);
  //console.log(suggestion.upVotes);
  console.log(props.searchParams.id);
  console.log(suggestion);
  console.log(props.searchParams.id);

  const router = useRouter();

  console.log(auth);

  if (auth === null) {
    router.push("/login");
    return;
  }

  const handleSubmitComment = () => {
    commentSuggestion({ id, comment, dispatch, token, setComment });
  };

  const handleUpVotesClick = () =>
    upVoteSuggestion({
      id: props.searchParams.id,
      dispatch,
      token,
      userId: user._id,
      upVotes: suggestion.upVotes,
    });

  const handleDownVotesClick = () =>
    downVoteSuggestion({
      id: props.searchParams.id,
      dispatch,
      token,
      userId: user._id,
      downVotes: suggestion.downVotes,
    });

  const actionButtonProps = [
    {
      btnTitle: "Approve",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-800",
      icon: <FaCheck />,
      btnFunction: () => approveSuggestions({ dispatch, token }),
    },
    {
      btnTitle: "Reject",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-800",
      icon: <FaTimes />,
    },
    {
      btnTitle: "Delete",
      color: "bg-red-500",
      hoverColor: "hover:bg-red-800",
      icon: <FaTrash />,
    },
  ];

  function statusColor(): import("tailwind-merge").ClassNameValue {
    return suggestion.status.toLowerCase() === "pending"
      ? "bg-orange-100 text-orange-500"
      : suggestion.status.toLowerCase() === "approved"
      ? "bg-green-100 text-green-500"
      : "bg-red-100 text-red-500";
  }

  console.log(statusColor);

  function icon(): import("react").ReactNode {
    if (suggestion.status.toLowerCase() === "pending") {
      return <QuestionCircleOutlined />;
    } else if (suggestion.status.toLowerCase() === "approved") {
      return <CheckOutlined />;
    } else return <CloseCircleOutlined />;
  }

  function suggester(): import("react").ReactNode {
    return suggestion.isAnonymous ? (
      <p className="flex items-center w-fit gap-1">
        <span className="">
          <FaUserNinja />
        </span>
        Anonymous
      </p>
    ) : (
      suggestion.user.firstName + " " + suggestion.user.lastName
    );
  }

  const Approve = () => {
    return (
      <div className="">
        <p className="">
          Approve this suggestion{" "}
          <span className="text-primaryblue font-bold">
            {suggestion.title}?
          </span>
        </p>
      </div>
    );
  };

  const suggestionAction = () => {
    if (btnTitle.toLowerCase() === "approve") {
      return <Approve />;
    } else if (btnTitle.toLowerCase() === "reject") {
      return <div className="">Reject</div>;
    } else return <div className="">Delete</div>;
  };

  const btnAction = () => {
    if (btnTitle.toLowerCase() === "approve") {
      approveSuggestions({ dispatch, token });
    }

    return;
  };

  const Footer = () => {
    return (
      <div className="">
        <Button className={""} text={btnTitle} disabled={false} />
        <Button className={""} text={"Cancel"} disabled={false} />
      </div>
    );
  };

  const handleActionBtnClick = () => {
    if (btnTitle.toLowerCase() === "approve") {
      approveSuggestions({ dispatch, token, id });
    }
  };

  return (
    <div className="pt-24 px-6 grid gap-6">
      {
        //Modal
      }
      <ModalComponent
        onCancel={() => setShowActionModal(false)}
        children={suggestionAction()}
        open={showActionModal}
        footerActionBtnText={btnTitle}
        title=<p>{btnTitle} Suggestion</p>
        onOk={() => handleActionBtnClick()}
      />
      <div className="">
        <p className="text-primaryblue font-bold text-[18px] capitalize flex items-center gap-2">
          {suggestion.title}{" "}
          <span
            className={twMerge(
              "text-[14px] text-black px-2 rounded ml-2 flex items-center gap-1 w-fit",
              statusColor()
            )}
          >
            {icon()}
            {suggestion.status}
          </span>
        </p>
        <p className="mt-2">{suggester()}</p>
        <p className="text-[12px] text-gray-500 font-bold">
          {dayjs(suggestion.createdAt).format("DD.MM.YYYY")}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 grid gap-4">
          <div className=" bg-white shadow rounded-md">
            <div className="p-4">
              <p className="">{suggestion.suggestion}</p>
              <VoteComponent
                upVotesClick={handleUpVotesClick}
                downVotesClick={handleDownVotesClick}
                upVotesLength={suggestion.upVotes.length}
                downVotesLength={suggestion.downVotes.length}
                upVotesConditionalStyle={
                  suggestion.upVotes.includes(user._id) && "text-primaryblue"
                }
                downVoteConditionalStyle={
                  suggestion.downVotes.includes(user._id) && "text-primaryred"
                }
              />
            </div>
            <div className="admin-panel flex items-center justify-start gap-4 p-4 border-t border-bordercolor">
              {actionButtonProps.map((btnProp, index) => (
                <Button
                  className={twMerge(
                    `w-fit text-white rounded-lg px-3 py-1 text-[12px]`,
                    btnProp.color,
                    btnProp.hoverColor
                  )}
                  text={
                    <span className="flex items-center gap-3">
                      {btnProp.btnTitle}
                      <span>{btnProp.icon}</span>
                    </span>
                  }
                  disabled={false}
                  onClick={() => {
                    setShowActionModal(true);
                    setBtnTitle(btnProp.btnTitle);
                  }}
                />
              ))}
            </div>
          </div>
          <CommentBox
            placeholder={"Add comment"}
            onchange={(e) => setComment(e.target.value)}
            handleBtnClick={handleSubmitComment}
            setComment={setComment}
            comment={comment}
          />
          <Comments suggestionId={id} />
        </div>

        <div className="col-span-1 p-4 bg-white shadow rounded-md flex flex-col items-center gap-2">
          {/* <Avatar icon={<UserOutlined />} />
          <p className="">{suggestion.suggester}</p>
          <p className="">
            {suggestion.isAdmin === "true" ? "Admin" : "Staff"}
          </p> */}
          <p className="">Hang On Mate!</p>
        </div>
      </div>
    </div>
  );
};

export default page;

export const getServerSideProps = (context: {
  query: {
    downVotes: [];
    upvotes: [];
    isAdmin: boolean;
    suggestion: string;
    suggester: string;
    isAnonymous: boolean;
    title: string;
    user: {};
  };
}) => {
  return {
    props: {
      title: context.query.title,
      suggester: context.query.suggester,
      suggestion: context.query.suggestion,
      isAnonymous: context.query.isAnonymous,
      isAdmin: context.query.isAdmin,
      upvotes: context.query.upvotes,
      downVotes: context.query.downVotes,
      id: context.query.id,
    },
  };
};
