"use client";

import React, { useEffect, useState } from "react";
import FilterCards from "../components/FilterCards";
import { authData } from "../../../api";
import { getUserSuggestions } from "../api/suggestions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import SuggestionCards from "../components/SuggestionCards";

const page = () => {
  const [filter, setFilter] = useState("total");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const dispatch = useDispatch();
  const auth = authData({ useSelector });
  const userId = auth._id;
  const companyId = auth.companyId;

  const { singleUserSuggestions } = useSelector((state) => state.suggestions);

  useEffect(() => {
    getUserSuggestions({ dispatch, userId, companyId });
  }, []);

  useEffect(() => {
    if (filter === "total") {
      setFilteredSuggestions(singleUserSuggestions);
    } else {
      setFilteredSuggestions(
        singleUserSuggestions.filter((s) => s.status === filter)
      );
    }
  }, [filter, singleUserSuggestions]);

  return (
    <div className="w-full p-10 pt-24">
      <PageHeader title="My Suggestions" />
      <FilterCards
        data={singleUserSuggestions}
        setFilter={setFilter}
        filter={filter}
      />
      <SuggestionCards data={filteredSuggestions} />
    </div>
  );
};

export default page;
