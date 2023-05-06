import React from "react";
import Header from "./Header";

interface Props {}

const Layout = ({ children }: any) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
