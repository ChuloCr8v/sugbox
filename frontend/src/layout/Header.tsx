import Button from "@/components/Button";
import ProfileMenu from "@/components/ProfileMenu";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  showSignUpForm,
  showLoginForm,
  showOrgModal,
} from "../../redux/formSlice";
import axios from "axios";
import {
  getSearchSuggestionSuccess,
  getSuggestionSuccess,
  getSuggestionsFailure,
  getSuggestionsStart,
} from "../../redux/suggestionSlice";
import { getSuggestions } from "@/apiCalls/api";

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [search, setSearch] = useState("");

  const { currentSuggestionView } = useSelector(
    (state: any) => state.suggestions
  );

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.user);
  const { suggestions } = useSelector((state: any) => state.suggestions);

  useEffect(() => {
    if (currentUser && currentUser.data.data.isAdmin) {
      const commpanyName = currentUser.data.data.companyName.split(" ");
      let name = " ";
      for (let i = 0; i < commpanyName.length; i++) {
        name += commpanyName[i][0];
        setAdminName(name);
      }
    }
  }, []);

  const handleSearchSuggestions = async (e: {
    target: string;
    value: string;
  }) => {
    dispatch(getSuggestionsStart());

    try {
      const searchSuggestions = await axios.get(
        "http://localhost:8000/api/suggestion/all"
      );
      const res = searchSuggestions.data.filter((data: { title: string }) => {
        return data.title.toLowerCase().includes(e.target.value.toLowerCase());
      });
      console.log(res);
      dispatch(getSearchSuggestionSuccess(res));
    } catch (error) {
      console.log(error);
    }
    dispatch(getSuggestionsFailure());
  };

  return (
    <header className="flex flex-col items-center bg-white shadow-sm p-4 fixed z-50 w-full">
      <div className="w-full max-w-7xl flex justify-between items-center">
        <div className="logo_wrapper">
          <Link href={"/"}>Logo</Link>
        </div>
        <div className="search_box_wrapper hidden md:flex items-center relative">
          <input
            onChange={() => handleSearchSuggestions}
            placeholder="Search suggestions"
            type="text"
            className="border-[1.5px] border-gray-200 rounded-full w-[400px] px-4 py-1 placeholder:text-gray-300 hover:border-blue-400 duration-300"
          />
          <FaSearch className="absolute right-4 text-gray-200" />
        </div>
        <div className="relative">
          {!currentUser && (
            <div className="">
              <button
                onClick={() => dispatch(showOrgModal())}
                className="hover:text-blue-400 duration-200 cursor-pointer"
              >
                Manage Organization
              </button>
            </div>
          )}
          {currentUser && (
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="user_profile_wrapper flex gap-4 items-center cursor-pointer group"
            >
              <div className="profile_picture_wrapper bg-gray-300 flex justify-center items-center border-[1.5px] border-gray-600 h-12 w-12 p-2 rounded-full group-hover:border-blue-400 duration-300">
                {currentUser.data.data.isAdmin === true ? (
                  <p className="text-xl font-semibold group-hover:text-blue-400">
                    {adminName}
                  </p>
                ) : (
                  <p className="text-xl font-semibold group-hover:text-blue-400 uppercase">
                    {currentUser.data.data.firstName.slice(0, 1)}
                    {currentUser.data.data.lastName.slice(0, 1)}
                  </p>
                )}
              </div>
              <FaChevronDown
                className={`${
                  showProfileMenu && "rotate-180"
                } group-hover:text-blue-400 duration-200`}
              />
              {showProfileMenu && (
                <ProfileMenu
                  setShowProfileMenu={setShowProfileMenu}
                  showProfileMenu={showProfileMenu}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
