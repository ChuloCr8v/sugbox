"use client";

import Employees from "../components/Employees";
import PageHeader from "../components/PageHeader";
import Suggestions from "../components/Suggestions";
import SummaryCardSection from "../components/SummaryCardSection";

const Dashboard = () => {
  return (
    <div className="w-full p-4 pt-24">
      <PageHeader title="Dashboard" />
      <div className="mt-6 space-y-6">
        <SummaryCardSection />
        <Employees />
        <Suggestions />
      </div>
    </div>
  );
};

export default Dashboard;
