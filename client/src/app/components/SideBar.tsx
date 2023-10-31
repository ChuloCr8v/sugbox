import Link from "next/link";
import React from "react";
import {
  AppstoreAddOutlined,
  UsergroupAddOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { twMerge } from "tailwind-merge";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { authData } from "../../../api";

const Sidebar = () => {
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

  const MenuItem = ({ item }) => {
    return (
      <Link
        href={item.link}
        className={twMerge(
          "w-full flex items-center gap-2  px-12 py-2 border-l-0 hover:border-l-4 border-transparent border-solid hover:border-primaryblue hover:text-primaryblue duration-200",
          path.toLowerCase().includes(`${item.link}`) &&
            "text-primaryblue border-primaryblue border-l-4"
        )}
      >
        {item.icon}
        {item.title}
      </Link>
    );
  };

  const adminMenu = navItems.filter((item) => item.role === "admin");
  const staffMenu = navItems.filter((item) => item.role === "staff");
  const allMenu = navItems.filter((item) => item.role === "all");

  return (
    <div
      className={twMerge(
        "bg-white min-h-screen w-[280px] pt-24 shadow-lg ",
        !auth && "hidden"
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
  );
};

export default Sidebar;
