import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import Loading from "@/components/modals/Loading";
import EditSuggestionModal from "@/components/EditSuggestionModal";

interface Props {}

const Layout = ({ children }: any) => {
  const { loading } = useSelector(
    (state: { loading: { loading: boolean } }) => state.loading
  );
  const { editSuggestionForm } = useSelector(
    (state: { suggestions: { editSuggestionForm: boolean } }) =>
      state.suggestions
  );
  return (
    <div>
      <Header />
      {children}
      {loading && <Loading />}
      {editSuggestionForm && <EditSuggestionModal />}
    </div>
  );
};

export default Layout;
