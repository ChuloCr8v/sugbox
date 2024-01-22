import {
  AppstoreAddOutlined,
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { authData } from "../../../api";
import { logOut } from "../../../redux/auth";
import Button from "./Button";

const HeaderProfile = () => {
  const userDetails = authData({ useSelector });

  const [dropDownActive, setDropDownActive] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const avatar = () => {
    if (userDetails.isAdmin && !userDetails.firstName)
      return userDetails.companyName.slice(0, 1);
    return userDetails.firstName.slice(0, 1);
    // + " " + userDetails.lastName.slice(0, 1)
  };

  const username = () => {
    if (userDetails.isAdmin && !userDetails.firstName)
      return userDetails.companyName;
    return userDetails.firstName + " " + userDetails.lastName;
  };

  const handleLogOut = () => {
    console.log("logging out");
    dispatch(logOut());
    router.push("/login");
    localStorage.removeItem("auth");
    //return;
  };

  const dropDownItems = [
    {
      label: "Profile",
      link: "/profile",
      icon: <AppstoreAddOutlined />,
    },
    // {
    //   label: "Settings",
    //   link: "/dashboard",
    //   icon: <SettingOutlined />,
    // },
    {
      label: <button onClick={handleLogOut}>LogOut</button>,
      icon: <LogoutOutlined />,
    },
  ];

  const DropDown = () => {
    return (
      <div
        className={twMerge(
          "flex flex-col items-start bg-white shadow-md rounded-md w-[200px] right-0 absolute top-[50px] overflow-hidden duration-200",
          dropDownActive ? "h-fit" : "h-0"
        )}
      >
        <div
          className={twMerge(
            "fixed -z-10 h-screen w-screen left-0 top-0 bg-black opacity-5",
            !dropDownActive && "hidden"
          )}
        ></div>
        <>
          {dropDownItems.map((item, index) =>
            item.link ? (
              <Link
                key={index}
                href={item.link}
                className="flex items-center gap-2 hover:bg-blue-50 w-full px-4 py-2 duration-200"
              >
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <div
                className="flex items-center gap-2 hover:bg-blue-50 w-full p-4 py-2"
                key={index}
              >
                {" "}
                {item.icon}
                <Button
                  className={"p-0 w-0 font-normal"}
                  text={item.label}
                  disabled={false}
                  onClick={item.onclick}
                />
              </div>
            )
          )}
        </>
      </div>
    );
  };

  return (
    <div
      onClick={() => setDropDownActive(!dropDownActive)}
      className="flex items-center gap-2 md:gap-16 group group-hover:text-primaryblue cursor-pointer relative"
    >
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-primaryblue text-white flex items-center justify-center uppercase text-base font-bold ">
          {avatar()}
        </div>{" "}
        <p className="hidden md:flex text-textcolor font-semibold text-base group-hover:text-primaryblue duration-200">
          {username()}{" "}
          {userDetails?.isAdmin && (
            <span className="bg-blue-100 text-primaryblue border border-primaryblue rounded-full px-4 py-0.5  ml-2 text-[12px]">
              Admin
            </span>
          )}
        </p>
      </div>
      <DownOutlined className="text-text-color text-[12px] group-hover:text-primaryblue duration-200" />
      <DropDown />
    </div>
  );
};

export default HeaderProfile;
