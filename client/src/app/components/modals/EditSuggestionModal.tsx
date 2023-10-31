import { Checkbox, Modal } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { FormGroup } from "../SmallerComponents";
import { twMerge } from "tailwind-merge";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import {
  hideEditSuggestionModal,
  hideNewSuggestionModal,
} from "../../../../redux/modals";
import { authData, getToken } from "../../../../api";
import { editSuggestion } from "@/app/api/suggestions";

const EditSuggestionModal = (props) => {
  const [title, setTitle] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [anonymous, setAnonymous] = useState("");

  const { editSuggestionModal } = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const token = getToken({ useSelector });
  const user = authData({ useSelector });
  const id = editSuggestionModal._id;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      title === editSuggestionModal.title &&
      anonymous === editSuggestionModal.isAnonymous &&
      suggestion === editSuggestionModal.suggestion
    ) {
      dispatch(hideEditSuggestionModal());
      return;
    }

    if (title === "") {
      setTitle(editSuggestionModal.title);
    }
    if (suggestion === "") {
      setSuggestion(editSuggestionModal.suggestion);
    }

    editSuggestion({
      dispatch,
      title,
      suggestion,
      token,
      isAnonymous: anonymous,
      id,
    });
  };

  useEffect(() => {
    setTitle(editSuggestionModal.title);
    setSuggestion(editSuggestionModal.suggestion);
    setAnonymous(editSuggestionModal.isAnonymous);
  }, [editSuggestionModal]);

  return (
    <>
      <Modal
        title={"Edit Suggestion"}
        open={editSuggestionModal}
        onCancel={() => dispatch(hideEditSuggestionModal())}
        footer={false}
      >
        <form className="flex flex-col items-start gap-6 py-6">
          <FormGroup
            onInputChange={(e) => setTitle(e.target.value)}
            label={"Title"}
            inputType={"text"}
            placeholder={"Suggestion Title"}
            name={"title"}
            value={title}
          />
          <FormGroup
            onInputChange={(e) => setSuggestion(e.target.value)}
            label={"Suggestion"}
            inputType={"textarea"}
            placeholder={"Leave your suggestion"}
            name={"suggestion"}
            value={suggestion}
          />
          <div className="formGroup">
            <Checkbox
              onChange={(e) => {
                setAnonymous(!anonymous);
              }}
              className="hover:text-primaryblue duration-200"
              checked={anonymous}
            >
              Suggest Anonymously
            </Checkbox>
          </div>
          <div className="w-full">
            <Button
              className={twMerge(
                "w-full mt-6 bg-primaryblue hover:bg-hoverblue font-bold text-white uppercase py-3",
                props.disabled && "bg-gray-200 hover:bg-gray-200"
              )}
              text={"Submit"}
              onClick={handleSubmit}
              disabled={false}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditSuggestionModal;
