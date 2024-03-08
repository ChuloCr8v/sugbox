import React from "react";
import ProfileCard from "./ProfileCard";
import { FaLightbulb, FaUser, FaUsers } from "react-icons/fa";
import useGetEmployees from "../hooks/useGetEmployees";
import { useSelector } from "react-redux";
import UseGetAuth from "../hooks/useGetAuth";
import dayjs from "dayjs";
import useGetSuggestions from "../hooks/useGetSuggestions";
import Link from "next/link";

const SummaryCardSection = () => {
  const { employees, disabledEmployees, activeEmployees } = useGetEmployees();
  const { suggestions, approvedSuggestions, rejectedSuggestions } =
    useGetSuggestions();

  const { others } = UseGetAuth();

  const summaryData = [
    {
      icon: <FaUser />,
      label: "Profile",
      value: employees.length,
      url: "/profile",
      data: [
        {
          label: "organization",
          value: others?.companyName,
        },
        {
          label: "email",
          value: others?.companyEmail,
        },
        {
          label: "created on",
          value: dayjs(others?.createdAt).format("DD.MM.YYYY"),
        },
      ],
    },
    {
      icon: <FaUsers />,
      label: "employees",
      value: employees.length,
      url: "/employees",

      data: [
        {
          label: "total",
          value: employees.length,
        },
        {
          label: "active",
          value: activeEmployees,
        },
        {
          label: "disabled",
          value: disabledEmployees?.length,
        },
      ],
    },
    {
      icon: <FaLightbulb />,
      label: "suggestions",
      value: suggestions.length,
      url: "/suggestion",
      data: [
        {
          label: "total",
          value: suggestions.length,
        },
        {
          label: "approved",
          value: approvedSuggestions.length,
        },
        {
          label: "rejected",
          value: rejectedSuggestions.length,
        },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 items-center">
      {summaryData.map((s, index) => (
        <Link
          key={index}
          className="border rounded-md p-4 pt-2 pb-4 bg-white w-full hover:border-blue-200 duration-200"
          href={s.url}
        >
          <p className="uppercase text-[13px] text-gray-500 font-semibold border-b border-gray-200 mb-4">
            {s.label}
          </p>
          <div className="icon flex items-start gap-4">
            <div className="w-[65px] h-[65px] bg-primaryblue text-5xl font-semibold rounded-xl text-white flex flex-col justify-center items-center">
              {s.icon}{" "}
            </div>
            <div className="flex flex-col items-start text-sm gap-1">
              {s.data.map((d) => (
                <div className="" key={d.label}>
                  <p className=" font-semibold">
                    <span className="text-gray-500 font-normal capitalize">
                      {d.label}:
                    </span>{" "}
                    {d.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="capitalize text-sm text-gray-500 flex gap-2 mt-4 border-t pt-2">
            {s.data.map((d) => (
              <div className="" key={d.label}>
                <p className="">
                  <span className="text-primaryblue font-semibold">
                    {d.value}{" "}
                  </span>
                  {d.label}
                </p>
              </div>
            ))}
          </div> */}
        </Link>
      ))}
    </div>
  );
};

export default SummaryCardSection;
