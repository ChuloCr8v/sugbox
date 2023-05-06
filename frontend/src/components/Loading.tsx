import React from "react";
import { FaSpinner } from "react-icons/fa";

const loading = () => {
  return (
    <div className="fixed">
      <div className="h-screen w-screen fixed left-0 top-0 bg-black bg-opacity-40"></div>
      <div className="bg-white relative z-20 p-5 rounded-xl shadow-xl flex justify-center items-center">
        <FaSpinner className="text-2xl animate-spin" />
      </div>
    </div>
  );
};

export default loading;
