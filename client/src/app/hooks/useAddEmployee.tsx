import { useState } from "react";
import axios from "axios";
import { loginFailure } from "../../../redux/auth";
import { addEmployeeSuccess } from "../../../redux/employees";
import {
  showAlert,
  hideNewEmployeeModal,
  hideAlert,
} from "../../../redux/modals";
import { useDispatch } from "react-redux";
import UseGetAuth from "./useGetAuth";

interface Props {
  signUpData: {
    firstName: string;
  };
}

const useEmployeeSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { token, id } = UseGetAuth();

  const employeeSignUp = async ({ signUpData }: Props) => {
    setLoading(true);
    try {
      const employees = await axios.post(
        `http://localhost:8000/api/auth/employee/new-employee/${id}`,
        signUpData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      dispatch(addEmployeeSuccess(employees.data.employee));
      dispatch(
        showAlert({
          alertText: `${signUpData.firstName} registered successfully`,
          alertType: "success",
        })
      );
      dispatch(hideNewEmployeeModal());
      console.log("Registration Successful");
    } catch (error) {
      console.error(error);
      setError(`Unable to register ${signUpData.firstName}! Please try again.`);
      dispatch(
        showAlert({
          alertText: `Unable to register ${signUpData.firstName}! Please try again.`,
          alertType: "error",
        })
      );
    } finally {
      setLoading(false);
      dispatch(loginFailure());
      setTimeout(() => {
        dispatch(hideAlert());
        setError("");
      }, 3000);
    }
  };

  return { loading, error, employeeSignUp };
};

export default useEmployeeSignUp;
