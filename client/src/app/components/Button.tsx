import Link from "next/link";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { LoadingOutlined } from "@ant-design/icons";
interface ButtonProps {
  className?: string;
  text: ReactNode;
  onClick?: () => void;
  link?: boolean;
  url?: string;
  disabled?: boolean;
  type?: string;
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <>
      {props.link ? (
        <Link
          onClick={props.onClick}
          href={props.url}
          className={twMerge(
            "w-[120px] flex items-center justify-center py-2 rounded-full text-white duration-300 text-normal capitalize",
            props.className
          )}
        >
          {props.text}
        </Link>
      ) : (
        <button
          disabled={props.disabled}
          onClick={props.onClick}
          className={twMerge(
            " py-2 px-4 rounded-full font-bold duration-300 text-sm capitalize",
            props.type === "primary"
              ? "bg-primaryblue hover:bg-blue-400 text-white"
              : props.type === "secondary" &&
                  "bg-gray-200 hover:bg-gray-50 hover:text-gray-500",
            props.className,
            props.disabled &&
              "bg-gray-100 text-gray-300 hover:text-gray-300 hover:bg-gray-100"
          )}
        >
          {props.loading ? <LoadingOutlined /> : props.text}
        </button>
      )}
    </>
  );
};

export default Button;
