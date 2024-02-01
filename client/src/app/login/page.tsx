"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authData, employeeSignIn, signIn } from "../../../api";
import Form from "../components/LoginForm";
import { loginFormValues } from "../data";
import { loginFailure } from "../../../redux/auth";

interface inputValueProps {
  email: string;
  password: string;
}

const SignIn = () => {
  const [inputValue, setInputValue] = useState<inputValueProps>({email: '', password: ''});
  const {isLoading} = useSelector((state: {auth: {isLoading: boolean}}) => state.auth)

  const { loginRole } = useSelector((state: { auth: { loginRole: String } }) => state.auth);

  const auth = authData({ useSelector });
  const router = useRouter();
  useEffect(() => {
    !auth && router.push("/login");
  }, [auth]);

  const dispatch = useDispatch();

  authData({ useSelector });

  const handleInputChange = (e: { preventDefault: () => void; target: { name: any; value: any; }; }) => {
    e.preventDefault();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    //dispatch(loginFailure())

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

  console.log(isLoading)



  return (
    <div className="xl:grid grid-cols-2 h-screen w-screen overflow-hidden login bg-primaryblue xl:bg-transparent">
      <div className="hidden xl:flex flex-col items-center justify-center h-full w-full">
      
        <Image
          src={"/box.png"}
          height={300}
          width={300}
          alt={"sugbox"}
          className=""
        />
        <h2 className="font-bold text-2xl text-white mt-6">Welcome Back</h2>
        <p className="text-lg text-white mt-1 capitalize">
          Login To{" "}
          {loginRole !== "employee"
            ? " View Latest Suggestions from your employees"
            : "Leave Your Suggestions"}
        </p>
      </div>
      <div className=" flex flex-col items-center justify-center h-full w-full px-4">
      <p className="text-2xl mb-4 text-center font-semibold text-white">{loginRole !== "employee"
            ? "Admin"
            : "Employee"} Login</p>
        <Form
          handleInputChange={handleInputChange}
          formValues={loginFormValues}
          handleSubmit={handleSubmit}
          disabled={checkValues() || isLoading}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default SignIn;
