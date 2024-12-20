import Sidebar from "../components/sidebarxxx";
import Header from "../components/headerxxx";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../index.css";

const Layout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    if (window.innerWidth <= 768) {
      setIsSidebarVisible(false);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current && contentRef.current.scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isSmallScreen ? "w-20" : isSidebarVisible ? "w-64" : "w-20"
        } bg-white shadow-md overflow-y-auto`}
      >
        <Sidebar
          isSidebarVisible={isSidebarVisible}
          setIsSidebarVisible={setIsSidebarVisible}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div
          className={`flex justify-end shadow-md transition-all duration-200 ${
            isScrolled
              ? "bg-custom-white border-b border-gray-100"
              : "bg-custom-base"
          }`}
        >
          <Header
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
          />
        </div>

        {/* Outlet for nested routes */}
        <div
          className="flex-1 overflow-y-auto bg-custom-base hidden-scrollbar"
          ref={contentRef}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
