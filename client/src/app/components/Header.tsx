import React from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { showAccountModal } from "../../../redux/modals";
import Link from "next/link";
import HeaderProfile from "./HeaderProfile";
import { authData } from "../../../api";
import { logOut } from "../../../redux/auth";

const Header = () => {
  const dispatch = useDispatch();

  const auth = authData({ useSelector });

  return (
    <div className="flex justify-center items-center w-screen shadow fixed top-0 left-0 bg-white z-50">
      <div className="wrapper flex justify-between items-center w-full py-4 px-12">
        <Link href="/" className="logo_wrapper cursor-pointer">
          SUGbox
        </Link>
        {auth ? (
          <HeaderProfile />
        ) : (
          <Button
            className="hover:text-primaryblue"
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
