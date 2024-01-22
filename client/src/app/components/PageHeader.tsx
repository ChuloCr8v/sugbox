import React, { ReactNode } from "react";
import Button from "./Button";
import {
  showNewEmployeeModal,
  showNewSuggestionModal,
} from "../../../redux/modals";
import { useDispatch, useSelector } from "react-redux";
import NewEmployeeModal from "./NewEmployeeModal";
import { authData } from "../../../api";
import SuggestionModal from "./modals/SuggestionModal";
import { usePathname } from "next/navigation";
import { Dropdown, MenuProps } from "antd";
import { FaPlus } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface Props {
  title: ReactNode;
}

const PageHeader = (props: Props) => {
  const dispatch = useDispatch();
  const auth = authData({ useSelector });
  // console.log(auth);

  return (
    <div className="flex items-center justify-between w-full">
      <h2 className="font-bold text-xl"> {props.title}</h2>
      <div className="btns">
        <Button
          text="add employee"
          className={twMerge("text-white", !auth?.isAdmin && "hidden")}
          type={"primary"}
          disabled={false}
          onClick={() => dispatch(showNewEmployeeModal())}
        />

        <Button
          text={
            <p className="">
              <span className="hidden md:flex">New Suggestion</span>
              <FaPlus className="md:hidden" />
            </p>
          }
          type="primary"
          disabled={false}
          onClick={() => dispatch(showNewSuggestionModal())}
          className={twMerge(
            "text-white rounded md:rounded-full py-2",
            auth?.isAdmin && "hidden"
          )}
        />
      </div>
    </div>
  );
};

export default PageHeader;
