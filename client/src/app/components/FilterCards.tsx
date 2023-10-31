import React from "react";
import FilterCard from "./FilterCard";

interface Props {
  data: [];
  setFilter: (arg0: string) => void;
  filter: string;
}

const FilterCards = (props: Props) => {
  const pending = props.data.filter((d: { status: string }) =>
    d.status.toLowerCase().includes("pending")
  );
  const approved = props.data.filter((d: { status: string }) =>
    d.status.toLowerCase().includes("approved")
  );
  const rejected = props.data.filter((d: { status: string }) =>
    d.status.toLowerCase().includes("rejected")
  );
  const filters = [
    { title: "total", number: props.data.length },
    { title: "pending", number: pending.length },
    { title: "approved", number: approved.length },
    { title: "rejected", number: rejected.length },
  ];

  return (
    <div className="flex items-center gap-4 mt-4">
      {filters.map((d, index) => (
        <FilterCard
          data={d}
          key={index}
          setFilter={props.setFilter}
          filter={props.filter}
        />
      ))}
    </div>
  );
};

export default FilterCards;
