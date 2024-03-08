import React from "react";
import { twMerge } from "tailwind-merge";

type Props = { status: string };

const EmployeeStatusTag = (props: Props) => {
  const statusColor = () => {
    return props.status?.toLowerCase() === "pending"
      ? "bg-orange-100 text-orange-500 border-orange-300"
      : props.status?.toLowerCase() === "approved"
      ? "bg-green-100 text-green-500 border-green-300"
      : "bg-red-100 text-red-500 border-red-300";
  };

  return (
    <p
      className={twMerge(
        " text-center uppercase rounded-full border text-[11px]",
        statusColor()
      )}
    >
      {props.status}
    </p>
  );
};

export default EmployeeStatusTag;
