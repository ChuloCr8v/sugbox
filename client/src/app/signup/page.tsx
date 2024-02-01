"use client";

import Image from "next/image";
import { Dispatch, useState } from "react";
import Form from "../components/SignupForm";
import { showAlert, startLoading, stopLoading } from "../../../redux/modals";
import { useDispatch, useSelector } from "react-redux";
import { signupFormValues } from "../data";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { signUp } from "../../../api/auth";

interface inputValueProps {
  signUpData: {};
 
  router: AppRouterInstance;
  companyName: string;
  companyEmail: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const [inputValue, setInputValue] = useState<inputValueProps>({});
  const {isLoading} = useSelector((state: {employees: {isLoading: boolean}}) => state.employees)


  const dispatch = useDispatch();

  const handleInputChange = (e: { preventDefault: () => void; target: { name: string; value: string; }; }) => {
    e.preventDefault();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({
      signUpData: inputValue,
      dispatch,
      router,
      companyName: inputValue.companyName,
    });
  };

  const checkValues = () => {
    return inputValue.companyEmail &&
      inputValue.companyName &&
      inputValue.password &&
      inputValue.confirmPassword === inputValue.password
      ? false
      : true;
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen signup">
      <div className="hidden xl:flex flex-col items-center justify-center h-full w-full">
        <Image
          src={"/box.png"}
          height={300}
          width={300}
          alt={"sugbox"}
          className=""
        />
        <h2 className="font-bold text-2xl text-white mt-6">
          Welcome To Suggbox
        </h2>
        <p className="text-lg text-white mt-1">
         Add Employees To Start Getting Suggestions
        </p>
      </div>
      <div className="flex items-center justify-center h-screen w-full overflow-y-scroll p-4 pt-48 pb-20 xl:pt-36">
        <Form
          handleInputChange={handleInputChange}
          formValues={signupFormValues}
          handleSubmit={handleSubmit}
          disabled={checkValues() || isLoading}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Signup;
