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
  return (
    <button
      onClick={() => props.setFilter(props.data.title)}
      className="group max-w-500 w-full shadow bg-white rounded-md flex items-center justify-between px-4 py-6 hover:bg-primaryblue duration-200"
    >
      <div className="flex flex-col items-start gap-1">
        <p className="font-bold text-xl text-left group-hover:text-white duration-200">
          {props.data.number}
        </p>
        <p className="font-semibold text-sm capitalize group-hover:text-white duration-200">
          {props.data.title}
        </p>
      </div>
      <div
        className={twMerge(
          "rounded-full h-12 w-12 flex items-center justify-center text-white group-hover:text-primaryblue group-hover:bg-white duration-200 font-semibold text-xl",
          `bg-${iconBg(props.data.title)} bg-opacity-70`
        )}
      >
        {icon(props.data.title)}
      </div>
    </button>
  );
};

export default FilterCard;
