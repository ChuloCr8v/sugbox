import React, { useState } from "react";
import Button from "./Button";
import {
  hideModal,
  hideOrgModal,
  hideSignUpForm,
  showModal,
} from "../../redux/formSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../redux/loaderSlice";

const Register = () => {
  const [orgName, setOrgName] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [orgNameErrorMsg, setOrgNameErrorMsg] = useState("");
  const [orgEmailErrorMsg, setOrgEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [repeatPasswordErrorMsg, setRepeatPasswordErrorMsg] = useState("");

  const dispatch = useDispatch();

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (orgName === "") {
      setOrgNameErrorMsg("please fill in organization name");
      return;
    } else if (orgEmail === "") {
      setOrgEmailErrorMsg("please fill in orgabization email");
      return;
    } else if (password === "") {
      setPasswordErrorMsg("please fill in password");
      return;
    } else if (password.length < 8) {
      setPasswordErrorMsg("please use 8 characters or above");
      return;
    } else if (repeatPassword === "") {
      setRepeatPasswordErrorMsg("please fill in password again");
      return;
    }
    if (password !== repeatPassword) {
      setRepeatPasswordErrorMsg("Passowords don't match");
      return;
    }

    console.log("registeration Started");
    dispatch(startLoading());

    try {
      await axios.post("http://localhost:8000/api/auth/company/new-company", {
        companyName: orgName,
        companyEmail: orgEmail,
        password: password,
      });

      dispatch(showModal("Registeration Successful"));
      setTimeout(() => {
        dispatch(hideModal());
      }, 3000);
      dispatch(hideSignUpForm());
      dispatch(hideOrgModal());
      console.log("registeration Successful");
      setOrgName("");
      setOrgEmail("");
      setPassword("");
      setRepeatPassword("");
    } catch (error) {
      console.log(error);
    }
    dispatch(stopLoading());
  };

  const handleCloseForm = () => {
    dispatch(hideSignUpForm());
  };

  const { formTitle } = useSelector((state: any) => state.form);

  return (
    <div className="login w-screen h-screen fixed top-0 left-0 flex flex-col items-center justify-center nset-0 pt-10">
      <div
        onClick={handleCloseForm}
        className="bg-black bg-opacity-50 absolute top-0 left-0 w-screen h-screen z-0"
      ></div>
      <form className="bg-white shadow-xl px-8 py-12 rounded-xl grid gap-4 min-w-[350px] z-50">
        <div className="title_wrapper flex flex-col items-center gap-1">
          <h3 className=" text-center font-semibold text-2xl capitalize">
            Welcome to suggbox
          </h3>
          <p className="text-center text-base text-blue-400">{formTitle}</p>
        </div>
        <div className="form_group flex flex-col justify-start gap-2 mt-6">
          <label htmlFor="" className="">
            Organization Name
          </label>
          <input
            type="text"
            value={orgName}
            className={`border ${
              orgNameErrorMsg ? "border-red-600" : "border- gray-200"
            } hover:border-green-400 p-2 rounded-xl`}
            onChange={(e) => {
              setOrgName(e.target.value);
              setOrgNameErrorMsg("");
            }}
            placeholder="Enter Name of Your Organization"
          />
          {orgNameErrorMsg && (
            <p className="text-[12px] -mt-2 text-red-600">{orgNameErrorMsg}</p>
          )}
        </div>
        <div className="form_group flex flex-col justify-start gap-2">
          <label htmlFor="" className="">
            Organization Email
          </label>
          <input
            type="email"
            value={orgEmail}
            className={`border ${
              orgEmailErrorMsg ? "border-red-600" : "border- gray-200"
            } hover:border-green-400 p-2 rounded-xl`}
            onChange={(e) => {
              setOrgEmail(e.target.value);
              setOrgEmailErrorMsg("");
            }}
            placeholder="Enter your Organization Email"
          />
          {orgEmailErrorMsg && (
            <p className="text-[12px] -mt-2 text-red-600">{orgEmailErrorMsg}</p>
          )}
        </div>
        <div className="form_group flex flex-col justify-start gap-2">
          <label htmlFor="" className="">
            Password
          </label>
          <input
            type="password"
            value={password}
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
        <div className="form_group flex flex-col justify-start gap-2">
          <label htmlFor="" className="">
            Repeat Password
          </label>
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => {
              setRepeatPassword(e.target.value);
              setRepeatPasswordErrorMsg("");
            }}
            className={`border ${
              passwordErrorMsg ? "border-red-600" : "border- gray-200"
            } hover:border-green-400 p-2 rounded-xl`}
            placeholder="Repeat password"
          />
          {repeatPasswordErrorMsg && (
            <p className="text-[12px] -mt-2 text-red-600">
              {repeatPasswordErrorMsg}
            </p>
          )}
        </div>
        <div className="btn_wrapper flex justify-center items-center gap-2 mt-4">
          <Button
            handleBtnClick={handleSignup}
            className="bg-green-500 hover:bg-green-200 duration-300 basis-full px-6 py-2 text-white font-semibold rounded-full"
            text={"Signup"}
          />
          <Button
            //onClick={() => dispatch(hideSignUpForm())}
            handleBtnClick={handleCloseForm}
            className="bg-red-500 hover:bg-red-200 duration-300 basis-full px-6 py-2 text-white font-semibold rounded-full"
            text={"Cancel"}
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
