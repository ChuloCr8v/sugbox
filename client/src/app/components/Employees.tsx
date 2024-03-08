import React, { ReactNode } from "react";
import Table from "./Table";
import useGetEmployees from "../hooks/useGetEmployees";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { PieChart } from "@mui/x-charts/PieChart";
import { DefaultizedPieValueType } from "@mui/x-charts";
import EmployeeStatusTag from "./EmployeeStatusTag";
import PieChartComponent from "./PieChart";

type Props = {};

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

export const SectionHeading = (props: { heading: string }) => {
  return <h3 className="font-semibold text-xl text-left">{props.heading}</h3>;
};

const Employees = (props: Props) => {
  const { employees, activeEmployees, disabledEmployees } = useGetEmployees();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (
        _: ReactNode,
        record: { _id: string; firstName: string; lastName: string }
      ) => (
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
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: ReactNode, record: { isDisabled: boolean }) => (
        <EmployeeStatusTag status={record.isDisabled} />
      ),
    },
    {
      title: "Role",
      align: "center",
      dataIndex: "role",
    },
  ];

  const pieChartData = [
    {
      id: 0,
      value: activeEmployees,
      label: "Active",
      color: "#16a34a",
    },
    {
      id: 1,
      value: disabledEmployees.length,
      label: "Disabled",
      color: "lightgray",
    },
  ];

  return (
    <section>
      <div className="">
        <div className="table w-full">
          <SectionHeading heading="Employees" />
          <div className="mt-4 flex gap-4">
            <div className="border rounded-md w-full bg-white">
              <Table data={employees} columns={columns} />
            </div>

            <PieChartComponent data={pieChartData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Employees;
