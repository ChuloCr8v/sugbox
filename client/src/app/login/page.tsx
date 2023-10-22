"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authData, employeeSignIn, signIn } from "../../../api";
import Form from "../components/LoginForm";
import { loginFormValues } from "../data";

interface inputValueProps {
  email: string;
  password: string;
}

const SignIn = () => {
  const [inputValue, setInputValue] = useState<inputValueProps>({});

  const { loginRole } = useSelector((state) => state.auth);

  const auth = authData({ useSelector });
  const router = useRouter();
  useEffect(() => {
    !auth && router.push("/login");
  }, [auth]);

  const dispatch = useDispatch();

  authData({ useSelector });
  // const { auth } = useSelector((state) => state.auth);

  // console.log(auth.auth.data.others);

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    console.log(inputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginRole === "employee") {
      employeeSignIn({ loginData: inputValue, dispatch, router });
      return;
    }
    signIn({ loginData: inputValue, dispatch, router });
  };

  const checkValues = () => {
    return inputValue.email && inputValue.password ? false : true;
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="bg-gradient-to-r from-primaryblue to-cyan-700  hidden xl:flex flex-col items-center justify-center h-full w-full">
        <Image
          src={"/box.png"}
          height={300}
          width={300}
          alt={"sugbox"}
          className=""
        />
        <h2 className="font-bold text-2xl text-white mt-6">Welcome Back</h2>
        <p className="text-lg text-white mt-1">
          Login To Leave Your Suggestions
        </p>
      </div>
      <div className=" flex items-center justify-center h-full w-full">
        <Form
          handleInputChange={handleInputChange}
          formValues={loginFormValues}
          handleSubmit={handleSubmit}
          disabled={checkValues()}
        />
      </div>
    </div>
  );
};

export default SignIn;
