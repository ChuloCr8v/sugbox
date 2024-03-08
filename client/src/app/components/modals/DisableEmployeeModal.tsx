import useDeleteEmployee from "@/app/hooks/useDisableEmployee";
import { Modal } from "antd";
import { FaTrashAlt } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  setEmployeeData: (arg: Object) => void;
  employeeData: { firstName: string; lastName: string; _id: string };
};

type modalFooterProps = {
  handleCancel: () => void;
  handleOk: () => void;
  okText: string;
};

const ModalFooter = (props: modalFooterProps) => {
  return (
    <div className="flex items-center gap-4 justify-end">
      <button
        className="border border-bordercolor text-gray-500 px-8 py-0.5 rounded-lg hover:border-black hover:text-black"
        onClick={props.handleCancel}
      >
        Cancel
      </button>
      <button
        className="border bg-red-500 text-white hover:opacity-90 px-8 py-0.5 rounded-lg duration-200"
        onClick={props.handleOk}
      >
        {props.okText}
      </button>
    </div>
  );
};

const DisableEmployeeModal = (props: Props) => {
  const { isLoading, deleteEmployee } = useDeleteEmployee(
    props.setEmployeeData
  );

  const id = props.employeeData._id;

  const username =
    props.employeeData.firstName + " " + props.employeeData.lastName;

  const handleDeleteEmployee = () => {
    deleteEmployee(id);
  };

  return (
    <Modal
      onCancel={() => props.setEmployeeData({})}
      open={props.isOpen}
      title="Disable Employee"
      footer={
        <ModalFooter
          handleCancel={() => props.setEmployeeData({})}
          handleOk={handleDeleteEmployee}
          okText={"Disable"}
        />
      }
    >
      <div className="flex flex-col items-center justify-center pt-6">
        <div className="p-4 bg-red-100 text-2xl text-red-500 rounded-full">
          <FaTrashAlt />
        </div>
        <p className="text-center mt-2">
          Disable{" "}
          <span className="text-primaryblue font-semibold ">{username}?</span>{" "}
        </p>
      </div>
    </Modal>
  );
};

export default DisableEmployeeModal;
