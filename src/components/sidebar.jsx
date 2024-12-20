import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = ({ isSidebarVisible, setIsSidebarVisible }) => {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    if (window.innerWidth <= 768) {
      setIsSidebarVisible(false);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarVisible]);

  const isActive = (path) => location.pathname.startsWith(path);

  const menuItems = [
    // {
    //   role: "Super Admin",
    //   label: "Master Data",
    //   path: "/master-data",
    //   icon: "fas fa-user-shield",
    //   indent: true,
    // },
    {
      role: "Super Admin",
      label: "User Role",
      path: "/master-data/user-role",
      icon: "fas fa-user-shield",
      indent: true,
    },
    {
      role: "Super Admin",
      label: "User Data",
      path: "/master-data/user-data",
      icon: "fas fa-id-card",
      indent: true,
    },
    {
      role: "Super Admin",
      label: "Role Access",
      path: "/master-data/role-access",
      icon: "fas fa-key",
      indent: true,
    },
    {
      role: "Super Admin",
      label: "Division",
      path: "/master-data/division",
      icon: "fas fa-project-diagram",
      indent: true,
    },
    {
      role: "Super Admin",
      label: "Departement",
      path: "/master-data/departement",
      icon: "fas fa-building",
      indent: true,
    },
    {
      role: "Super Admin",
      label: "Project",
      path: "/master-data/project",
      icon: "fas fa-tasks",
      indent: true,
    },
    {
      role: "Super Admin",
      label: "Finance",
      path: "/master-data/finance",
      icon: "fas fa-hand-holding-usd",
      indent: true,
    },

    {
      role: "front end",
      label: "FINANCE",
      path: "/finance",
      icon: "fas fa-file-invoice",
      isParent: true,
    },
    {
      role: "front end",
      label: "Cash Book",
      path: "/cash-book",
      icon: "fas fa-money-bill",
    },
    {
      role: "front end",
      label: "Bank",
      path: "/cash-book/bank-cash-book",
      icon: "fas fa-university",
      indent: true,
    },
    {
      role: "front end",
      label: "Petty Cash",
      path: "/cash-book/petty-cash",
      icon: "fas fa-wallet",
      indent: true,
    },
    {
      role: "front end",
      label: "Cash Advance",
      path: "/cash-book/cash-advance",
      icon: "fas fa-hand-holding-usd",
      indent: true,
    },
    {
      role: "front end",
      label: "Reimbursement",
      path: "/cash-book/reimbursement",
      icon: "fas fa-receipt",
      indent: true,
    },
    {
      role: "front end",
      label: "Format",
      path: "/cash-book/format",
      icon: "fas fa-file-alt",
      indent: true,
    },

    {
      role: "front end",
      label: "Fixed Assets",
      path: "#",
      icon: "fas fa-cogs",
    },
    {
      role: "front end",
      label: "Cash Advance",
      path: "#",
      icon: "fas fa-hand-holding-usd",
      indent: true,
    },
    {
      role: "front end",
      label: "Reimbursement",
      path: "#",
      icon: "fas fa-receipt",
      indent: true,
    },
    {
      role: "front end",
      label: "Format",
      path: "#",
      icon: "fas fa-file-alt",
      indent: true,
    },

    {
      role: "front end",
      label: "General Ledger",
      path: "/general-ledger",
      icon: "fas fa-book",
    },
    {
      role: "front end",
      label: "Report",
      path: "#",
      icon: "fas fa-file-alt",
      indent: true,
    },
    {
      role: "front end",
      label: "COA Mapping",
      path: "/general-ledger/main-coa-mapping",
      icon: "fas fa-sitemap",
      indent: true,
    },
    {
      role: "front end",
      label: "Setup",
      path: "/general-ledger/setup",
      icon: "fas fa-gear",
      indent: true,
    },
    {
      role: "front end",
      label: "Entry Management",
      path: "#",
      icon: "fas fa-folder-open",
      indent: true,
    },
  ];

  return (
    <div className="relative">
      <div
        className={`flex items-center justify-center border-b border-gray-200 ${
          isSidebarVisible ? "p-6" : "p-4"
        }`}
      >
        <img
          src="../thrive.png"
          alt="Company Logo"
          className={`object-contain ${isSidebarVisible ? "h-12" : "h-8"}`}
          style={{
            filter:
              "invert(15%) sepia(70%) saturate(4000%) hue-rotate(220deg) brightness(80%) contrast(120%)",
          }}
        />
      </div>

      <div
        className={`fixed left-0 h-full border-gray-200 shadow-md transform duration-300 ${
          isSmallScreen ? "w-20" : isSidebarVisible ? "w-64" : "w-20"
        } overflow-y-auto hidden-scrollbar bg-white`}
      >
        <ul className="p-4 space-y-2">
          {menuItems
            .filter((item) => item.role === sessionStorage.getItem("role"))
            .map((item, index) => (
              <li
                key={index}
                className={`flex items-center rounded-md ${
                  isActive(item.path) ? "bg-gray-100 text-black" : "text-gray-700"
                } hover:bg-gray-200 transition-colors duration-200`}
              >
                <Link to={item.path} className="flex items-center w-full py-3 px-4">
                  <i
                    className={`${item.icon} text-lg w-6 text-center text-custom-blue`}
                  ></i>
                  {!isSmallScreen && isSidebarVisible && (
                    <span
                      className={`ml-4 flex-1 text-black ${
                        isActive(item.path) ? "font-bold text-custom-blue" : "font-medium"
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
  setIsSidebarVisible: PropTypes.func.isRequired,
};

export default Sidebar;
