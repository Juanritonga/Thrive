import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="flex flex-col h-screen">
      {/* Header: Fixed at the top */}
      <Header />
      
      <div className="flex flex-1">
        {/* Sidebar: Fixed on the left and scrollable */}
        <div
          className={`transition-all duration-300 ${isSidebarVisible ? "w-64" : "w-16"} overflow-x-hidden overflow-y-auto bg-white`}
        >
          <Sidebar
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
          />
        </div>

        {/* Outlet: Takes the remaining space, scrollable */}
        <div
          className={`flex-1 w-auto overflow-y-auto bg-gray-100 ${
            isSidebarVisible ? "" : ""
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
