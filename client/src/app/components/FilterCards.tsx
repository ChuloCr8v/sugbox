import React from "react";
import FilterCard from "./FilterCard";

interface Props {
  data: [];
}

const FilterCards = (props: Props) => {
  const filters = [
    { title: "total", number: props.data.length },
    { title: "pending", number: props.data.length },
    { title: "approved", number: props.data.length },
    { title: "rejected", number: props.data.length },
  ];

  return (
    <div className="flex items-center gap-4 mt-4">
      {filters.map((d, index) => (
        <FilterCard data={d} />
      ))}
    </div>
  );
};

export default FilterCards;
