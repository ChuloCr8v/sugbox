import { getSuggestions } from "@/apiCalls/api";
import EditSuggestionModal from "@/components/EditSuggestionModal";
import ProfileSuggestionCard from "@/components/ProfileSuggestionCard";
import SuggestionCard from "@/components/SuggestionCard";
import SuggestionMenu from "@/components/SuggestionMenu";
import SuggestionViewCard from "@/components/SuggestionViewCard";
import { ContainerFilled } from "@ant-design/icons";
import { Props } from "next/script";
import React, { useEffect, useState } from "react";
import { FaSpinner, FaCheck, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentSuggestionsView } from "../../redux/suggestionSlice";
import Loading from "@/components/modals/Loading";
import NewSuggestionModal from "@/components/modals/NewSuggestionModal";
import Button from "@/components/Button";

const EmployeeProfile = () => {
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);
  const [currentSuggestionsDisplay, setCurrentSuggestionsDisplay] =
    useState("total");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Props[]>([]);
  const { currentUser } = useSelector((state: any) => state.user);
  const { currentSuggestionView } = useSelector(
    (state: any) => state.suggestions
  );
  const { editSuggestionForm } = useSelector(
    (state: { suggestions: { editSuggestionForm: boolean } }) =>
      state.suggestions
  );
  const { loading } = useSelector(
    (state: { loading: { loading: boolean } }) => state.loading
  );

  const dispatch = useDispatch();

  const handleShowSuggestionForm = () => {
    setShowSuggestionBox(true);
  };

  const { suggestions } = useSelector((state: any) => state.suggestions);

  useEffect(() => {
    getSuggestions({
      dispatch,
      currentUser,
      currentSuggestionView,
      id: "",
    });
  }, [suggestions]);

  useEffect(() => {
    if (currentSuggestionsDisplay === "total") {
      setFilteredSuggestions(suggestions);
    } else if (currentSuggestionsDisplay.toLocaleLowerCase() === "pending") {
      const pendingSuggestions = suggestions.filter(
        (data: { status: string }) => data.status.toLowerCase() === "pending"
      );
      setFilteredSuggestions(pendingSuggestions);
    } else if (currentSuggestionsDisplay.toLocaleLowerCase() === "accepted") {
      const acceptedSuggestions = suggestions.filter(
        (data: { status: string }) => data.status.toLowerCase() === "accepted"
      );
      setFilteredSuggestions(acceptedSuggestions);
    } else if (currentSuggestionsDisplay.toLocaleLowerCase() === "rejected") {
      const rejectedSuggestions = suggestions.filter(
        (data: { status: string }) => data.status.toLowerCase() === "rejected"
      );
      setFilteredSuggestions(rejectedSuggestions);
    } else {
      setFilteredSuggestions(suggestions);
    }
  }, [currentSuggestionsDisplay, suggestions]);

  const handleSuggestionsView = (value: string) => {
    setCurrentSuggestionsDisplay(value);
  };

  const pendingSuggestions = suggestions.filter(
    (data: { status: string }) => data.status.toLowerCase() === "pending"
  );
  const acceptedSuggestions = suggestions.filter(
    (data: { status: string }) => data.status.toLowerCase() === "accepted"
  );
  const rejectedSuggestions = suggestions.filter(
    (data: { status: string }) => data.status.toLowerCase() === "rejected"
  );

  const cardDetail = [
    {
      title: "Total",
      number: suggestions.length,
      icon: (
        <ContainerFilled className="text-3xl text-white group-hover:text-blue-400 duration-300 -mt-2" />
      ),
    },
    {
      title: "Pending",
      number: pendingSuggestions.length,
      icon: (
        <FaSpinner className="text-3xl text-white group-hover:text-blue-400 duration-300" />
      ),
    },
    {
      title: "Accepted",
      number: acceptedSuggestions.length,
      icon: (
        <FaCheck className="text-3xl text-white group-hover:text-blue-400 duration-300" />
      ),
    },
    {
      title: "Rejected",
      number: rejectedSuggestions.length,
      icon: (
        <FaTrash className="text-3xl text-white group-hover:text-blue-400 duration-300" />
      ),
    },
  ];

  return (
    <div className="pt-28 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl flex flex-col">
        <div className="flex justify-between items-center">
          <div className="">
            {" "}
            <h2 className="text-3xl font-semibold">My Profile</h2>
            <p className="capitalize text-blue-400">
              {currentUser.data.data.firstName +
                " " +
                currentUser.data.data.lastName}
            </p>
          </div>
          <Button
            text={"New Suggestion"}
            handleBtnClick={handleShowSuggestionForm}
            className={
              "bg-blue-400 text-white hover:bg-opacity-50 self-center mt-4 md:mt-0"
            }
          />
        </div>
        <div className="cards_wrapper hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
          {cardDetail.map((data, index) => (
            <SuggestionViewCard
              number={data.number}
              title={data.title}
              icon={data.icon}
              key={index}
              handleClick={handleSuggestionsView}
              currentSuggestionsDisplay={currentSuggestionsDisplay}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-10">
          {" "}
          <h2 className="text-xl font-semibold">My Suggestions</h2>
          <p className="capitalize text-xl text-blue-400">
            ({filteredSuggestions.length})
          </p>
        </div>
        <div className="suggestions_wrapper mt-6 grid lg:grid-cols-2 gap-6">
          {filteredSuggestions.map((data, index) => (
            <ProfileSuggestionCard data={data} />
          ))}
        </div>
      </div>
      {editSuggestionForm && <EditSuggestionModal />}
      {!loading && <Loading />}
      {showSuggestionBox && (
        <NewSuggestionModal setShowSuggestionBox={setShowSuggestionBox} />
      )}
    </div>
  );
};

export default EmployeeProfile;
