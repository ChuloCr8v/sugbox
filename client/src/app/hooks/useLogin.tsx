"use client";

import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure, startLogin } from "../../../redux/auth";
import { showAlert, hideAlert } from "../../../redux/modals";
import router, { useRouter } from "next/router";

type Props = {};

export type loginRoleProps = { auth: { loginRole: String } };

const useLogin = (loginData: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { loginRole } = useSelector((state: loginRoleProps) => state.auth);

  const dispatch = useDispatch();

  const adminSignIn = async () => {
    setIsLoading(true);

    try {
      const authDetails = await axios.put(
        "http://localhost:8000/api/auth/company/login-company",
        loginData
      );
      const auth = authDetails.data;

      dispatch(loginSuccess(auth));

      dispatch(
        showAlert({
          alertText: `Login Successfull`,
          alertType: "success",
        })
      );

      router.push("/dashboard");
    } catch (error) {
      console.log("error");
      dispatch(
        showAlert({
          alertText: `Unable to login. Try again.`,
          alertType: "error",
        })
      );
    }
    setIsLoading(false);
    setTimeout(() => dispatch(hideAlert()), 3000);
  };

  const employeeSignIn = async () => {
    setIsLoading(true);

    try {
      const authDetails = await axios.put(
        "http://localhost:8000/api/auth/employee/login-employee",
        loginData
      );

      const auth = authDetails.data;

      dispatch(loginSuccess(auth));

      dispatch(
        showAlert({
          alertText: `Login Successfull`,
          alertType: "success",
        })
      );

      router.push("/dashboard");
    } catch (error) {
      dispatch(loginFailure());
      console.log("error");
      dispatch(
        showAlert({
          alertText: `Unable to login. Try again.`,
          alertType: "error",
        })
      );
    }
    setTimeout(() => dispatch(hideAlert()), 3000);
    setIsLoading(false);
  };

  return { isLoading, loginRole, adminSignIn, employeeSignIn };
};

export default useLogin;
