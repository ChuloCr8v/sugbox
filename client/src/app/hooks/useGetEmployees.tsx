"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeSuccess } from "../../../redux/employees";
import useGetAuth from "./useGetAuth";

const useGetEmployees = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useGetAuth();

  const { employees } = useSelector((state) => state.employees);

  const disabledEmployees = employees.filter(
    (employee: { isDisabled: boolean }) => employee.isDisabled === true
  );
  const activeEmployees = employees.length - disabledEmployees.length;

  const dispatch = useDispatch();

  const getEmployees = async () => {
    setIsLoading(true);

    try {
      const fetch = await axios.get("http://localhost:8000/api/employee/all");
      const employees_ = fetch.data.filter(
        (d: { companyId: string }) => d.companyId === id
      );
      dispatch(getEmployeeSuccess(employees_));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return {
    isLoading,
    employees,
    getEmployees,
    activeEmployees,
    disabledEmployees,
  };
};

export default useGetEmployees;
