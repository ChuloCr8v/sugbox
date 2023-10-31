import { Skeleton } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="my-8 bg-white rounded shadow flex items-center justify-center h-48 w-full p-4 opacity-50">
      <Skeleton active round title paragraph />
    </div>
  );
};

export default Loading;
