import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`transition-all duration-300 ${
            isSidebarVisible ? "w-64" : "w-16"
          } bg-white shadow-md overflow-y-auto`}>
          <Sidebar
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
          />
        </div>
        <div className="flex-1 w-auto overflow-y-auto bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
