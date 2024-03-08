import { Checkbox, Modal } from "antd";
import { ChangeEvent, useState } from "react";
import { FormGroup } from "../SmallerComponents";
import { twMerge } from "tailwind-merge";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { hideNewSuggestionModal } from "../../../../redux/modals";
import { addSuggestion, authData, getToken } from "../../../../api";

const App: React.FC = (props) => {
  const [title, setTitle] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const dispatch = useDispatch();
  const token = getToken({ useSelector });
  const user = authData({ useSelector });
  const id = user?.companyId;

  const { newSuggestionModal } = useSelector((state) => state.modals);

  const handleSubmit = (e: { preventDefault: () => {} }) => {
    e.preventDefault();
    addSuggestion({
      dispatch,
      token,
      id,
      title,
      suggestion,
      isAnonymous: anonymous,
    });
  };

  return (
    <>
      <Modal
        title={"New Suggestion"}
        open={newSuggestionModal}
        onCancel={() => dispatch(hideNewSuggestionModal())}
        footer={false}
      >
        <form className="flex flex-col items-start gap-6 py-6">
          <FormGroup
            onInputChange={(e) => setTitle(e.target.value)}
            label={"Title"}
            inputType={"text"}
            placeholder={"Suggestion Title"}
            name={"title"}
          />
          <FormGroup
            onInputChange={(e) => setSuggestion(e.target.value)}
            label={"Suggestion"}
            inputType={"textarea"}
            placeholder={"Leave your suggestion"}
            name={"suggestion"}
          />
          <div className="formGroup">
            <Checkbox
              onChange={(e) => {
                setAnonymous(e.target.checked);
              }}
              className="hover:text-primaryblue duration-200"
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

export default App;
