"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  AppstoreAddOutlined,
  UsergroupAddOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { twMerge } from "tailwind-merge";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { authData } from "../../../api";
import { FaArrowLeft } from "react-icons/fa";
import { closeSideBar } from "../../../redux/sideBar";

const Sidebar = () => {
  const { isSideBarOpen } = useSelector((state: {sideBarOpener: {isSideBarOpen: boolean}}) => state.sideBarOpener);
  const dispatch = useDispatch();
  console.log(isSideBarOpen);
  const auth = authData({ useSelector });
  const path = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: <AppstoreAddOutlined />,
      role: "all",
    },
    {
      title: "Employees",
      link: "/employees",
      icon: <UsergroupAddOutlined />,
      role: "admin",
    },
    {
      title: "Admins",
      link: "/admins",
      icon: <UsergroupAddOutlined />,
      role: "admin",
    },
    {
      title: "My Suggestions",
      link: "/my-suggestions",
      icon: <BulbOutlined />,
      role: "staff",
    },
    // {
    //   title: "Admin Suggestions",
    //   link: "/admin-suggestions",
    //   icon: <BulbOutlined />,
    // },
  ];

  const MenuItem = ({ item }: {item: {title: string; link: string; icon: React.JSX.Element; role: string;}}) => {
    return (
      <Link
        href={item.link}
        onClick={() => dispatch(closeSideBar())}
        className={twMerge(
          "w-full flex items-center gap-2  pr-6 px-4 lg:px-10 py-2 border-l-4 hover:border-l-4 border-transparent border-solid hover:border-primaryblue hover:text-primaryblue duration-200",
          path.toLowerCase().includes(`${item.link}`) &&
            "text-primaryblue border-primaryblue"
        )}
      >
        {item.icon}
        <span>{item.title}</span>
      </Link>
    );
  };

  const adminMenu = navItems.filter((item) => item.role === "admin");
  const staffMenu = navItems.filter((item) => item.role === "staff");
  const allMenu = navItems.filter((item) => item.role === "all");

  return (
    <>
      {/* <div className="absolute top-24 left-0 bg-black text-white text-xl cursor-pointer rounded-r p-2">
        <FaArrowLeft className={twMerge(!isSideBarOpen && "rotate-180")} />
      </div> */}
      <div
        className={twMerge(
          "fixed z-20 top-0 left-0 h-screen w-0 bg-black opacity-30 lg:hidden duration-200",
          isSideBarOpen && "w-screen"
        )}
      ></div>
      <div
        className={twMerge(
          "bg-white min-h-screen fixed lg:relative top-0 left-0 w-0 lg:w-[320px] pt-24 shadow-lg overflow-hidden z-30 duration-200",
          !auth && "hidden",
          isSideBarOpen && "w-[calc(100vw-20%)] "
        )}
      >
        {allMenu.map((item, index) => (
          <MenuItem item={item} key={index} />
        ))}
        {auth?.isAdmin &&
          adminMenu.map((item, index) => <MenuItem item={item} key={index} />)}
        {auth?.role === "staff" &&
          staffMenu.map((item, index) => <MenuItem item={item} key={index} />)}
      </div>
    </>
  );
};

export default Sidebar;
