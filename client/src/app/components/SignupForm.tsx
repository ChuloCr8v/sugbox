import { Checkbox } from "antd";
import { FormGroup } from "./SmallerComponents";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { ChangeEventHandler } from "react";

interface Props {
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  formValues: {
    label: string;
    type: string;
    placeholder: string;
    name: string;
    required: boolean;
  }[];
  handleSubmit: (e: { preventDefault: () => void }) => void;
  disabled: boolean;
  isLoading: boolean;
}

const SignupForm = (props: Props) => {
  return (
    <form
      action=""
      className="bg-morph px-6 py-10 flex flex-col items-start gap-6 max-w-[400px] w-full shadow-xl rounded-md border-solid border-bordercolor border-2"
    >
      {props.formValues.map(
        (
          v: {
            required: boolean;
            label: string;
            type: string;
            placeholder: string;
            name: string;
          },
          index: React.Key
        ) => (
          <FormGroup
            key={index}
            onInputChange={props.handleInputChange}
            label={v.label}
            inputType={v.type}
            placeholder={v.placeholder}
            name={v.name}
            required={v.required}
          />
        )
      )}

      <Button
        className={twMerge(
          "w-full  bg-primaryblue hover:bg-hoverblue font-bold text-white uppercase py-3",
          props.disabled && "bg-gray-200 hover:bg-gray-200"
        )}
        text={"SignUp"}
        onClick={props.handleSubmit}
        disabled={props.disabled}
        url={""}
        loading={props.isLoading}
      />
      <div className="place-self-center">
        <span className="text-center text-white">
          Already have an account? Login{" "}
          <Link
            href="/login"
            className="underline font-bold hover:text-[#031932] duration-200"
          >
            here
          </Link>
        </span>
      </div>
    </form>
  );
};

export default SignupForm;
