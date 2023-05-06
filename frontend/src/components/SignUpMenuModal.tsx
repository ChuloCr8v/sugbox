import { useDispatch } from "react-redux";
import {
  showSignUpForm,
  showLoginForm,
  hideOrgModal,
  hideSignUpForm,
  hideLoginForm,
} from "../../redux/formSlice";
import Button from "./Button";

const SignUpMenuModal = () => {
  const dispatch = useDispatch();
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center ">
      <div
        onClick={() => dispatch(hideOrgModal())}
        className="fixed left-0 top-0 bg h-screen w-screen bg-black bg-opacity-40"
      ></div>
      <div className="w-[400px] absolute mt-4 bg-white shadow-xl rounded-lg p-8 pt-16 flex flex-col items-center gap-8">
        <div className="employee flex flex-col items-center w-full ">
          <p className="text-center font-semibold text-base inline relative z-20 bg-white px-8 py-2 border-[1.5px] rounded">
            Organization Login
          </p>
          <div className="grid grid-cols-2 gap-3 border-[1.5px] border-gray-200 py-4 pt-8 -mt-5 px-8 w-full rounded">
            <Button
              text={"Login"}
              className={"bg-blue-400 text-white w-full"}
              handleBtnClick={() => {
                dispatch(showLoginForm("Login Into Your Organization"));
                dispatch(hideSignUpForm());
              }}
            />
            <Button
              text={"Register"}
              className={"border-2 border-blue-400 text-blue-400 w-full"}
              handleBtnClick={() => {
                dispatch(showSignUpForm("Sign Up Your Organization"));
                dispatch(hideLoginForm());
              }}
            />
          </div>
        </div>
        <div className="employee flex flex-col items-center w-full ">
          <p className="text-center font-semibold text-base inline relative z-20 bg-white px-8 py-2 border-[1.5px] rounded">
            Employee Login
          </p>
          <div className="border-[1.5px] border-gray-200 py-4 pt-8 -mt-5 px-8 w-full rounded">
            <Button
              text={"Login"}
              className={"bg-blue-400 text-white w-full"}
              handleBtnClick={() =>
                dispatch(showLoginForm("Login to your employee account"))
              }
            />
          </div>
          <Button
            text={"Cancel"}
            className={
              "text-red-400 w-full border-2 border-transparent hover:border-red-400 mt-8"
            }
            handleBtnClick={() => dispatch(hideOrgModal())}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpMenuModal;
