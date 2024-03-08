"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { closeSideBar, openSideBar } from "../../../redux/sideBar";
import UseGetAuth from "../hooks/useGetAuth";
import HeaderProfile from "./HeaderProfile";

const Header = () => {
  const { isSideBarOpen } = useSelector(
    (state: { sideBarOpener: { isSideBarOpen: boolean } }) =>
      state.sideBarOpener
  );
  const dispatch = useDispatch();

  const handleSideBar = () => {
    dispatch(isSideBarOpen ? closeSideBar() : openSideBar());
  };
  const { auth } = UseGetAuth();

  return (
    <div
      className={twMerge(
        "flex justify-center items-center w-screen shadow fixed top-0 left-0 bg-white z-50",
        !auth ? "bg-opacity-20" : " bg-opacity-100"
      )}
    >
      <div className="wrapper flex justify-between items-center w-full py-4 px-4">
        <FaBars
          onClick={handleSideBar}
          className={twMerge(
            "cursor-pointer hover:text-primaryblue duration-200 lg:hidden",
            isSideBarOpen && "text-primaryblue",
            !auth && "hidden"
          )}
        />
        <Link href="/dashboard" className="logo_wrapper cursor-pointer">
          SUGbox
        </Link>
        {auth ? <HeaderProfile /> : <Link href={"/portal"}>Sign In</Link>}{" "}
      </div>
    </div>
  );
};

export default Header;
