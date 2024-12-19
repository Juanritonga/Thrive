import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const Layout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    // Atur ulang sidebar visibility saat layar kecil
    if (window.innerWidth <= 768) {
      setIsSidebarVisible(false);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`transition-all duration-300 ${
            isSmallScreen
              ? "w-20" 
              : isSidebarVisible
              ? "w-64" 
              : "w-20" 
          } bg-white shadow-md overflow-y-auto`}
        >
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
