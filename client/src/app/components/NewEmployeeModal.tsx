import React, { useState } from "react";
import { Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup } from "./SmallerComponents";
import Button from "./Button";
import { newEmployeeFormItems } from "../data";
import { authData, employeeSignUp, getToken } from "../../../api";
import { useRouter } from "next/navigation";
import { hideNewEmployeeModal, stopLoading } from "../../../redux/modals";

const NewEmployeeModal = () => {
  const [role, setRole] = useState("");
  const { newEmployeeModal } = useSelector((state) => state.modals);
  const { employees } = useSelector((state) => state.employees);
  const { _id } = authData({ useSelector }) || {};
  const [inputValue, setInputValue] = useState<{
    firstName: string;
    role: string;
  }>({});

  const dispatch = useDispatch();
  const token = getToken({ useSelector });

  // const handleClick = () => {
  //   dispatch(stopLoading());
  //   dispatch(hideNewEmployeeModal());
  // };
  const router = useRouter();

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const firstName = inputValue.firstName;

  const handleEmployeeSignup = (e) => {
    e.preventDefault();
    employeeSignUp({
      signUpData: inputValue,
      dispatch,
      id: _id,
      firstName,
      token,
      router,
      employees,
    });
  };

  const handleChange = (value: string) => {
    setRole(value);
    setInputValue({ ...inputValue, ["role"]: value });
    console.log(inputValue);
  };

  return (
    <>
      <Modal
        title={false}
        open={newEmployeeModal}
        onCancel={() => dispatch(hideNewEmployeeModal())}
        footer={false}
        className=""
      >
        <div className="">
          <p className="text-center font-semibold text-xl text-primaryblue mt-4">
            Add Employee
          </p>
          <form action="" className="grid gap-6 py-6">
            {newEmployeeFormItems.map((item, index) => (
              <FormGroup
                onInputChange={handleInputChange}
                label={item.label}
                inputType={item.type}
                placeholder={item.placeholder}
                name={item.name}
                key={index}
              />
            ))}
            <div className="flex flex-col items-start gap-3 -mt-2">
              <label className="text-textcolor text-sm font-semibold">
                Role
              </label>
              <Select
                defaultValue="staff"
                onChange={handleChange}
                size="large"
                className="w-full"
                options={[
                  { value: "staff", label: "Staff" },
                  { value: "Moderator", label: "Moderator" },
                ]}
              />
            </div>
            <Button
              text={"Submit"}
              className={
                "text-center bg-primaryblue text-white uppercase w-full mt-4 hover:bg-hoverblue h-12"
              }
              disabled={false}
              onClick={handleEmployeeSignup}
            />
          </form>
        </div>
      </Modal>
    </>
  );
};

export default NewEmployeeModal;
