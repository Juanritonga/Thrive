import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isSidebarVisible, setIsSidebarVisible }) => {
  const location = useLocation();

  // Helper function to determine if a path is active
  const isActive = (path) => location.pathname === path;

  // Menu Items
  const menuItems = [
    {
      label: "MASTER DATA",
      path: "/MasterData",
      isParent: true,
      icon: "fas fa-database",
    },
    {
      label: "FINANCE",
      path: "#",
      isParent: true,
      icon: "fas fa-file-invoice",
    },
    { label: "Cash Book", path: "/cashbook", icon: "fas fa-money-bill" },
    {
      label: "Bank",
      path: "/cashbook/bankchasbook",
      icon: "fas fa-university",
      indent: true,
    },
    {
      label: "Petty Cash",
      path: "/cashbook/pettycash",
      icon: "fas fa-wallet",
      indent: true,
    },
    {
      label: "Cash Advance",
      path: "/cashbook/cashadvance",
      icon: "fas fa-hand-holding-usd",
      indent: true,
    },
    {
      label: "Reimbursement",
      path: "/cashbook/reimbursement",
      icon: "fas fa-receipt",
      indent: true,
    },
    {
      label: "Format",
      path: "/cashbook/format",
      icon: "fas fa-file-alt",
      indent: true,
    },
    { label: "Fixed Assets", path: "#", icon: "fas fa-cogs" },
    {
      label: "Cash Advance",
      path: "#",
      icon: "fas fa-hand-holding-usd",
      indent: true,
    },
    { label: "Reimbursement", path: "#", icon: "fas fa-receipt", indent: true },
    { label: "Format", path: "#", icon: "fas fa-file-alt", indent: true },
    { label: "General Ledger", path: "#", icon: "fas fa-book" },
    {
      label: "Cash Advance",
      path: "#",
      icon: "fas fa-hand-holding-usd",
      indent: true,
    },
  ];

  return (
    <div className="relative">
      {/* Sidebar */}
      <div
        className={`fixed left-0 h-full r-r-2 border-gray-200 shadow-md transform duration-300 ${
          isSidebarVisible ? "w-64" : "w-16"
        }`}
      >
        <button
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 p-2 text-custom-blue rounded-lg  focus:outline-none z-50"
        >
          {isSidebarVisible ? (
            <i className="fa-solid fa-caret-left"></i> // You can use a different icon for the close button
          ) : (
            <i className="fa-solid fa-caret-right"></i> // Open icon
          )}
        </button>

        <ul className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <li
            key={index}
            className={`flex items-center ${item.indent ? "pl-4" : ""} ${
              isActive(item.path) ? "font-bold" : "text-custom-blue"
            }`}
          >
          
          
              <Link
                to={item.path}
                className={`flex items-center w-full p-2 text-gray-700 hover:text-blue-700 ${
                  isSidebarVisible ? "justify-start" : "justify-center"
                }`}
              >
                <i className={`${item.icon} text-lg`}></i>
                {isSidebarVisible && <span className="ml-3">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
