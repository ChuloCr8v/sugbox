import { Checkbox } from "antd";
import { FormGroup } from "./SmallerComponents";
import Button from "./Button";
import { loginFormValues } from "../data";
import { ChangeEventHandler, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
  handleSubmit: (arg0: {}) => void;
}

const LoginForm = (props: Props) => {
  const [inputValue, setInputValue] = useState({});

  return (
    <form
      action=""
      className="bg-white px-6 py-10 flex flex-col items-start gap-6 max-w-[400px] w-full shadow-xl rounded-md border-solid border-bordercolor border-2"
    >
      {loginFormValues.map((v, index) => (
        <FormGroup
          onInputChange={props.handleInputChange}
          label={v.label}
          inputType={v.type}
          placeholder={v.placeholder}
          name={v.name}
          key={index}
        />
      ))}

      <div className="w-full flex justify-between items-center">
        <Checkbox
          onChange={() => {}}
          className="hover:text-primaryblue duration-200 font-semibold text-sm"
        >
          Remember Me
        </Checkbox>
        <p className="hover:text-primaryblue duration-200 cursor-pointer font-semibold text-sm text-textcolor">
          Forgot Password
        </p>
      </div>
      <Button
        className={twMerge(
          "w-full mt-6 bg-primaryblue hover:bg-hoverblue font-bold text-white uppercase py-3",
          props.disabled && "bg-gray-200 hover:bg-gray-200"
        )}
        text={"Login"}
        onClick={props.handleSubmit}
        disabled={props.disabled}
      />
    </form>
  );
};

export default LoginForm;
