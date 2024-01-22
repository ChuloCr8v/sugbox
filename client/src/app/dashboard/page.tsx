"use client";

import React, { useEffect, useState } from "react";
import { authData, getSuggestions, getToken } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import PageHeader from "../components/PageHeader";
import FilterCards from "../components/FilterCards";
import SuggestionCards from "../components/SuggestionCards";
import Loading from "../components/Loading";
import { suggestionProps } from "../types";

const Dashboard = () => {
  const { loadingSuggestions } = useSelector(
    (state: { suggestions: { loadingSuggestions: boolean } }) =>
      state.suggestions
  );
  const { suggestions } = useSelector(
    (state: { suggestions: { suggestions: [] } }) => state.suggestions
  );

  const [filteredSuggestions, setFilteredSuggestions] = useState<
    Array<suggestionProps>
  >([]);
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

  useEffect(() => {
    getSuggestions({ dispatch, token, companyId: companyId });
  }, []);

  useEffect(() => {
    if (filter === "total") {
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions(
        suggestions.filter((s: { status: string }) => s.status === filter)
      );
    }
  }, [filter, suggestions]);

  console.log(suggestions);

  return (
    <div className="w-full p-4 pt-24">
      <PageHeader title="Dashboard" />
      <FilterCards data={suggestions} setFilter={setFilter} filter={filter} />
      {loadingSuggestions ? (
        <Loading />
      ) : (
        <SuggestionCards data={filteredSuggestions} />
      )}
    </div>
  );
};

export default Dashboard;
