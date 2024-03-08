import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface authProps {
  auth: {
    auth: {
      token: string;
      others: {
        companyEmail: string;
        createdAt: string;
        companyName: string;
        isAdmin: boolean;
        _id: string;
      };
    };
  };
}

const UseGetAuth = () => {
  const { auth } = useSelector((state: authProps) => state.auth);

  const token = auth?.token;
  const others = auth?.others;
  const id = auth.others?._id;
  const isAdmin = auth.others?.isAdmin;

  return { token, others, id, auth, isAdmin };
};

export default UseGetAuth;
