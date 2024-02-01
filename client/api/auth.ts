import { employeeSignupProps } from "@/app/types";
import axios from "axios";
import { startLogin, loginSuccess, loginFailure } from "../redux/auth";
import { addEmployeeFailure, addEmployeeStart, addEmployeeSuccess } from "../redux/employees";
import { startLoading, showAlert, stopLoading, hideAlert, hideNewEmployeeModal } from "../redux/modals";
import { NextRouter } from "next/router";
import { Dispatch, Props } from "react";
import { AnyAction } from "redux";

interface signUpProps {

    signUpData: {};
    loginData: {};
    dispatch: Dispatch<AnyAction>;
    router: NextRouter;
    companyName: string;

}

export const signUp = async ({
    signUpData,
    dispatch,
    router,
    companyName,
}: signUpProps) => {
    dispatch(addEmployeeStart());
    try {
        await axios.post(
            `http://localhost:8000/api/auth/company/new-company`,
            signUpData
        );

        dispatch(
            showAlert({
                alertText: `${companyName} registered successfully`,
                alertType: "success",
            })
        );
        router.push("/login");
        console.log("Registeration Successfull");
    } catch (error) {
        dispatch(addEmployeeFailure());
        console.log(error);
        dispatch(
            showAlert({
                alertText: `Unable to register ${companyName}! Please try again.`,
                alertType: "error",
            })
        );
    }
    setTimeout(() => dispatch(hideAlert()), 3000);
};

export const signIn = async ({ dispatch, loginData, router }: signUpProps) => {
    dispatch(startLogin());

    try {
        const authDetails = await axios.put(
            "http://localhost:8000/api/auth/company/login-company",

            loginData
        );
        const auth = authDetails.data;
        localStorage.setItem("auth", auth);

        dispatch(loginSuccess(auth));

        dispatch(
            showAlert({
                alertText: `Login Successfull`,
                alertType: "success",
            })
        );

        localStorage.setItem("auth", auth);

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
    dispatch(loginFailure());
    setTimeout(() => dispatch(hideAlert()), 3000);
};

export const employeeSignIn = async ({
    dispatch,
    loginData,
    router,
}: signUpProps) => {

    dispatch(startLogin());

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

        localStorage.setItem("auth", auth);
        router.push("/dashboard");
    } catch (error) {
        dispatch(loginFailure())
        console.log("error");
        dispatch(
            showAlert({
                alertText: `Unable to login. Try again.`,
                alertType: "error",
            })
        );
    }
    setTimeout(() => dispatch(hideAlert()), 3000);
};

export const employeeSignUp = async ({
    signUpData,
    dispatch,
    router,
    firstName,
    id,
    token,
}: employeeSignupProps) => {
    dispatch(startLogin());
    try {
        const employees = await axios.post(
            `http://localhost:8000/api//auth/employee/new-employee/${id}`,
            signUpData,
            {
                headers: {
                    Authorization: `${token}`,
                    // You can add other headers if needed
                    // 'Custom-Header': 'value',
                },
            }
        );

        dispatch(addEmployeeSuccess(employees.data.employee));
        dispatch(
            showAlert({
                alertText: `${firstName} registered successfully`,
                alertType: "success",
            })
        );
        dispatch(hideNewEmployeeModal());
        console.log("Registeration Successfull");
    } catch (error) {
        console.log(error);
        dispatch(
            showAlert({
                alertText: `Unable to register ${firstName}! Please try again.`,
                alertType: "error",
            })
        );
    }
    dispatch(loginFailure());
    setTimeout(() => dispatch(hideAlert()), 3000);
};