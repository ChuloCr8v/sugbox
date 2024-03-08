import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authData } from "../../../api";
import { logOut } from "../../../redux/auth";

const HeaderProfile = () => {
  const userDetails = authData({ useSelector });

  const dispatch = useDispatch();
  const router = useRouter();

  const avatar = () => {
    if (userDetails?.isAdmin && !userDetails?.firstName)
      return userDetails?.companyName.slice(0, 1);
    return userDetails?.firstName.slice(0, 1);
    // + " " + userDetails?.lastName.slice(0, 1)
  };

  const username = () => {
    if (userDetails?.isAdmin && !userDetails?.firstName)
      return userDetails?.companyName;
    return userDetails?.firstName + " " + userDetails?.lastName;
  };

  const handleLogOut = () => {
    dispatch(logOut());
    router.push("/portal");
    localStorage.removeItem("auth");
  };

  const items = [
    // {
    //   label: "Profile",
    //   link: "/profile",
    //   icon: <AppstoreAddOutlined />,
    // },
    {
      key: 1,
      label: "Settings",
      icon: <SettingOutlined />,
    },
    {
      key: 2,
      label: (
        <button className="" onClick={handleLogOut}>
          Logout
        </button>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Dropdown menu={{ items }} className="cursor-pointer">
      <a
        onClick={(e) => e.preventDefault()}
        className="flex items-center justify-between gap-2 "
      >
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-primaryblue text-white flex items-center justify-center uppercase text-base font-bold ">
            {avatar()}
          </div>
          <p className="hidden md:flex text-textcolor font-semibold text-base group-hover:text-primaryblue duration-200">
            {username()}
          </p>
        </div>
        <DownOutlined className="ml-20 text-[13px]" />
      </a>
    </Dropdown>
  );
};

export default HeaderProfile;
