import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { stopLoading } from "../../../redux/loaderSlice";
const Loading = () => {
  const dispatch = useDispatch();

  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
      <div
        className="h-screen w-screen fixed left-0 top-0 bg-black bg-opacity-40"
        onClick={() => dispatch(stopLoading())}
      ></div>
      <div className="bg-white relative z-20 p-5 rounded-xl shadow-xl flex justify-center items-center">
        <FaSpinner className="text-2xl animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
