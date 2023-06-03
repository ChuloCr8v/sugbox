import React, { useState } from "react";
import Button from "./Button";
import {
  getSuggestionSuccess,
  hideEditSuggestionForm,
} from "../../redux/suggestionSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { startLoading, stopLoading } from "../../redux/loaderSlice";
import { getSuggestions } from "@/apiCalls/api";

const EditSuggestionModal = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newSuggestion, setNewSuggestion] = useState("");
  const [newData, setNewData] = useState("");

  const dispatch = useDispatch();

  const { editSuggestionData } = useSelector(
    (state: {
      suggestions: {
        editSuggestionData: { title: string; suggestion: string; _id: string };
      };
    }) => state.suggestions
  );
  const { currentUser } = useSelector(
    (state: { user: { currentUser: { data: { token: string } } } }) =>
      state.user
  );

  const handleEditSuggestion = async () => {
    dispatch(startLoading());

    try {
      if (newTitle.length && !newSuggestion.length) {
        const editSuggestion = await axios.put(
          `http://localhost:8000/api/suggestion/edit-suggestion/${editSuggestionData._id}`,
          {
            title: newTitle,
          },
          {
            headers: {
              Authorization: currentUser.data.token,
            },
          }
        );
        dispatch(getSuggestionSuccess(editSuggestion));
      } else if (!newTitle.length && newSuggestion.length) {
        const editSuggestion = await axios.put(
          `http://localhost:8000/api/suggestion/edit-suggestion/${editSuggestionData._id}`,
          {
            suggestion: newSuggestion,
          },
          {
            headers: {
              Authorization: currentUser.data.token,
            },
          }
        );
        dispatch(getSuggestionSuccess(editSuggestion));
      } else {
        const editSuggestion = await axios.put(
          `http://localhost:8000/api/suggestion/edit-suggestion/${editSuggestionData._id}`,
          {
            title: newTitle,
            suggestion: newSuggestion,
          },
          {
            headers: {
              Authorization: currentUser.data.token,
            },
          }
        );
        dispatch(getSuggestionSuccess(editSuggestion));
      }

      dispatch(hideEditSuggestionForm());
      getSuggestions({
        dispatch,
        currentUser,
        id: "",
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(stopLoading());
  };

  return (
    <div className="fixed flex items-center justify-center h-screen w-screen top-0 left-0 z-40">
      <div
        className="h-screen w-screen bg-black bg-opacity-30 fixed top-0 left-0 z-0"
        onClick={() => dispatch(hideEditSuggestionForm())}
      ></div>
      <div className="form bg-white shadow relative z-50 rounded-xl p-6 py-10 min-w-[400px] grid gap-4">
        <h2 className="font-semibold text-xl text-center">
          Editing{" "}
          <span className="text-blue-400">{editSuggestionData.title}</span>
        </h2>
        <div className="form_group flex flex-col items-start gap-2">
          <label htmlFor="" className="font-semibold">
            Title
          </label>
          <input
            type="text"
            placeholder={editSuggestionData.title}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border-gray-200 border rounded w-full p-2"
          />
        </div>
        <div className="form_group flex flex-col items-start gap-2">
          <label htmlFor="" className="font-semibold">
            Suggestion
          </label>
          <textarea
            rows={5}
            value={newSuggestion}
            placeholder={editSuggestionData.suggestion}
            onChange={(e) => setNewSuggestion(e.target.value)}
            className="border-gray-200 border rounded w-full p-2"
          />
        </div>
        <div className="btn">
          <Button
            text={"Submit"}
            handleBtnClick={handleEditSuggestion}
            className="bg-blue-400 text-white  mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default EditSuggestionModal;
