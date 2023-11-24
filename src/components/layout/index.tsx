import React from "react";
import Header from "../header";

type Props = {
  children: React.ReactNode;
  isMainPage?: boolean;
};

const Layout = ({ children, isMainPage }: Props) => {
  return (
    <div
      className={`${
        isMainPage ? "justify-start" : "justify-center"
      } relative grow-1 flex h-full min-h-screen w-full flex-col items-center  px-8 py-12`}
    >
      <Header />
      {children}
    </div>
  );
};

export default Layout;
