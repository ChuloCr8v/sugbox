"use client";

import Image from "next/image";
import { useState } from "react";
import Form from "../components/SignupForm";
import { signupFormValues } from "../data";
import useSignup from "../hooks/useSignup";

interface inputValueProps {
  companyEmail: string;
  companyName: string;
  password: string;
  confirmPassword: string;
}

const inputValues = {
  companyEmail: "",
  companyName: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const [signUpData, setSignUpData] = useState<inputValueProps>(inputValues);

  const { signUp, isLoading } = useSignup();

  const handleInputChange = (e: {
    preventDefault: () => void;
    target: { name: string; value: string };
  }) => {
    e.preventDefault();
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signUp(signUpData);
  };

  const checkValues = () => {
    return signUpData.companyEmail &&
      signUpData.companyName &&
      signUpData.password &&
      signUpData.confirmPassword === signUpData.password
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
          Register your organization to Start Getting Suggestions
        </p>
      </div>
      <div className="flex flex-col items-center justify-center h-screen w-full overflow-y-scroll p-4 pt-48 pb-20 xl:pt-36">
        <p className="text-2xl mb-4 text-center font-semibold text-white">
          Register your Organization
        </p>
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
