import { Checkbox } from "antd";
import { FormGroup } from "./SmallerComponents";
import Button from "./Button";
import { twMerge } from "tailwind-merge";

interface Props {
  handleInputChange: any;
  formValues: Object;
  handleSubmit: () => void;
  disabled: boolean;
}

const SignupForm = (props: Props) => {
  return (
    <form
      action=""
      className="bg-white px-6 py-10 flex flex-col items-start gap-6 max-w-[400px] w-full shadow-xl rounded-md border-solid border-bordercolor border-2"
    >
      {props.formValues.map(
        (
          v: {
            required: boolean; label: string; type: string; placeholder: string; name: string 
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
          "w-full mt-5 bg-primaryblue hover:bg-hoverblue font-bold text-white uppercase py-3",
          props.disabled && "bg-gray-200 hover:bg-gray-200"
        )}
        text={"SignUp"}
        onClick={props.handleSubmit}
        disabled={props.disabled}
      />
    </form>
  );
};

export default SignupForm;
