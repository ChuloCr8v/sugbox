"use client";

import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Dropdown, MenuProps, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import DisableEmployeeModal from "../components/modals/DisableEmployeeModal";
import useGetEmployees from "../hooks/useGetEmployees";

interface DataType {
  email: string;
  _id: string;
  key: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
  isAdmin: boolean;
  suggestions: { length: number };
}

const Employee = () => {
  const [employeeData, setEmployeeData] = useState({});
  const { isLoading, employees } = useGetEmployees();

  console.log(employees);

  const DropDown = ({
    data,
  }: {
    data: {
      firstName: string;
      lastName: string;
      _id: string;
      isAdmin: boolean;
      role: string;
    };
  }) => {
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <div className="flex flex-col items-start ">
            <Button
              className={twMerge("w-full h-fit p-0")}
              text={
                <div className="py-2 w-full flex items-center gap-4 font-normal">
                  <DeleteOutlined />
                  <span className="">Disable Employee</span>
                </div>
              }
              disabled={false}
              onClick={() => setEmployeeData(data)}
            />
          </div>
        ),
      },
      {
        key: "3",
        label: (
          <Button
            className={twMerge("w-full h-fit p-0")}
            text={
              <div className="py-2 w-full flex items-center gap-4 font-normal">
                <EditOutlined />
                <span className="">Edit Employee</span>
              </div>
            }
            disabled={false}
          />
        ),
      },
      // {
      //   key: "4",
      //   label: (
      //     <Button
      //       className={twMerge("h-fit px-0 py-0 p-0 w-fit")}
      //       text={
      //         <div className="px-4 py-2 w-full flex items-center gap-4 hover:bg-blue-50">
      //           <UserSwitchOutlined />
      //           <span className="">
      //             {data?.role?.toLowerCase() === "moderator"
      //               ? "remove moderator"
      //               : "Make Moderator"}
      //           </span>
      //         </div>
      //       }
      //       disabled={false}
      //       onClick={() => handleMakeModerator(data)}
      //     />
      //   ),
      // },
    ];

    return (
      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <span>
          <EllipsisOutlined className="text-textcolor rotate-90 hover:bg-gray-100 p-1 rounded hover:shadow duration-200" />
        </span>
      </Dropdown>
    );
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: ReactNode, record) => (
        <Link
          href={{
            pathname: "/profile",
            query: {
              id: record._id,
            },
          }}
          className="capitalize font-bold text-primaryblue"
        >
          {record.firstName + " " + record.lastName}
        </Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_: ReactNode, record) => <p className="">{record.email}</p>,
    },
    {
      title: "Role",
      align: "center",
      dataIndex: "role",
      render: (_: ReactNode, record: { role: string }) => (
        <p>
          {" "}
          {record.role.toLowerCase() === "moderator" ? "Moderator" : "Staff"}
        </p>
      ),
    },
    {
      title: "Suggestions",
      dataIndex: "suggestion",
      align: "center",
      render: (_: ReactNode, record: { suggestions: [] }) => (
        <p> {record.suggestions.length} </p>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      align: "center",
      render: (_: ReactNode, record: { isAdmin: boolean; _id: string }) => (
        <DropDown data={record} />
      ),
    },
  ];

  const EditEmployeeModal = (data) => {
    const [modalOpen, setModalOpen] = useState(true);

    return (
      <Modal
        title="Basic Modal"
        open={false}
        onCancel={() => setModalOpen(false)}
      >
        <p className="">Editing {data.firstName + " " + data.lastName}</p>
      </Modal>
    );
  };

  const EmployeeCard = (data: {
    data: {
      firstName: string;
      lastName: string;
      role: string;
      email: string;
      suggestions: Array<Object>;
    };
  }) => {
    return (
      <div className="w-full bg-white rounded p-4 mb-4 shadow relative flex items-start gap-4 justify-between">
        <div className="flex items-center gap-6">
          <div
            className={twMerge(
              "avatar bg-primaryred rounded-full p-2 w-20 h-20 flex items-center justify-center relative",
              data.data.role === "moderator" && "bg-primaryblue"
            )}
          >
            <p className=" text-white font-semibold capitalize text-4xl ">
              {data.data.firstName.slice(0, 1) + data.data.lastName.slice(0, 1)}
            </p>
          </div>
          <div className="">
            <p className="font-semibold">
              {data.data.firstName + " " + data.data.lastName}
            </p>
            <p className="">{data.data.email}</p>
            <span
              className={twMerge(
                "role rounded-full text-sm font-semibold text-primaryred capitalize",
                data.data.role.toLowerCase() === "moderator" &&
                  "text-primaryblue "
              )}
            >
              {data.data.role === "false" ? "Staff" : data.data.role}
            </span>
          </div>
        </div>
        <div className="">
          {" "}
          <DropDown data={data.data} />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full p-4 pt-24">
      <PageHeader title={"Employees"} />
      <div className="mt-6">
        {/* {isLoading ? (
          <div className="h-screen w-full flex items-center justify-center gap-2 -mt-32">
            <FaSpinner className="animate-spin text-2xl" />
            <p className="">wait small...</p>
          </div>
        ) : ( */}
        <div className="w-full ">
          <div className="hidden lg:flex w-full">
            <Table data={employees} columns={columns} loading={isLoading} />
          </div>
          <div className=" w-full md:grid grid-cols-2 lg:hidden gap-4">
            {employees.map((e, k) => (
              <>
                <EditEmployeeModal data={e.data} />
                <EmployeeCard data={e} />
              </>
            ))}
          </div>
        </div>
        {/* )} */}
      </div>
      <DisableEmployeeModal
        employeeData={employeeData}
        setEmployeeData={setEmployeeData}
        isOpen={Object.values(employeeData).length > 0}
      />
    </div>
  );
};

export default Employee;
