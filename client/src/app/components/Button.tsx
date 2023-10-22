import Link from "next/link";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { LoadingOutlined } from "@ant-design/icons";
interface ButtonProps {
  className: string;
  text: ReactNode;
  onClick?: () => void;
  link?: boolean;
  url?: string;
  disabled: boolean;
}

const Button = (props: ButtonProps) => {
  const { isLoading } = useSelector((state) => state.modals);

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
            "w-[120px] py-2 rounded-full text-white duration-300 text-normal capitalize",
            props.className
          )}
        >
          {isLoading ? <LoadingOutlined /> : props.text}
        </button>
      )}
    </>
  );
};

export default Button;
