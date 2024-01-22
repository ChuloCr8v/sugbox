import React from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { showAccountModal } from "../../../redux/modals";
import Link from "next/link";
import HeaderProfile from "./HeaderProfile";
import { authData } from "../../../api";
import { logOut } from "../../../redux/auth";
import { FaBars } from "react-icons/fa";
import { closeSideBar, openSideBar } from "../../../redux/sideBar";
import { twMerge } from "tailwind-merge";

const Header = () => {
  const { isSideBarOpen } = useSelector((state) => state.sideBarOpener);
  const dispatch = useDispatch();

  console.log(isSideBarOpen);

  const auth = authData({ useSelector });
  const handleSideBar = () => {
    dispatch(isSideBarOpen ? closeSideBar() : openSideBar());
  };

  return (
    <div className="flex justify-center items-center w-screen shadow fixed top-0 left-0 bg-white z-50">
      <div className="wrapper flex justify-between items-center w-full py-4 px-4">
        <FaBars
          onClick={handleSideBar}
          className={twMerge(
            "cursor-pointer hover:text-primaryblue duration-200 lg:hidden",
            isSideBarOpen && "text-primaryblue"
          )}
        />
        <Link href="/dashboard" className="logo_wrapper cursor-pointer">
          SUGbox
        </Link>
        {auth ? (
          <HeaderProfile />
        ) : (
          <Button
            className="hover:text-primaryblue font-normal px-0"
            text={"Sign In"}
            onClick={() => dispatch(showAccountModal())}
            disabled={false}
          />
        )}{" "}
      </div>
    </div>
  );
};

export default Header;
