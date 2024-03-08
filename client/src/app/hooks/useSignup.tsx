"use client";

import axios from "axios";
import router from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { hideAlert, showAlert } from "../../../redux/modals";

type Props = {};

interface signUpProps {
  companyName: string;
}

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const signUp = async (signUpData: signUpProps) => {
    setIsLoading(true);
    try {
      await axios.post(
        `http://localhost:8000/api/auth/company/new-company`,
        signUpData
      );

      dispatch(
        showAlert({
          alertText: `${signUpData.companyName} registered successfully`,
          alertType: "success",
        })
      );
      router.push("/login");
      console.log("Registeration Successfull");
    } catch (error) {
      console.log(error);
      dispatch(
        showAlert({
          alertText: `Unable to register ${signUpData.companyName}! Please try again.`,
          alertType: "error",
        })
      );
    }
    setTimeout(() => dispatch(hideAlert()), 3000);
    setIsLoading(false);
  };

  return { isLoading, signUp };
};

export default useLogin;
