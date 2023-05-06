import Link from "next/link";
import React, { useState } from "react";
import { FaKey, FaUser } from "react-icons/fa";
import { signOut } from "../../redux/UserSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getCurrentSuggestionsView } from "../../redux/suggestionSlice";

interface Props {
  setShowProfileMenu: (arg0: boolean) => void;
  showProfileMenu: boolean;
}

const ProfileMenu = (props: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className={`absolute top-16 -right-3 mt-1 duration-300`}>
      {props.showProfileMenu && (
        <div
          onClick={() => props.setShowProfileMenu(false)}
          className="fixed left-0 top-0 h-screen w-screen mt-20"
        ></div>
      )}
      <div
        className={`${
          props.showProfileMenu ? "scale-100" : "scale-0"
        } relative z-50 flex flex-col items-start bg-white p-4 w-[200px] shadow rounded duration-100`}
      >
        <div
          onClick={() => dispatch(getCurrentSuggestionsView("user"))}
          className="w-full menu_item group hover:bg-blue-200 flex items-center gap-2 text-base p-2 rounded-lg duration-300"
        >
          <FaUser />
          <Link href={"/my_profile"} className="">
            My Profile
          </Link>
        </div>
        <div
          onClick={async () => {
            await router.push("/");
            setTimeout(() => {
              dispatch(signOut());
            }, 100);
          }}
          className="w-full menu_item group hover:bg-blue-200 flex items-center gap-2 text-base p-2 rounded-lg duration-300"
        >
          <FaKey />
          <Link href={"/"}>Log Out</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
