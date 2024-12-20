import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../index.css";

const Layout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [isScrolled, setIsScrolled] = useState(false); // Track if content is scrolled
  const contentRef = useRef(null); // Reference to the Outlet content

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
        setIsScrolled(true); // Content is scrolled
      } else {
        setIsScrolled(false); // Content is at the top
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
    }

    // Clean up scroll listener when component is unmounted
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
          ref={contentRef} // Attach ref to monitor scrolling
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
