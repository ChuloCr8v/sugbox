import { AnyAction } from "@reduxjs/toolkit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { ChangeEventHandler, Dispatch, ReactNode } from "react";

export interface labelProps {
  labelClassName?: string;
  isRequired?: boolean;
  title: string;
}
export interface inputProps {
  required?: boolean;
  type: string | undefined;
  onchange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  name: string;
  value?: string;
}

export interface formGroupProps {
  labelClassName?: string;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  inputType?: string;
  placeholder: string;
  name: string;
  required?: boolean;
  value?: string;
}

export interface ModalComponentProps {
  onOk?: () => void;
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
  signUpData: { firstName: string };
  dispatch: Dispatch<AnyAction>;
  router: AppRouterInstance;
  token: string;
  employees: [];
}

export interface suggestionProps {
  _id: number;
  user: {
    firstName: string;
    lastName: string;
    isAdmin: boolean;
  };
  isAnonymous: boolean;
  suggester: string;
  status: string;
  title: string;
  suggestion: string;
  upVotes: Array<object>;
  downVotes: Array<object>;
  comments: Array<object>;
}
