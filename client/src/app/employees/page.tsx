"use client";

import React, { ReactNode, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import {
  authData,
  deleteEmployee,
  getEmployees,
  getToken,
  makeModerator,
  removeModerator,
} from "../../../api";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import { twMerge } from "tailwind-merge";
import { ColumnsType } from "antd/es/table";
import { Dropdown, MenuProps, Modal, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import Link from "next/link";

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

interface ConfirmModalProps {
  children: ReactNode;
  open: boolean | object;
  onCancel: (arg0: boolean) => {};
  title: string;
  onClick: () => void;
}

const Employee = () => {
  const [showConfirmModal, setShowConfirmModal] = useState({});
  const { isLoading } = useSelector((state) => state.modals);

  const dispatch = useDispatch();
  const userData = authData({ useSelector });
  const { employees } = useSelector(
    (state: { employees: { employees: [] } }) => state.employees
  );
  const token = getToken({ useSelector });
  const auth = authData({ useSelector });
  const router = useRouter();
  const id = userData?.companyId ? userData?.companyId : userData?._id;

  if (!auth) {
    return router.push("/login");
  }

  useEffect(() => {
    getEmployees({ dispatch, id });
  }, []);

  const DropDown = ({
    data,
  }: {
    data: {
      firstName: string;
      lastName: string;
      _id: string;
      isAdmin: boolean;
    };
  }) => {
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <div className="flex flex-col items-start ">
            <Button
              className={twMerge("h-fit px-0 py-0 p-0 w-fit")}
              text={
                <div className="px-4 py-2 w-full flex items-center gap-4 hover:bg-blue-50">
                  <UserSwitchOutlined />
                  <span className="">
                    {data.role.toLowerCase() === "moderator"
                      ? "remove moderator"
                      : "Make Moderator"}
                  </span>
                </div>
              }
              disabled={false}
              onClick={() => handleMakeModerator(data)}
            />

            <Button
              className={twMerge("w-full h-fit p-0")}
              text={
                <div className="px-4 py-2 w-full flex items-center gap-4 hover:bg-blue-50">
                  <DeleteOutlined />
                  <span className="">Delete Employee</span>
                </div>
              }
              disabled={false}
              onClick={() => handleDeleteModal(data)}
            />

            <Button
              className={twMerge("w-full h-fit p-0")}
              text={
                <div className="px-4 py-2 w-full flex items-center gap-4 hover:bg-blue-50">
                  <EditOutlined />
                  <span className="">Edit Employee</span>
                </div>
              }
              disabled={false}
              onClick={() => handleDeleteModal(data)}
            />
          </div>
        ),
      },
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

  const handleMakeModerator = (record) => {
    setShowConfirmModal({
      record,
      dispatch,
      children: (
        <p className="">
          {record.role.toLowerCase() === "moderator" ? "Remove" : "Assign"}{" "}
          moderator privilegdes{" "}
          {record.role.toLowerCase() === "moderator" ? "from" : "to"}
          <span className="text-fortrexorange font-bold mx-1">
            {record.firstName + " " + record.lastName}?
          </span>
        </p>
      ),
      onClick: () => {
        if (record.role === "moderator") {
          removeModerator({
            id: record._id,
            dispatch,
            token,
            setShowConfirmModal,
          });
        } else {
          makeModerator({
            id: record._id,
            dispatch,
            token,
            setShowConfirmModal,
          });
        }
      },
      title: record.isAdmin ? "Remove Admin" : "Make Admin",
      onCancel: () => setShowConfirmModal(false),
    });
  };

  const handleDeleteModal = (record: {
    firstName: string;
    lastName: string;
    _id: string;
  }) => {
    setShowConfirmModal({
      record,
      dispatch,
      children: (
        <p className="">
          Delete
          <span className="text-fortrexorange font-bold mx-1">
            {record.firstName + " " + record.lastName}
          </span>
          from your employees?
        </p>
      ),
      onClick: () =>
        deleteEmployee({
          id: record._id,
          dispatch,
          token,
          setShowConfirmModal,
        }),
      title: "Delete Employee",
      onCancel: () => setShowConfirmModal(false),
    });
  };

  const ConfirmModal = ({
    children,
    open,
    onCancel,
    title,
    onClick,
  }: ConfirmModalProps) => {
    const footer = (
      <div className="mt-6 flex items-center gap-2 justify-end">
        <Button
          type="secondary"
          text={"Cancel"}
          disabled={false}
          onClick={() => setShowConfirmModal(false)}
        />
        <Button
          type="primary"
          text={title?.toLowerCase().includes("admin") ? "Confirm" : "Delete"}
          disabled={false}
          onClick={onClick}
        />
      </div>
    );

    return (
      <Modal
        title={title}
        open={open}
        onCancel={onCancel}
        footer={footer}
        className={twMerge("")}
      >
        {children}
      </Modal>
    );
  };

  // const EditEmployeeModal = () => {

  //   const [modalOpen, setModalOpen] = useState(false)

  //   return (
  //     <Modal
  //       title="Basic Modal"
  //       open={modalOpen}

  //       onCancel={() => setModalOpen(false)}
  //     >

  //     </Modal>
  //   );
  // };

  const EmployeeCard = (data: {
    data: {
      firstName: string;
      lastName: string;
      role: string;
      email: string;
      suggestions: Array;
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

  console.log(employees);

  return (
    <div className="w-full p-4 pt-24">
      <PageHeader title={"Employees"} />
      <div className="mt-6">
        {isLoading ? (
          "Loading"
        ) : (
          <div className="w-full">
            <div className="hidden lg:flex w-full">
              {" "}
              <Table data={employees} columns={columns} />
            </div>
            <div className="lg:hidden w-full md:grid grid-cols-2 gap-4">
              {employees.map((e, k) => (
                <EmployeeCard data={e} />
              ))}
            </div>
          </div>
        )}

        {showConfirmModal && (
          <ConfirmModal
            children={showConfirmModal.children}
            open={showConfirmModal.children}
            onCancel={() => setShowConfirmModal(false)}
            title={showConfirmModal.title}
            onClick={showConfirmModal.onClick}
          />
        )}
      </div>
    </div>
  );
};

export default Employee;
