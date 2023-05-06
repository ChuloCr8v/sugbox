import React, { useState } from "react";
import Button from "./Button";
// import axios from "axios";
// import {
//   hideForm,
//   hideModal,
//   showForm,
//   showModal,
// } from "../../redux/formSlice";
// import { loginSuccess, setToken } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { hideLoginForm, hideModal, showModal } from "../../redux/formSlice";
import axios from "axios";
import { loginSuccess, setToken } from "../../redux/UserSlice";
import { stopLoading } from "../../redux/loaderSlice";
// import { startLoading, stopLoading } from "../../redux/loaderSlice"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const dispatch = useDispatch();
  const { formTitle } = useSelector((state: any) => state.form);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (email === "") {
      setEmailErrorMsg("please fill in email");
      return;
    } else if (password === "") {
      setPasswordErrorMsg("please use 8 characters or above");
      return;
    }

    console.log("Login Started");
    //dispatch(startLoading());
    try {
      const user = formTitle.includes("Organization")
        ? await axios.put(
            "http://localhost:8000/api/auth/company/login-company",
            {
              email: email,
              password: password,
            }
          )
        : await axios.put(
            "http://localhost:8000/api/auth/employee/login-employee",
            {
              email: email,
              password: password,
            }
          );
      dispatch(loginSuccess(user));
      console.log("Login Successful");
      console.log(user);
      dispatch(hideLoginForm());
      dispatch(setToken(user.data.token));
      dispatch(stopLoading());
      dispatch(showModal("Login Successful"));
      setTimeout(() => {
        dispatch(hideModal());
      }, 1000);
    } catch (error) {
      console.log(error);
    }
    //dispatch(stopLoading())
  };

  const handleCloseForm = () => {
    dispatch(hideLoginForm());
  };

  return (
    <div className="login w-screen h-screen fixed top-0 left-0 flex flex-col items-center justify-center nset-0">
      <div
        onClick={handleCloseForm}
        className="bg-black bg-opacity-50 absolute top-0 left-0 w-screen h-screen z-0"
      ></div>
      <form className="bg-white shadow-xl max-w-[400px] px-8 py-12 rounded-xl grid gap-4 min-w-[350px] relative z-50">
        <div className="title_wrapper flex flex-col items-center gap-1">
          <h3 className=" text-center font-semibold text-2xl capitalize">
            Welcome to suggbox
          </h3>

          <p className="text-center text-base text-blue-400">{formTitle}</p>
        </div>
        <div className="form_group flex flex-col justify-start gap-2 mt-6">
          <label htmlFor="" className="">
            Email
          </label>
          <input
            type="text"
            className={`border ${
              emailErrorMsg ? "border-red-600" : "border- gray-200"
            } hover:border-green-400 p-2 rounded-xl`}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailErrorMsg("");
            }}
            placeholder="Enter username"
          />
          {emailErrorMsg && (
            <p className="text-[12px] -mt-2 text-red-600">{emailErrorMsg}</p>
          )}
        </div>
        <div className="form_group flex flex-col justify-start gap-2">
          <label htmlFor="" className="">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordErrorMsg("");
            }}
            className={`border ${
              passwordErrorMsg ? "border-red-600" : "border- gray-200"
            } hover:border-green-400 p-2 rounded-xl`}
            placeholder="Enter password"
          />
          {passwordErrorMsg && (
            <p className="text-[12px] -mt-2 text-red-600">{passwordErrorMsg}</p>
          )}
        </div>

        <div className="btn_wrapper flex justify-center items-center gap-2 mt-4">
          <Button
            handleBtnClick={handleLogin}
            className="bg-green-500 hover:bg-green-200 duration-300 basis-full px-6 py-2 text-white font-semibold rounded-full cursor-pointer text-center"
            text="Login"
          />
          <Button
            handleBtnClick={handleCloseForm}
            className="bg-red-500 hover:bg-red-200 duration-300 basis-full px-6 py-2 text-white font-semibold rounded-full cursor-pointer text-center"
            text="Cancel"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
