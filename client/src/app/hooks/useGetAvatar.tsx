"use client";

import useGetAuth from "./useGetAuth";

const useGetAvatar = () => {
  const { others, isAdmin } = useGetAuth();

  console.log(others);
  const avatar = () => {
    if (isAdmin) {
      return (
        <div className="w-[70px] h-[70px] bg-primaryblue text-5xl font-semibold rounded-xl text-white flex flex-col justify-center items-center">
          <span className="leading-[0] -mt-2">
            {others?.companyName?.slice(0, 1)}
          </span>
        </div>
      );
    } else {
      return "";
    }
  };

  return { avatar };
};

export default useGetAvatar;
