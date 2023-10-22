import { ChangeEventHandler, Dispatch, ReactNode } from "react";
import { AnyAction } from "react-redux";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export interface labelProps {
  title: string;
}
export interface inputProps {
  required?: boolean;
  type: string | undefined;
  onchange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  name: string;
}

export interface formGroupProps {
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  inputType?: string;
  placeholder: string;
  name: string;
  required?: boolean;
}

export interface ModalComponentProps {
  onOk?: () => {};
  onCancel: () => void;
  children: ReactNode;
  footer?: ReactNode;
  open: boolean;
  className?: string;
  title?: ReactNode;
  footerActionBtnText?: string;
}

export interface employeeSignupProps {
  id: string;
  signUpData: {};
  dispatch: Dispatch<AnyAction>;
  router: AppRouterInstance;
  firstName: string;
  token: string;
  employees: [];
}
