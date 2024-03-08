"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { approveSingleSuggestion } from "../../../../redux/suggestion";
import UseGetAuth from "../useGetAuth";
import useGetSuggestion from "../useGetSuggestion";

type Props = {
  setShowActionModal: (arg: boolean) => null;
  id: string;
};

const useApproveSuggestion = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getSuggestion, setSuggestion, suggestion } = useGetSuggestion();
  const { token } = UseGetAuth();
  const dispatch = useDispatch();

  const approveSuggestion = async () => {
    console.log("approving");
    setIsLoading(true);
    try {
      const newData = await axios.put(
        `http://localhost:8000/api/suggestion/approve-suggestion/${props.id}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log("Suggestion Approved Successfully");
      dispatch(approveSingleSuggestion(props.id));
      console.log("finished");
      setSuggestion(newData.data.approve);
      console.log(newData.data.approve);
      console.log(suggestion);
      getSuggestion(props.id);

      props.setShowActionModal(false);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return { isLoading, approveSuggestion };
};

export default useApproveSuggestion;
