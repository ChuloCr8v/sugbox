"use client";

import React, { useEffect } from "react";
import { authData, getSuggestions } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import PageHeader from "../components/PageHeader";
import FilterCards from "../components/FilterCards";
import SuggestionCards from "../components/SuggestionCards";

const Dashboard = () => {
  const { suggestions } = useSelector((state) => state.suggestions);
  const auth = authData({ useSelector });

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    !auth && router.push("/login");
  }, [auth]);

  useEffect(() => {
    getSuggestions({ dispatch });
    console.log(suggestions);
  }, []);

  return (
    <div className="w-full p-10 pt-24">
      <PageHeader title="Dashboard" />
      <FilterCards data={suggestions} />
      <SuggestionCards data={suggestions} />
    </div>
  );
};

export default Dashboard;
