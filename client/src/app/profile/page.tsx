"use client";

import { Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { authData, getOneEmployee } from "../../../api";
import { logOut } from "../../../redux/auth";
import { getUserSuggestions } from "../api/suggestions";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import SuggestionCards from "../components/SuggestionCards";
import { statusColor } from "../hooks/useStatusColor";

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

const page = () => {
  const { singleUserSuggestions } = useSelector((state) => state.suggestions);
  const { singleEmployee: employee } = useSelector((state) => state.employees);

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [filter, setFilter] = useState("all");

  const auth = authData({ useSelector }) || {};
  const dispatch = useDispatch();
  const userId = auth?._id;
  const companyId = auth?.companyId;

  useEffect(() => {
    getOneEmployee({ dispatch, id: userId });
  }, [userId]);

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
      <p className="w-full">User Profile</p>
    ) : (
      <p className="w-full">My Profile</p>
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
    //
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

  const profileName =
    employee?.firstName?.slice(0, 1) + employee?.lastName?.slice(0, 1);
  const userName = employee?.firstName + " " + employee?.lastName;
  const roleStyle = () => {
    const role = employee?.role;

    if (role === "staff") {
      return "text-primaryblue bg-blue-50 border border-primaryblue";
    } else if (role === "moderator") {
      return "text-fortrexorange bg-orange-50 border border-fortrexorange";
    }
  };

  const ProfilePicture = () => {
    return (
      <div
        className={twMerge(
          "bg-gray-200 border border-fortrexorange rounded-full h-20 w-20 p-4",
          employee?.role === "staff" && "border-primaryblue"
        )}
      >
        {auth?.imgUrl ? (
          <img src={auth?.imgUrl} />
        ) : (
          <div className="relative flex flex-col items-center">
            <p
              className={twMerge(
                "text-fortrexorange font-bold text-4xl",
                employee?.role === "staff" && "text-primaryblue"
              )}
            >
              {profileName}
            </p>
            <p
              className={twMerge(
                "w-fit uppercase rounded-full px-3 text-[12px] absolute -bottom-7",
                roleStyle()
              )}
            >
              {employee?.role}
            </p>
          </div>
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
    <div className="w-full p-4 pt-24">
      <div className="">
        <PageHeader title={title()} />
        <div className="flex flex-col xl:grid xl:grid-cols-6 gap-4 mt-6">
          <div className="md:bg-white rounded md:shadow md:p-4 grid gap-4 xl:col-span-4 order-2 xl:order-1 mt-6 xl:mt-0">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-primaryblue">
                My suggestions({singleUserSuggestions.length})
              </p>
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
            <div className="md:hidden">
              <SuggestionCards data={filteredSuggestions} />
            </div>
            <div className="hidden md:flex w-full">
              <Table
                dataSource={filteredSuggestions}
                columns={columns}
                className="w-full"
              />
            </div>
          </div>
          <div className="bg-white h-fit w-full rounded-md border border-gray-200 p-4 xl:col-span-2 flex justify-center items-start py-6 order-1 xl:order-2">
            <div className="profile flex flex-col items-center justify-center gap-2">
              {<ProfilePicture />}
              <div className="flex flex-col items-center justify-center mt-2 ">
                <p
                  className={twMerge(
                    "font-bold text-lg text-center text-textcolor"
                  )}
                >
                  {userName}
                </p>
              </div>
              <span className="-mt-3 text-primaryblue">
                {employee?.suggestions?.length} suggestions made
              </span>
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
