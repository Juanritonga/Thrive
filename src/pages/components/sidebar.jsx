import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Helper function to determine if a path is active
  const isActive = (path) => location.pathname === path;

  // Menu Items
  const menuItems = [
    { label: "MASTER DATA", path: "#", isParent: true },
    { label: "FINANCE", path: "#", isParent: true },
    { label: "Cash Book", path: "/cashbook", icon: "fas fa-money-bill" },
    { label: "Bank", path: "/cashbook/bankchasbook", indent: true },
    { label: "Petty Cash", path: "/cashbook/pettycash", indent: true },
    { label: "Cash Advance", path: "/cashbook/cashadvance", indent: true },
    { label: "Reimbursement", path: "/cashbook/reimbursement", indent: true },
    { label: "Format", path: "/cashbook/format", indent: true },
    { label: "Fixed Assets", path: "#", icon: "fas fa-money-bill" },
    { label: "Cash Advance", path: "#", indent: true },
    { label: "Reimbursement", path: "#", indent: true },
    { label: "Format", path: "#", indent: true },
    { label: "General Ledger", path: "#", icon: "fas fa-money-bill" },
    { label: "Cash Advance", path: "#", indent: true },
    { label: "Reimbursement", path: "#", indent: true },
    { label: "Format", path: "#", indent: true },
  ];

  return (
    
<div >
<ul className="w-full">
    {menuItems.map((item, index) => (
      <li
        key={index}
        className={`mb-2 w-full border-b-2 border-gray-200 ${
          item.isParent ? "font-bold" : ""
        }`}
      >
        <Link
          to={item.path}
          className={`flex items-center p-1 font-bold${
            isActive(item.path)
              ? "p-2 text-blue-900 font-bold w-full"
              : "text-gray-700 hover:text-custom-blue bg-blue"
          } ${item.indent ? "ml-7" : ""}`}
        >
          {item.icon && <i className={`${item.icon} mr-2`}></i>}
          {item.label}
        </Link>
      </li>
    ))}
  </ul>
</div>
      
  
  );
};

export default Sidebar;
