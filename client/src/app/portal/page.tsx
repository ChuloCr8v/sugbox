"use client";

import { Radio } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import { setLoginRole } from "../../../redux/auth";
import Button from "../components/Button";

type Props = {};

const Portal = (props: Props) => {
  const [isChecked, setIsChecked] = useState(0);

  const router = useRouter();
  const dispatch = useDispatch();

  const portalProps = [
    {
      id: 1,
      label: "Admin ",
      loginRole: "admin",
      icon: <FaUser />,
    },
    {
      id: 2,
      label: "Employee",
      loginRole: "employee",
      icon: <FaUsers />,
    },
  ];

  const handleSignInRole = (id: number, loginRole: string) => {
    setIsChecked(id);
    dispatch(setLoginRole(loginRole));
  };

  const handleLogin = () => {
    router.push("/login");
  };

  console.log(isChecked);

  return (
    <div className="portal bg-blue-50 w-screen min-h-screen flex flex-col  items-center px-4">
      <div className="relative h-full flex flex-col items-center">
        <div className="portal-header text-white w-screen h-1/2 mt-[55px] flex flex-col justify-center items-center">
          <div className="blur-bg"></div>
          <h2 className="font-semibold text-center text-4xl">
            SuggBox{" "}
            <span className="block text-[13px] italic">
              Your No.1 Digital Suggestion Box
            </span>
          </h2>
          <p className="text-center mt-2 mb-6">Choose Portal</p>
        </div>

        <div className="grid grid-cols-2 gap-4 -mt-24 w-fit">
          {portalProps.map((p, index) => (
            <div
              onClick={() => handleSignInRole(p.id, p.loginRole)}
              className={twMerge(
                "card bg-blue-50 cursor-pointer px-4 relative flex flex-col items-center justify-center h-[200px] lg:h-[300px] xl:h-[300px] w-[170px] lg:w-[350px] xl:w-[200px]  rounded-lg border-2 border-gray-200 duration-200",
                isChecked === p.id && "border-primaryblue"
              )}
              key={index}
            >
              <Radio
                checked={isChecked === p.id}
                className="align-self-end justify-self-end absolute top-4 right-4"
              />
              <div
                className={twMerge(
                  "bg-gray-200 rounded-full p-2 text-2xl lg:text-5xl xl:text-2xl text-gray-500 duration-200",
                  p.id === isChecked && "text-primaryblue  duration-200"
                )}
              >
                {p.icon}
              </div>
              <p
                className={twMerge(
                  "text-black font-semibold mt-2 duration-200 lg:text-2xl xl:text-base",
                  p.id === isChecked && "text-primaryblue"
                )}
              >
                {p.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 uppercase">
          <Button
            text={"Login"}
            type="primary"
            className="w-[244px] py-3 uppercase "
            disabled={isChecked === 0}
            onClick={handleLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default Portal;
