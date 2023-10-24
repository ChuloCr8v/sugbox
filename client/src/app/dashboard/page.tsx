"use client";

import React, { useEffect, useState } from "react";
import { authData, getSuggestions, getToken } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import PageHeader from "../components/PageHeader";
import FilterCards from "../components/FilterCards";
import SuggestionCards from "../components/SuggestionCards";

const Dashboard = () => {
  const { suggestions } = useSelector((state) => state.suggestions);

  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const [filter, setFilter] = useState("total");
  const auth = authData({ useSelector });
  const token = getToken({ useSelector });

  const router = useRouter();
  const dispatch = useDispatch();
  const companyId = auth?.companyId || auth?._id;

  useEffect(() => {
    !auth && router.push("/login");
    return;
  }, [auth]);

  console.log(auth);

  useEffect(() => {
    getSuggestions({ dispatch, token, companyId: companyId });
    console.log(suggestions);
  }, []);

  useEffect(() => {
    if (filter === "total") {
      setFilteredSuggestions(suggestions);
    } else {
      const statusFilter = suggestions.filter(
        (s: { status: string }) => s.status === filter
      );
      setFilteredSuggestions(statusFilter);
    }
  }, [filter]);

  return (
    <div className="w-full p-10 pt-24">
      <PageHeader title="Dashboard" />
      <FilterCards data={suggestions} setFilter={setFilter} filter={filter} />
      <SuggestionCards data={filteredSuggestions} />
    </div>
  );
};

export default Dashboard;
