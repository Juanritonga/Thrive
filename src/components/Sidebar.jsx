import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = ({ isSidebarVisible, setIsSidebarVisible }) => {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [isFinanceOpen, setIsFinanceOpen] = useState(false); // State to track finance menu visibility
  const [isCashbookOpen, setIsCashbookOpen] = useState(false); // State to track finance menu visibility
  const [isFixedAssetsOpen, setIsFixedAssetsOpen] = useState(false); // State to track finance menu visibility
  const [isGeneralLedgerOpen, setIsGeneralLedgerOpen] = useState(false); // State to track finance menu visibility

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
    {
      role: "Super Admin",
      label: "Master Data",
      path: "/master-data",
      icon: "fas fa-user-shield",
      indent: true,
    },
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
      label: "Entitas",
      path: "/master-data/entitas",
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
      isParent: true,
    },
    {
      role: "Super Admin",
      label: "Class",
      path: "/master-data/finance/class-finance",
      indent: true,
    },
    {
      role: "Super Admin",
      label: "Chart of Account",
      path: "/master-data/finance/chart",
      indent: true,
    },
    {
      role: "Super Admin",
      label: "Currency",
      path: "/master-data/currency",
      indent: true,
    },
    {
      role: "Super Admin",
      label: "Bank",
      path: "/master-data/finance/bank",
      indent: true,
    },
    {
      role: "Super Admin",
      label: "Tax",
      path: "/master-data/finance/tax",
      indent: true,
    },

    
    {
      role: "front end",
      label: "Master Data",
      path: "/master-data",
      icon: "fas fa-file-invoice",
      isParent: true,
    },
    {
      role: "front end",
      label: "User",
      path: "/master-data/user",
      indent: true,
    },
    {
      role: "front end",
      label: "Division",
      path: "/master-data/division",
      indent: true,
    },
    {
      role: "front end",
      label: "Class",
      path: "/master-data/finance/class-finance",
      indent: true,
    },
    {
      role: "front end",
      label: "Chart",
      path: "/master-data/finance/chart",
      indent: true,
    },
    {
      role: "front end",
      label: "Currency",
      path: "/master-data/finance/currency",
      indent: true,
    },
    {
      role: "front end",
      label: "Bank",
      path: "/master-data/finance/bank",
      indent: true,
    },
    {
      role: "front end",
      label: "Tax",
      path: "/master-data/finance/tax",
      indent: true,
    },
    {
      role: "front end",
      label: "Finance",
      path: "/finance",
      icon: "fas fa-file-invoice",
      isParent: true,
      onClick: () => setIsFinanceOpen(!isFinanceOpen),
      hasDropdown: true,
    },
    {
      role: "front end",
      label: "Cash Book",
      path: "/cash-book",
      icon: "fas fa-money-bill",
      visible: isFinanceOpen,
      onClick: () => setIsCashbookOpen(!isCashbookOpen),
      hasDropdown: true,
    },
    {
      role: "front end",
      label: "Bank",
      path: "/cash-book/bank-cash-book",
      indent: true,
      visible: isFinanceOpen && isCashbookOpen, 
    },
    {
      role: "front end",
      label: "Petty Cash",
      path: "/cash-book/petty-cash",
      indent: true,
      visible: isFinanceOpen && isCashbookOpen, 
    },
    {
      role: "front end",
      label: "Cash Advance",
      path: "/cash-book/cash-advance",
      indent: true,
      visible: isFinanceOpen && isCashbookOpen, 
    },
    {
      role: "front end",
      label: "Reimbursement",
      path: "/cash-book/reimbursement",
      indent: true,
      visible: isFinanceOpen && isCashbookOpen, 
    },
    {
      role: "front end",
      label: "Format",
      path: "/cash-book/format",
      indent: true,
      visible: isFinanceOpen && isCashbookOpen, 
    },

    {
      role: "front end",
      label: "Fixed Assets",
      path: "#",
      icon: "fas fa-cogs",
      visible: isFinanceOpen,
      onClick: () => setIsFixedAssetsOpen(!isFixedAssetsOpen),
      hasDropdown: true,
    },
    {
      role: "front end",
      label: "Cash Advance",
      path: "#",
      indent: true,
      visible: isFinanceOpen && isFixedAssetsOpen,
    },
    {
      role: "front end",
      label: "Reimbursement",
      path: "#",
      indent: true,
      visible: isFinanceOpen && isFixedAssetsOpen,
    },
    {
      role: "front end",
      label: "Format",
      path: "#",
      indent: true,
      visible: isFinanceOpen && isFixedAssetsOpen,
    },

    {
      role: "front end",
      label: "General Ledger",
      path: "/general-ledger",
      icon: "fas fa-book",
      visible: isFinanceOpen,
      onClick: () => setIsGeneralLedgerOpen(!isGeneralLedgerOpen),
      hasDropdown: true,

    },
    {
      role: "front end",
      label: "Report",
      path: "#",
      indent: true,
      visible: isFinanceOpen && isGeneralLedgerOpen,
    },
    {
      role: "front end",
      label: "COA Mapping",
      path: "/general-ledger/main-coa-mapping",
      indent: true,
      visible: isFinanceOpen && isGeneralLedgerOpen,
    },
    {
      role: "front end",
      label: "Setup",
      path: "/general-ledger/setup",
      indent: true,
      visible: isFinanceOpen && isGeneralLedgerOpen,
    },
    {
      role: "front end",
      label: "Entry Management",
      path: "#",
      indent: true,
      visible: isFinanceOpen && isGeneralLedgerOpen,
    },
  ];

  return (
    <div className="relative">
      <div
        className={`bg-custom-blue flex items-center justify-center border-b border-gray-200 ${
          isSidebarVisible ? "p-6" : "p-4"
        }`}
      >
        <Link to="/dashboard">
          <img
            src="../thrive.png"
            alt="Company Logo"
            className={`object-contain ${isSidebarVisible ? "h-12" : "h-8"}`}
          />
        </Link>
      </div>
      <div
        className={`fixed left-0 h-full border-gray-200 shadow-md transform duration-300 ${
          isSmallScreen ? "w-20" : isSidebarVisible ? "w-64" : "w-20"
        } overflow-y-auto hidden-scrollbar bg-white`}
      >
        <ul className="p-4 space-y-2 mb-20">
          {menuItems
            .filter((item) => item.role === sessionStorage.getItem("role"))
            .map(
              (item, index) =>
                item.visible !== false && ( // Only render if item is visible
                  <li
                    key={index}
                    className={`flex items-center rounded-md ${
                      isActive(item.path)
                        ? "bg-gray-100 text-black"
                        : "text-gray-700"
                    } hover:bg-gray-200 transition-colors duration-200`}
                  >
                    <Link
                      to={item.path}
                      onClick={item.onClick} // Add onClick for parent items
                      className="flex items-center w-full py-3 px-4"
                    >
                      <i
                        className={`${item.icon} text-lg w-6 text-center text-custom-blue`}
                      ></i>
                      {!isSmallScreen && isSidebarVisible && (
                        <span
                          className={`ml-4 flex-1 text-black ${
                            isActive(item.path)
                              ? "font-bold text-custom-blue"
                              : "font-medium"
                          }`}
                        >
                          {item.label}
                        </span>
                      )}
                      {item.hasDropdown && (
                        <i
                          className={`fas fa-caret-${(() => {
                            // Return the correct caret direction based on the menu item label and its open state
                            if (item.label === "Finance")
                              return isFinanceOpen ? "down" : "right";
                            if (item.label === "Cash Book")
                              return isCashbookOpen ? "down" : "right";
                            if (item.label === "Fixed Assets")
                              return isFixedAssetsOpen ? "down" : "right";
                            if (item.label === "General Ledger")
                              return isGeneralLedgerOpen ? "down" : "right";
                            return "right"; // Default to right if none of the labels match
                          })()} ml-2 text-custom-blue`}
                        ></i>
                      )}
                    </Link>
                  </li>
                )
            )}
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
