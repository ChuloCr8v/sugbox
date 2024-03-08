import { Modal, Select } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authData, getToken } from "../../../api";
import { hideNewEmployeeModal } from "../../../redux/modals";
import { newEmployeeFormItems } from "../data";
import Button from "./Button";
import { FormGroup } from "./SmallerComponents";
import useAddEmployee from "../hooks/useAddEmployee";
import ModalFooter from "./modals/ModalFooter";

type newEmployeeFormInput = {
  firstName: string;
  role: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

type newEmployeeModalState = {
  modals: {
    newEmployeeModal: boolean;
  };
};

type employeesState = {
  employees: {
    employees: [];
  };
};

export const newEmployeeInputValues = {
  firstName: "",
  role: "staff",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const NewEmployeeModal = () => {
  const { newEmployeeModal } = useSelector(
    (state: newEmployeeModalState) => state.modals
  );
  const [inputValue, setInputValue] = useState<newEmployeeFormInput>(
    newEmployeeInputValues
  );

  const { loading, employeeSignUp } = useAddEmployee();

  const dispatch = useDispatch();

  const handleInputChange = (e: {
    preventDefault: () => void;
    target: { name: string; value: string };
  }) => {
    e.preventDefault();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    console.log(inputValue);
  };

  const handleEmployeeSignup = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    employeeSignUp({
      signUpData: inputValue,
    });
  };

  const onClose = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(hideNewEmployeeModal());
    setInputValue(newEmployeeInputValues);
  };

  const verifyInputFields = () => {
    return Object.values(inputValue).some((value) => value === "");
  };

  const verifyPasswordsMatch =
    inputValue.password === inputValue.repeatPassword;

  const formValue = (name: string) => {
    const inputKey = Object.keys(inputValue).filter((i) => i === name);
    const correspondingValue = inputValue[inputKey[0]];
    return correspondingValue;
  };

  return (
    <>
      <Modal
        title={"Add Employee"}
        open={newEmployeeModal}
        onCancel={onClose}
        footer={
          <ModalFooter
            handleOk={handleEmployeeSignup}
            onClose={onClose}
            loading={loading}
            okText={"Submit"}
            disabled={verifyInputFields() || loading || !verifyPasswordsMatch}
          />
        }
        className=""
      >
        <form action="" className="flex flex-col items-start gap-6 pt-6">
          {newEmployeeFormItems.map((item, index) => (
            <FormGroup
              onInputChange={handleInputChange}
              required={item.required}
              label={item.label}
              inputType={item.type}
              placeholder={item.placeholder}
              name={item.name}
              value={formValue(item.name)}
              key={index}
              labelClassName="text-textcolor text-sm"
            />
          ))}
          <div className="flex flex-col items-start gap-3 w-full">
            <label className="text-textcolor text-sm font-semibold">Role</label>
            <Select
              defaultValue="staff"
              onChange={(value) => {
                setInputValue((prev) => ({ ...prev, role: value }));
                console.log(inputValue);
              }}
              className="w-full"
              options={[
                { value: "staff", label: "Staff" },
                { value: "moderator", label: "Moderator" },
              ]}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default NewEmployeeModal;
