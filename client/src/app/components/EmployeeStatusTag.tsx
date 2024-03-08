import React from "react";
import { twMerge } from "tailwind-merge";

type Props = { status: boolean };

const EmployeeStatusTag = (props: Props) => {
  return (
    <p
      className={twMerge(
        "bg-green-100 text-center uppercase rounded-full border-green-300 text-green-600 border text-[11px]",
        props.status && "bg-gray-100 border-gray-300 text-gray-600"
      )}
    >
      {props.status ? "Disabled" : "Active"}
    </p>
  );
};

export default EmployeeStatusTag;
