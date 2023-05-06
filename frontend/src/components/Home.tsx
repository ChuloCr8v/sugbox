import { ContainerFilled } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTrash, FaSpinner } from "react-icons/fa";
import SuggestionViewCard from "./SuggestionViewCard";
import SuggestionCard from "./SuggestionCard";
import NewSuggestionModal from "./modals/NewSuggestionModal";
import Button from "./Button";
import SuggestionMenu from "./SuggestionMenu";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestions } from "@/apiCalls/api";
import suggestionSlice, {
  getSuggestionSuccess,
} from "../../redux/suggestionSlice";
import { startLoading } from "../../redux/loaderSlice";

interface Props {
  title: string;
  suggestion: string;
  suggester: string;
  upvotes: number;
  downvotes: number;
  status: string;
  date: Date;
}

const Home = () => {
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);
  const [currentSuggestionsDisplay, setCurrentSuggestionsDisplay] =
    useState("total");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Props[]>([]);
  const { currentUser } = useSelector((state: any) => state.user);
  const { currentSuggestionView } = useSelector(
    (state: any) => state.suggestions
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
  }, [currentSuggestionView]);

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
    <div className="w-full relative flex flex-col justify-center items-center py-10 px-4">
      <div className="wrapper w-full max-w-7xl">
        <div className="btn-wrapper flex flex-col sm:flex-row items-left md:items-center justify-between mt-16">
          <div className=" flex flex-col items-center sm:items-start">
            <h2 className="name text-xl text-center font-semibold">
              Hello{" "}
              <span className="text-blue-400 font-bold capitalize">
                {currentUser.data.data.firstName}
              </span>{" "}
            </h2>
            <p className="">What ideas do you have today?</p>
          </div>
          <Button
            text={"New Suggestion"}
            handleBtnClick={handleShowSuggestionForm}
            className={
              "bg-blue-400 text-white hover:bg-opacity-50 self-center mt-4 md:mt-0"
            }
          />
        </div>
        <div className="suggestion_menu_wrapper">
          <SuggestionMenu />
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
        <div className="suggestions_wrapper mt-10 grid lg:grid-cols-2 gap-6">
          {filteredSuggestions.map((data, index) => (
            <SuggestionCard key={index} data={data} />
          ))}
        </div>
      </div>
      {showSuggestionBox && (
        <NewSuggestionModal setShowSuggestionBox={setShowSuggestionBox} />
      )}
    </div>
  );
};

export default Home;
