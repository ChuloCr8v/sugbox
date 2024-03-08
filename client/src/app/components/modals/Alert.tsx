import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { hideAlert } from "../../../../redux/modals";

const PopUpAlert = () => {
  const { alert, alertText, alertType } = useSelector(
    (state: {
      modals: {
        alert: boolean;
        alertText: string;
        alertType: "error" | "success" | "info" | "warning" | undefined;
      };
    }) => state.modals
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (alert) {
      setTimeout(() => dispatch(hideAlert()), 3000);
    }
  }, [alert]);

  return (
    <div className="w-full flex justify-center ">
      <Alert
        message={alertText}
        type={alertType}
        className={twMerge(
          "w-fit capitalize font-semibold pr-6 absolute z-auto -top-20 cursor-pointer duration-300",
          alertType === "error" ? "text-red-600" : "text-green-600",
          alert && "top-20"
        )}
        onClose={() => dispatch(hideAlert())}
        onClick={() => dispatch(hideAlert())}
      />
    </div>
  );
};

export default PopUpAlert;
