import { ModalComponentProps } from "@/app/types";
import { Modal } from "antd";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../Button";

const ModalComponent = ({
  children,
  onOk,
  onCancel,
  open,
  className,
  title,
  footerActionBtnText,
}: ModalComponentProps) => {
  return (
    <Modal
      title={title}
      onOk={onOk}
      open={open}
      onCancel={onCancel}
      footer={[
        <div className="flex items-center justify-end gap-2 pt-4 mt-4">
          <Button
            className={"bg-primaryblue py-1 text-white hover:bg-hoverblue"}
            text={footerActionBtnText}
            disabled={false}
            onClick={onOk}
          />
          <Button
            className={
              "border-bordercolor border-[1.5px] py-1 hover:bg-bordercolor"
            }
            text={"Cancel"}
            disabled={false}
            onClick={onCancel}
          />
        </div>,
      ]}
      className={twMerge(className)}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
