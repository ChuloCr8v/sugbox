"use client";

import { Select } from "antd";
import FilterCard from "./FilterCard";

interface Props {
  data: { status: string }[];
  setFilter: (arg0: string) => void;
  filter: string;
}

const FilterCards = (props: Props) => {
  const pending = props.data.filter((d) =>
    d.status.toLowerCase().includes("pending")
  );
  const approved = props.data.filter((d) =>
    d.status.toLowerCase().includes("approved")
  );
  const rejected = props.data.filter((d) =>
    d.status.toLowerCase().includes("rejected")
  );
  const filters = [
    { title: "total", number: props.data.length },
    { title: "pending", number: pending.length },
    { title: "approved", number: approved.length },
    { title: "rejected", number: rejected.length },
  ];

  const handleChange = (value: string) => {
    props.setFilter(value);
    console.log(value);
  };

  return (
    <div className="">
      <div className="hidden lg:grid md:grid-cols-2 xl:grid-cols-4 items-center gap-4 mt-4">
        {" "}
        {filters.map((d, index) => (
          <FilterCard
            data={d}
            key={index}
            setFilter={props.setFilter}
            filter={props.filter}
          />
        ))}
      </div>
      <div className="lg:hidden mt-4">
        <Select
          defaultValue="All"
          style={{ width: 120 }}
          onChange={handleChange}
          options={filters.map((v) => ({ label: v.title, value: v.title }))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default FilterCards;
