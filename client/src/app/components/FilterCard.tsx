import {
  CheckOutlined,
  CloseCircleOutlined,
  DiffOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  data: {
    title: string;
    number: Number;
  };
  setFilter: (arg0: string) => void;
  filter: string;
}

const icon = (title: string) => {
  if (title === "total") {
    return <DiffOutlined />;
  } else if (title === "pending") {
    return <QuestionCircleOutlined />;
  } else if (title === "approved") {
    return <CheckOutlined />;
  } else return <CloseCircleOutlined />;
};
const iconBg = (title: string) => {
  if (title === "pending") {
    return "orange-500";
  } else if (title === "approved") {
    return "green-500";
  } else if (title === "rejected") {
    return "red-500";
  } else return "primaryblue";
};

const FilterCard = (props: Props) => {
  const setBg = () => {
    return props.filter === "pending" &&
      props.data.title.toLowerCase() === "pending"
      ? "bg-orange-500 text-white"
      : props.filter === "approved" &&
        props.data.title.toLowerCase() === "approved"
      ? "bg-green-500 text-white"
      : props.filter === "rejected" &&
        props.data.title.toLowerCase() === "rejected"
      ? "bg-red-500 text-white"
      : "";
  };

  const setIconBg = () => {
    return props.filter === "pending" &&
      props.data.title.toLowerCase() === "pending"
      ? "text-orange-500 bg-white"
      : props.filter === "approved" &&
        props.data.title.toLowerCase() === "approved"
      ? "text-green-500 bg-white"
      : props.filter === "rejected" &&
        props.data.title.toLowerCase() === "rejected"
      ? "text-red-500 bg-white"
      : `bg-${iconBg(props.data.title)}`;
  };

  const hoverBg = (filter: string) => {
    if (filter.toLowerCase() === "pending") {
      return "hover:bg-orange-500 hover:text-white";
    } else if (filter.toLowerCase() === "approved") {
      return "hover:bg-green-500 hover:text-white";
    } else if (filter.toLowerCase() === "rejected") {
      return "hover:bg-red-500 hover:text-white";
    } else return "hover:bg-primaryblue hover:text-white";
  };

  const iconHoverBg = (filter: string) => {
    return filter.toLowerCase() === "pending"
      ? "group-hover:bg-white group-hover:text-orange-500"
      : filter === "approved"
      ? "group-hover:bg-white group-hover:text-green-500"
      : filter === "rejected"
      ? "group-hover:bg-white group-hover:text-red-500"
      : "group-hover:bg-white group-hover:text-primaryblue";
  };

  return (
    <button
      onClick={() => props.setFilter(props.data.title)}
      className={twMerge(
        `group max-w-500 w-full shadow bg-white rounded-md flex items-center justify-between px-4 py-6 duration-200`,
        setBg(),
        hoverBg(props.data.title)
      )}
    >
      <div className="flex flex-col items-start gap-1">
        <p className="font-bold text-xl text-left">{props.data.number}</p>
        <p className="font-semibold text-sm capitalize">{props.data.title}</p>
      </div>
      <div
        className={twMerge(
          "rounded-full h-12 w-12 flex items-center justify-center text-white duration-200 font-semibold text-xl",
          setIconBg(),
          iconHoverBg(props.data.title)
        )}
      >
        {icon(props.data.title)}
      </div>
    </button>
  );
};

export default FilterCard;
