import React from "react";

interface Props {
  className: string;
  msg: string;
  modal: boolean;
}

const Modal = (props: Props) => {
  return (
    <div
      className={`bg-green-600 py-2 px-6 text-white bg-opacity-50 rounded-full fixed ${
        props.modal ? "top-20" : " top-48"
      } z-50 duration-200`}
    >
      <p className={`${props.className}`}>{props.msg}</p>
    </div>
  );
};

export default Modal;
