import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = ({ isSidebarVisible, setIsSidebarVisible }) => {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [isMasterDataOpen, setIsMasterDataOpen] = useState(false);
  const [isFinanceMasterDataOpen, setIsFinanceMasterDataOpen] = useState(false);
  //const [isMasterDataFinanceOpen, setIsMasterDataFinanceOpen] = useState(false);
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const [isCashbookOpen, setIsCashbookOpen] = useState(false);
  const [isFixedAssetsOpen, setIsFixedAssetsOpen] = useState(false);
  const [isGeneralLedgerOpen, setIsGeneralLedgerOpen] = useState(false);

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
      onClick: () => setIsMasterDataOpen(!isMasterDataOpen),
      hasDropdown: true,
    },
    {
      role: "Super Admin",
      label: "User Role",
      path: "/master-data/user-role",
      icon: "fas fa-user-shield",
      indent: true,
      visible: isMasterDataOpen
    },
    {
      role: "Super Admin",
      label: "User Data",
      path: "/master-data/user-data",
      icon: "fas fa-id-card",
      indent: true,
      visible: isMasterDataOpen
    },
    {
      role: "Super Admin",
      label: "Role Access",
      path: "/master-data/role-access",
      icon: "fas fa-key",
      indent: true,
      visible: isMasterDataOpen
    },
    {
      role: "Super Admin",
      label: "Division",
      path: "/master-data/division",
      icon: "fas fa-project-diagram",
      indent: true,
      visible: isMasterDataOpen
    },
    {
      role: "Super Admin",
      label: "Entitas",
      path: "/master-data/entitas",
      icon: "fas fa-building",
      indent: true,
      visible: isMasterDataOpen
    },
    {
      role: "Super Admin",
      label: "Project",
      path: "/master-data/project",
      icon: "fas fa-tasks",
      indent: true,
      visible: isMasterDataOpen
    },
    {
      role: "Super Admin",
      label: "Finance",
      path: "/finance",
      icon: "fas fa-hand-holding-usd",
      isParent: true,
      onClick: () => setIsFinanceMasterDataOpen(!isFinanceMasterDataOpen),
      hasDropdown: true,
    },
    {
      role: "Super Admin",
      label: "Class",
      path: "/finance/class-finance",
      icon: "fas fa-chalkboard-teacher",
      indent: true,
      visible: isFinanceMasterDataOpen,
    },
    {
      role: "Super Admin",
      label: "Chart of Account",
      path: "/finance/chart",
      icon: "fas fa-chart-line",
      indent: true,
      visible: isFinanceMasterDataOpen,
    },
    {
      role: "Super Admin",
      label: "Currency",
      path: "/finance/currency",
      icon: "fas fa-dollar-sign",
      indent: true,
      visible: isFinanceMasterDataOpen,
    },
    {
      role: "Super Admin",
      label: "Bank",
      path: "/finance/bank",
      icon: "fas fa-university",
      indent: true,
      visible: isFinanceMasterDataOpen,
    },
    {
      role: "Super Admin",
      label: "Tax",
      path: "/finance/tax",
      icon: "fas fa-percent",
      indent: true,
      visible: isFinanceMasterDataOpen,
    }, 
    // {
    //   role: "front end",
    //   label: "Master Data",
    //   path: "/master-data",
    //   icon: "fas fa-file-invoice",
    //   isParent: true,
    //   onClick: () => setIsMasterDataFinanceOpen(!isMasterDataFinanceOpen),
    //   hasDropdown: true,
    // },
    // {
    //   role: "front end",
    //   label: "User",
    //   path: "/master-data/user-role",
    //   indent: true,
    //   visible: isMasterDataFinanceOpen,
    // },
    // {
    //   role: "front end",
    //   label: "Division",
    //   path: "/master-data/division",
    //   indent: true,
    //   visible: isMasterDataFinanceOpen,
    // },
    // {
    //   role: "front end",
    //   label: "Class",
    //   path: "/finance/class-finance",
    //   indent: true,
    //   visible: isMasterDataFinanceOpen,
    // },
    // {
    //   role: "front end",
    //   label: "Chart",
    //   path: "/finance/chart",
    //   indent: true,
    //   visible: isMasterDataFinanceOpen,
    // },
    // {
    //   role: "front end",
    //   label: "Currency",
    //   path: "/finance/currency",
    //   indent: true,
    //   visible: isMasterDataFinanceOpen,
    // },
    // {
    //   role: "front end",
    //   label: "Bank",
    //   path: "/finance/bank",
    //   indent: true,
    //   visible: isMasterDataFinanceOpen,
    // },
    // {
    //   role: "front end",
    //   label: "Tax",
    //   path: "/finance/tax",
    //   indent: true,
    //   visible: isMasterDataFinanceOpen,
    // },
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
      icon: "fas fa-university",
      indent: true,
      visible: isFinanceOpen && isCashbookOpen, 
    },
    {
      role: "front end",
      label: "Petty Cash",
      path: "/cash-book/petty-cash",
      icon: "fas fa-wallet",
      indent: true,
      visible: isFinanceOpen && isCashbookOpen, 
    },
    {
      role: "front end",
      label: "Cash Advance",
      path: "/cash-book/cash-advance",
      icon: "fas fa-hand-holding-usd",
      indent: true,
      visible: isFinanceOpen && isCashbookOpen, 
    },
    {
      role: "front end",
      label: "Reimbursement",
      path: "/cash-book/reimbursement",
      icon: "fas fa-receipt",
      indent: true,
      visible: isFinanceOpen && isCashbookOpen, 
    },
    {
      role: "front end",
      label: "Format",
      path: "/cash-book/format",
      icon: "fas fa-file-alt",
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
      icon: "fas fa-hand-holding-usd",
      indent: true,
      visible: isFinanceOpen && isFixedAssetsOpen,
    },
    {
      role: "front end",
      label: "Reimbursement",
      path: "#",
      icon: "fas fa-receipt",
      indent: true,
      visible: isFinanceOpen && isFixedAssetsOpen,
    },
    {
      role: "front end",
      label: "Format",
      path: "#",
      icon: "fas fa-file-alt",
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
      icon: "fas fa-file-alt",
      indent: true,
      visible: isFinanceOpen && isGeneralLedgerOpen,
    },
    {
      role: "front end",
      label: "COA Mapping",
      path: "/general-ledger/main-coa-mapping",
      icon: "fas fa-map",
      indent: true,
      visible: isFinanceOpen && isGeneralLedgerOpen,
    },
    {
      role: "front end",
      label: "Setup",
      path: "/general-ledger/setup",
      icon: "fas fa-cogs",
      indent: true,
      visible: isFinanceOpen && isGeneralLedgerOpen,
    },
    {
      role: "front end",
      label: "Entry Management",
      path: "#",
      icon: "fas fa-tasks",
      indent: true,
      visible: isFinanceOpen && isGeneralLedgerOpen,
    },
    {
      role: "front end",
      label: "Project",
      path: "/project",
      icon: "fas fa-file-invoice",
      isParent: true,
    },
    {
      role: "front end",
      label: "Project Master",
      path: "/project/projectmaster",
      icon: "fas fa-money-bill",
    },
    {
      role: "front end",
      label: "Master",
      path: "/project/projectmaster/master",
      icon: "fas fa-money-bill",
    },
    {
      role: "front end",
      label: "Phase",
      path: "/project/projectmaster/phase",
      icon: "fas fa-money-bill",
    },{
      role: "front end",
      label: "Property",
      path: "/project/projectmaster/property",
      icon: "fas fa-money-bill",
    },{
      role: "front end",
      label: "Property Phase",
      path: "/project/projectmaster/property-phase",
      icon: "fas fa-money-bill",
    },
    {
      role: "front end",
      label: "Setup",
      path: "/project/setup-project",
      icon: "fas fa-money-bill",
    },
    {
      role: "front end",
      label: "Class",
      path: "/project/setup-project/class",
      icon: "fas fa-money-bill",
    },
    {
      role: "front end",
      label: "Component",
      path: "/project/setup-project/component",
      icon: "fas fa-money-bill",
    },
    {
      role: "front end",
      label: "Cost",
      path: "/project/setup-project/cost",
      icon: "fas fa-money-bill",
    },
    {
      role: "front end",
      label: "Budget",
      path: "/project/budget",
      icon: "fas fa-money-bill",
    },
    {
      role: "front end",
      label: "Entry",
      path: "/project/budget/entry",
      icon: "fas fa-money-bill",
    },
    {
      role: "front end",
      label: "Approval",
      path: "/project/budget/approval",
      icon: "fas fa-money-bill",
    },
  ];

  return (
    <div className="relative">
      <div
        className={`bg-custom-blue flex items-center justify-center border-b border-gray-200 ${
          isSidebarVisible ? "p-6" : "p-4"
        }`}
      >
        <Link to="/">
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
                item.visible !== false && (
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
                      onClick={item.onClick}
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
                            if (item.label === "Master Data")
                              return isMasterDataOpen ? "down" : "right";
                            if (item.label === "Finance")
                              return isFinanceMasterDataOpen ? "down" : "right";
                            if (item.label === "Finance")
                              return isFinanceOpen ? "down" : "right";
                            if (item.label === "Cash Book")
                              return isCashbookOpen ? "down" : "right";
                            if (item.label === "Fixed Assets")
                              return isFixedAssetsOpen ? "down" : "right";
                            if (item.label === "General Ledger")
                              return isGeneralLedgerOpen ? "down" : "right";
                            return "right";
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