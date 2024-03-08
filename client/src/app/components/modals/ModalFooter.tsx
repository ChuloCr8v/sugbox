import Button from "../Button";

interface modalFooterProps {
  handleOk: (arg0: {}) => void;
  onClose: (arg0: {}) => void;
  loading: boolean;
  okText: string;
  disabled: boolean;
}

const ModalFooter = (props: modalFooterProps) => {
  return (
    <div className="place-self-end flex items-center justify-center gap-4 w-full pb-4">
      <Button
        text={"Cancel"}
        className={
          "place-self-end text-center border border-gray-400 text-gray-400  uppercase  w-full mt-4 hover:border-hoverblue hover:text-hoverblue"
        }
        disabled={false}
        onClick={props.onClose}
      />
      <Button
        loading={props.loading}
        text={props.okText}
        className={
          "place-self-end text-center bg-primaryblue text-white uppercase w-full mt-4 hover:bg-hoverblue"
        }
        disabled={props.disabled}
        onClick={props.handleOk}
      />
    </div>
  );
};

export default ModalFooter;
