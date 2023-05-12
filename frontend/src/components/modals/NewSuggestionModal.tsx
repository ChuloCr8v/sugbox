import React, { useState } from "react";
import Button from "../Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/loaderSlice";
import { hideModal, showModal } from "../../../redux/formSlice";
import { getSuggestions } from "@/apiCalls/api";

interface Props {
  setShowSuggestionBox: (arg0: boolean) => void;
}

const NewSuggestionModal = (props: Props) => {
  const [suggestionTitle, setSuggestionTitle] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const { currentUser } = useSelector((state: any) => state.user);
  const { currentSuggestionView } = useSelector(
    (state: any) => state.suggestions
  );

  const id = currentUser.data.data.companyId;
  const access_token = currentUser.data.token;

  const dispatch = useDispatch();

  const handleSubmitSuggestion = async () => {
    dispatch(startLoading());
    try {
      const addSuggestion = await axios.post(
        `http://localhost:8000/api/suggestion/new-suggestion/${id}`,
        {
          title: suggestionTitle,
          suggestion: suggestion,
          isAnonymous: anonymous,
        },
        {
          headers: {
            Authorization: access_token,
          },
        }
      );

      getSuggestions({
        currentUser,
        currentSuggestionView,
        dispatch,
        id: "",
      });

      dispatch(showModal("Suggestion Added Succefully"));
      setTimeout(() => {
        dispatch(hideModal());
      }, 2000);
      props.setShowSuggestionBox(false);
    } catch (error) {
      console.log(error);
    }
    dispatch(stopLoading());
  };

  return (
    <form className="fixed top-40 md:w-[400px]">
      <div
        onClick={() => props.setShowSuggestionBox(false)}
        className="fixed left-0 top-0 bg-black bg-opacity-50 h-screen w-screen"
      ></div>
      <div className="wrapper bg-white px-8 py-12 rounded-xl shadow relative z-20">
        <p className="title text-xl text-blue-400 text-center font-semibold capitalize">
          Please leave your suggestion
        </p>
        <div className="form_group flex flex-col gap-2 mt-12">
          <label htmlFor="body" className="text-base font-semibold">
            Title
          </label>
          <input
            type="text"
            className="border-[1.5px] border-gray-300 rounded-md px-4 py-2 hover:border-blue-400 duration-300"
            placeholder="Whats your suggestion about?"
            onChange={(e) => setSuggestionTitle(e.target.value)}
          />
        </div>

        <div className="form_group flex flex-col gap-2 mt-4">
          <label htmlFor="body" className="text-base font-semibold">
            Suggestion
          </label>
          <textarea
            className="border-[1.5px] border-gray-300 rounded-md px-4 py-2 hover:border-blue-400 duration-300"
            placeholder="Provide more details"
            onChange={(e) => setSuggestion(e.target.value)}
          />
        </div>
        <div className="form_group flex gap-2 mt-6">
          <input
            type="checkbox"
            className="border-[1.5px] border-gray-300 rounded-md px-4 py-2 hover:border-blue-400 duration-300"
            onChange={() => setAnonymous(!anonymous)}
          />
          <p className="text-sm text-blue-400">Suggest Anonymously</p>
        </div>
        <div className="btn_wrapper mt-6 flex items-center justify-between gap-3">
          <Button
            handleBtnClick={handleSubmitSuggestion}
            text="Submit"
            className={"text-center bg-blue-400 text-white uppercase w-full"}
          />
          <Button
            handleBtnClick={() => props.setShowSuggestionBox(false)}
            text="Cancel"
            className={"text-center bg-red-400 text-white uppercase w-full"}
          />
        </div>
      </div>
    </form>
  );
};

export default NewSuggestionModal;
