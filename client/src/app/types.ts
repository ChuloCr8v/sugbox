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
  value?: string;
}

export interface formGroupProps {
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
  signUpData: {};
  dispatch: Dispatch<AnyAction>;
  router: AppRouterInstance;
  firstName: string;
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
