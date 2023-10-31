"use client";

import React, { ReactNode, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { authData, getOneEmployee } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { Select, Table } from "antd";
import { getUserSuggestions } from "../api/suggestions";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { icon, statusColor } from "../suggestion/page";
import { twMerge } from "tailwind-merge";
import Button from "../components/Button";
import { logOut } from "../../../redux/auth";
import { useRouter } from "next/navigation";

type Props = {};

interface DataType {
  comments: [];
  _id: string;
  downVotes: [];
  upVotes: [];
  status: ReactNode;
  suggestion: string;
  title: string;
  firstName: string;
  lastName: string;
}

const page = (props: Props) => {
  const { singleUserSuggestions } = useSelector((state) => state.suggestions);
  const { singleEmployee: employee } = useSelector((state) => state.employees);

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [filter, setFilter] = useState("all");

  const auth = authData({ useSelector });
  const dispatch = useDispatch();
  const userId = auth._id;
  const companyId = auth.companyId;

  useEffect(() => {
    getOneEmployee({ dispatch, id: employee._id });
  }, []);

  useEffect(() => {
    getUserSuggestions({ dispatch, userId, companyId });
  }, [singleUserSuggestions]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredSuggestions(singleUserSuggestions);
    } else {
      setFilteredSuggestions(
        singleUserSuggestions.filter((s) => s.status === filter)
      );
    }
  }, [filter, singleUserSuggestions]);

  const title = () => {
    return auth.isAdmin ? (
      <p className="">User Profile</p>
    ) : (
      <p className="">My Profile</p>
    );
  };
  // console.log(singleUserSuggestions);

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "email",
      render: (_: ReactNode, record) => (
        <Link
          href={{
            pathname: "/suggestion",
            query: {
              id: record._id,
            },
          }}
          className="font-bold"
        >
          {record.title.slice(0, 20)}
          {record.title.length > 20 && "..."}
        </Link>
      ),
    },
    // {
    //   title: "Suggestion",
    //   align: "left",
    //   dataIndex: "suggestion",
    //   render: (_: ReactNode, record) => (
    //     <p>
    //       {" "}
    //       {record.suggestion.slice(0, 50)}
    //       {record.title.length > 50 && "..."}
    //     </p>
    //   ),
    // },
    {
      title: "Status",
      dataIndex: "status",
      align: "left",
      render: (_: ReactNode, record) => (
        <span
          className={twMerge(
            "text-[14px] text-black capitalize",
            statusColor(record),
            "bg-transparent "
          )}
        >
          {record.status}
        </span>
      ),
    },
    {
      title: "Upvotes",
      dataIndex: "upvotes",
      align: "center",
      render: (_: ReactNode, record) => <p> {record.upVotes.length} </p>,
    },
    {
      title: "Downvotes",
      dataIndex: "downvotes",
      align: "center",
      render: (_: ReactNode, record) => <p> {record.downVotes.length} </p>,
    },
    {
      title: "Comments",
      dataIndex: "comments",
      align: "center",
      render: (_: ReactNode, record) => <p> {record.comments.length} </p>,
    },
    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   align: "center",
    //   render: (_: ReactNode, record: { isAdmin: boolean; _id: string }) => (
    //     <DropDown data={record} />
    //   ),
    // },
  ];

  const handleChange = (value: string) => {
    setFilter(value);
  };

  const profileName = auth.firstName.slice(0, 1) + auth?.lastName.slice(0, 1);
  const userName = auth?.firstName + " " + auth?.lastName;
  const roleStyle = () => {
    const role = auth.role;

    if (role === "staff") {
      return "text-primaryblue bg-blue-50 border border-primaryblue";
    } else if (role === "moderator") {
      return "text-fortrexorange bg-orange-50 border border-fortrexorange";
    }
  };

  const ProfilePicture = () => {
    return (
      <div className="bg-gray-200 rounded-full h-fit w-fit p-4">
        {auth?.imgUrl ? (
          <img src={auth?.imgUrl} />
        ) : (
          <p className="text-textcolor font-bold text-2xl">{profileName}</p>
        )}
      </div>
    );
  };

  const router = useRouter();

  const handleLogOut = () => {
    console.log("logging out");
    router.push("/login");
    dispatch(logOut());
    localStorage.removeItem("auth");
    return;
  };

  return (
    <div className=" p-10 pt-24">
      <div className="">
        <PageHeader title={title()} />
        <div className="grid grid-cols-6 gap-4 mt-6">
          <div className="bg-white rounded shadow p-4  grid gap-4 col-span-4">
            <div className="flex items-center justify-between">
              <p className="">My suggestions({singleUserSuggestions.length})</p>
              <Select
                defaultValue="All"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: "all", label: "All" },
                  { value: "pending", label: "Pending" },
                  { value: "approved", label: "Approved" },
                  { value: "rejected", label: "Rejected" },
                ]}
              />
            </div>

            <Table dataSource={filteredSuggestions} columns={columns} />
          </div>
          <div className="bg-white rounded shadow p-4 col-span-2 flex justify-center items-center">
            <div className="profile flex flex-col gap-4 items-center justify-center">
              {<ProfilePicture />}{" "}
              <div className="flex flex-col items-center justify-center gap-2 -mt-2">
                <p className="font-bold text-lg text-center">{userName}</p>{" "}
                <p
                  className={twMerge(
                    "w-fit uppercase rounded-full px-3 text-[12px]",
                    roleStyle()
                  )}
                >
                  {employee.role}
                </p>
              </div>
              {auth?.isAdmin && (
                <div className="flex items-center justify-center gap-2">
                  <Button text={"Edit"} type="primary" />
                  <Button
                    text={"Delete"}
                    type="secondary"
                    className={twMerge("", auth?.isAdmin ? "flex" : "hidden")}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
