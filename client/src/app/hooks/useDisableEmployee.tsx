"use client";

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { disableEmployee, getEmployeeSuccess } from "../../../redux/employees";
import { hideAlert, showAlert } from "../../../redux/modals";
import UseGetAuth from "./useGetAuth";
import useGetEmployees from "./useGetEmployees";

interface Props {}

const useDisableEmployee = (setEmployeeData: (arg: Object) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { employees, setEmployees, getEmployees } = useGetEmployees();
  const { token } = UseGetAuth();

  const dispatch = useDispatch();

  const deleteEmployee = async (id: string) => {
    setIsLoading(true);
    try {
      const updatedEmployees = await axios.put(
        `http://localhost:8000/api/employee/${id}`,
        { isDisabled: true },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      dispatch(disableEmployee(id));
      dispatch(
        showAlert({
          alertText: `Employee disabled successfully.`,
          alertType: "success",
        })
      );
      setEmployeeData({});
      setEmployees(null);
      console.log(employees);
    } catch (error) {
      dispatch(
        showAlert({
          alertText: `Unable to disable employee!`,
          alertType: "error",
        })
      );
      console.log(error);
    }
    setTimeout(() => dispatch(hideAlert()), 3000);
    setIsLoading(false);
  };

  return { isLoading, deleteEmployee };
};

export default useDisableEmployee;
