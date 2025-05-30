import React from "react";
import SideBarMenu from "./components/SideBarMenu";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="d-flex">
      <SideBarMenu />
      <div className="flex-grow-1 p-4">
        <Outlet /> {/* <-- This is where child route components render */}
      </div>
    </div>
  );
};

export default AppLayout;
