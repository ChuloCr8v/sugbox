import { PieChart } from "@mui/x-charts/PieChart";
import Link from "next/link";
import { ReactNode } from "react";
import useGetEmployees from "../hooks/useGetEmployees";
import Table from "./Table";
import useGetSuggestions from "../hooks/useGetSuggestions";
import { twMerge } from "tailwind-merge";
import { statusColor } from "../hooks/useStatusColor";
import SuggestionStatusTag from "./SuggestionStatusTag";
import PieChartComponent from "./PieChart";

const Suggestions = () => {
  const SectionHeading = (props: { heading: string }) => {
    return <h3 className="font-semibold text-xl text-left">{props.heading}</h3>;
  };

  const {
    suggestions,
    approvedSuggestions,
    rejectedSuggestions,
    pendingSuggestions,
  } = useGetSuggestions();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (_: ReactNode, record: { title: string; _id: string }) => (
        <Link
          href={{
            pathname: "/profile",
            query: {
              id: record._id,
            },
          }}
          className="capitalize font-bold text-primaryblue"
        >
          {record.title}
        </Link>
      ),
    },
    {
      title: "Suggester",
      dataIndex: "suggester",
      key: "suggester",
      render: (
        _: ReactNode,
        record: {
          isAnonymous: boolean;
          user: { firstName: string; lastName: string };
          upVotes: [];
        }
      ) =>
        record.isAnonymous ? (
          "Anonymous"
        ) : (
          <p className="">{record.user.firstName}</p>
        ),
    },
    {
      title: "Upvotes",
      dataIndex: "upvotes",
      key: "upvotes",
      align: "center",

      render: (_: ReactNode, record: { upVotes: [] }) => (
        <p className="">{record.upVotes.length}</p>
      ),
    },
    {
      title: "downvotes",
      align: "center",
      dataIndex: "upvotes",
      key: "upvotes",
      render: (_: ReactNode, record: { downVotes: [] }) => (
        <p className="">{record.downVotes.length}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "upvotes",
      render: (_: ReactNode, record: { status: string }) => (
        <SuggestionStatusTag status={record.status} />
      ),
    },
  ];

  const pieChartData = [
    {
      id: 0,
      value: approvedSuggestions.length,
      label: "Approved",
      color: "#0275ff",
    },
    {
      id: 1,
      value: rejectedSuggestions.length,
      label: "Rejected",
      color: "#ef4477",
    },
    {
      id: 2,
      value: pendingSuggestions.length,
      label: "Pending",
      color: "#f97316",
    },
  ];

  return (
    <section>
      <div className="">
        <div className="table w-full">
          <SectionHeading heading="Suggestions" />
          <div className="mt-4 flex gap-4">
            <PieChartComponent data={pieChartData} />
            <div className="border rounded-md w-full bg-white">
              <Table data={suggestions} columns={columns} pageSize={4} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Suggestions;
