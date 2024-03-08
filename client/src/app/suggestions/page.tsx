"use client";

import { useDispatch } from "react-redux";
import { showNewEmployeeModal } from "../../../redux/modals";
import Button from "../components/Button";
import FilterCards from "../components/FilterCards";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import SuggestionCards from "../components/SuggestionCards";
import useGetSuggestions from "../hooks/useGetSuggestions";
import UseGetAuth from "../hooks/useGetAuth";
import { SectionHeading } from "../components/Employees";

const Dashboard = () => {
  const { isLoading, suggestions, setFilter, filter } = useGetSuggestions();

  const dispatch = useDispatch();
  const { isAdmin } = UseGetAuth();

  return (
    <div className="w-full p-4 pt-24">
      <SectionHeading heading={"Suggestions"} />
      <FilterCards data={suggestions} setFilter={setFilter} filter={filter} />
      {isLoading ? (
        <Loading />
      ) : !suggestions?.length ? (
        <div className="flex flex-col justify-center items-center h-full">
          <p>No Suggestions Yet</p>
          <span className="">
            <Button
              onClick={() => dispatch(showNewEmployeeModal())}
              className="p-0 text-primaryblue hover:text-hoverblue underline"
              text={isAdmin ? "Add Employees" : "Add"}
            />{" "}
            {isAdmin ? "to start seeing suggestions" : " your suggestions now"}.
          </span>
        </div>
      ) : (
        <SuggestionCards data={suggestions} />
      )}
    </div>
  );
};

export default Dashboard;
