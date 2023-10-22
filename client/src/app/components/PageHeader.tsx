import React from "react";
import Button from "./Button";
import {
  showNewEmployeeModal,
  showNewSuggestionModal,
} from "../../../redux/modals";
import { useDispatch, useSelector } from "react-redux";
import NewEmployeeModal from "./NewEmployeeModal";
import { authData } from "../../../api";
import SuggestionModal from "./modals/SuggestionModal";

interface Props {
  title: string;
}

const PageHeader = (props: Props) => {
  const dispatch = useDispatch();
  const auth = authData({ useSelector });
  const user = localStorage.getItem("auth");

  return (
    <div className="flex items-center justify-between w-full">
      <h2 className="font-bold text-xl"> {props.title}</h2>
      <div className="btns">
        {auth?.isAdmin && (
          <Button
            text="add employee"
            className={"bg-primaryblue hover:bg-hoverblue w-40 py-1 text-white"}
            disabled={false}
            onClick={() => dispatch(showNewEmployeeModal())}
          />
        )}
        {!auth?.isAdmin && (
          <Button
            text="New Suggestion"
            className={"bg-primaryblue hover:bg-hoverblue w-40 py-1 text-white"}
            disabled={false}
            onClick={() => dispatch(showNewSuggestionModal())}
          />
        )}
      </div>
    </div>
  );
};

export default PageHeader;
