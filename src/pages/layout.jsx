import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header: Fixed at the top */}
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: Fixed on the left and scrollable */}
        <div className="w-44 sticky overflow-x-hidden overflow-y-auto bg-white">
        <Sidebar />
        </div>

        {/* Outlet: Takes the remaining space, scrollable */}
        <div className="w-auto flex-1 overflow-y-auto bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
