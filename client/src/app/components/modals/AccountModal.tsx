import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { hideAccountModal } from "../../../../redux/modals";
import Button from "../Button";
import { setLoginRole } from "../../../../redux/auth";

const AccountModal = () => {
  const dispatch = useDispatch();
  const { accountModal } = useSelector(
    (state: { modals: { accountModal: boolean } }) => state.modals
  );

  const btnProps = [
    {
      title: "Login",
      url: "/login",
    },
    {
      title: "Sign Up",
      url: "/signup",
    },
  ];

  return (
    <Modal
      title={false}
      onOk={() => dispatch(hideAccountModal())}
      open={accountModal}
      onCancel={() => dispatch(hideAccountModal())}
      className=" flex justify-center items-center"
      footer={false}
    >
      <div className="admin_signIn pb-6">
        <p className="text-center font-bold text-lg">Admin</p>
        <div className="btn_wrappers mt-6 flex items-center gap-4">
          {btnProps.map((b, index) => (
            <Button
              className={twMerge(
                "bg-primaryblue text-white font-bold border-solid border-[1.5px] hover:bg-transparent hover:text-primaryblue hover:border-primaryblue",
                b.title.toLowerCase().includes("sign") &&
                  "bg-transparent border-[#0a96cc] text-primaryblue hover:bg-primaryblue hover:text-white"
              )}
              text={b.title}
              key={index}
              onClick={() => {
                dispatch(hideAccountModal());
                dispatch(setLoginRole("admin"));
              }}
              url={b.url}
              link
              disabled={false}
            />
          ))}
        </div>
      </div>
      <div className="empoyee_signin pt-6 border-t border-blue-200">
        <p className="text-center font-bold text-lg">Employee</p>
        <div className="btn_wrappers mt-4 flex items-center justify-center gap-4">
          <Button
            className="bg-primaryblue text-white font-bold border-solid border-[1.5px] hover:bg-transparent hover:text-primaryblue hover:border-primaryblue"
            text={"Login"}
            link
            url="/login"
            disabled={false}
            onClick={() => {
              dispatch(setLoginRole("employee"));
              dispatch(hideAccountModal());
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AccountModal;
