import React from "react";

interface Props {
  text: string;
  className: string;
  handleBtnClick: any;
}

const Button = (props: Props) => {
  return (
    <div
      onClick={props.handleBtnClick}
      className={`${props.className} font-semibold px-6 py-2 text-sm rounded-full duration-300 cursor-pointer hover:bg-opacity-70 text-center`}
    >
      {props.text}
    </div>
  );
};

export default Button;
