import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = ({ isSidebarVisible, setIsSidebarVisible }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  const menuItems = [
    {
      role: "Super Admin",
      label: "MASTER DATA",
      path: "/master-data",
      icon: "fas fa-database",
    },
    {
      role: "Super Admin",
      label: "User",
      path: "/master-data/user",
      icon: "fas fa-university",
      indent: true,
    },
    {
      role: "Super Admin",
      label: "Project",
      path: "/master-data/project",
      icon: "fas fa-wallet",
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
      isParent: true,
      icon: "fas fa-file-invoice",
    },
    {
      role: "front end",
      label: "Cash Book",
      path: "/cashbook",
      icon: "fas fa-money-bill",
    },
    {
      role: "front end",
      label: "Bank",
      path: "/cashbook/bankchasbook",
      icon: "fas fa-university",
      indent: true,
    },
    {
      role: "front end",
      label: "Petty Cash",
      path: "/cashbook/pettycash",
      icon: "fas fa-wallet",
      indent: true,
    },
    {
      role: "front end",
      label: "Cash Advance",
      path: "/cashbook/cashadvance",
      icon: "fas fa-hand-holding-usd",
      indent: true,
    },
    {
      role: "front end",
      label: "Reimbursement",
      path: "/cashbook/reimbursement",
      icon: "fas fa-receipt",
      indent: true,
    },
    {
      role: "front end",
      label: "Format",
      path: "/cashbook/format",
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
      icon: "fas fa fa-folder-open",
      indent: true,
    },
  ];

  return (
    <div className="relative">
      <div
        className={`fixed left-0 h-full border-gray-200 shadow-md transform duration-300 ${
          isSidebarVisible ? "w-64" : "w-16"
        } overflow-y-auto bg-white scrollbar-hide`}
      >
        <ul className="p-4 space-y-2 mb-20">
          {menuItems
            .filter((item) => item.role === sessionStorage.getItem("role"))
            .map((item, index) => (
              <li
                key={index}
                className={`flex items-center ${item.indent ? "pl-4" : ""} ${
                  isActive(item.path)
                    ? "font-bold text-custom-blue"
                    : "text-dark"
                }`}
              >
                <Link
                  to={item.path}
                  className={`flex items-center w-full p-2 hover:text-custom-blue ${
                    isSidebarVisible ? "justify-start" : "justify-center"
                  }`}
                >
                  <i className={`${item.icon} text-lg`}></i>
                  {isSidebarVisible && (
                    <span className="ml-3">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      <button
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        className={`fixed top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
          isSidebarVisible ? "left-64" : "left-16"
        } p-2 text-custom-blue rounded-full  focus:outline-none z-50`}
      >
        {isSidebarVisible ? (
          <i className="fas fa-chevron-left"></i>
        ) : (
          <i className="fas fa-chevron-right"></i>
        )}
      </button>
    </div>
  );
};

Sidebar.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
  setIsSidebarVisible: PropTypes.func.isRequired,
};

export default Sidebar;
