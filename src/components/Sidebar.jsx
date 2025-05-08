import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = ({ isSidebarVisible, setIsSidebarVisible }) => {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const userRole = sessionStorage.getItem("role") || "";

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    if (window.innerWidth <= 768) {
      setIsSidebarVisible(false);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarVisible]);

  const isActive = (path, exactMatch = false) => {
    if (exactMatch) {
      return location.pathname === path;
    }
  
    const currentSegments = location.pathname.split("/").filter(Boolean);
    const pathSegments = path.split("/").filter(Boolean);
  
    // Path sekarang harus langsung child dari path yang diuji
    return (
      currentSegments.length === pathSegments.length + 1 &&
      location.pathname.startsWith(path)
    );
  };
  
  

  const toggleDropdown = (label) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const menuItems = [
    {
      role: "Super Admin",
      label: "Dashboard",
      icon: "fas fa-user-shield",
      path: "/",
    },
    {
      role: "Super Admin",
      label: "Master Data",
      icon: "fas fa-user-shield",
      path: "/master-data",
      hasDropdown: true,
      children: [
        { label: "User Role", path: "/master-data/user-role" },
        { label: "User Data", path: "/master-data/user-data" },
        { label: "Role Access", path: "/master-data/role-access" },
        { label: "Division", path: "/master-data/division" },
        { label: "Entitas", path: "/master-data/entitas" },
        { label: "Project", path: "/master-data/project" },
      ],
    },
    {
      role: "Super Admin",
      label: "Finance",
      icon: "fas fa-hand-holding-usd",
      path: "/finance",
      hasDropdown: true,
      children: [
        { label: "Class", path: "/finance/class-finance" },
        { label: "Chart of Account", path: "/finance/chart" },
        { label: "Currency", path: "/finance/currency" },
        { label: "Bank", path: "/finance/bank" },
        { label: "Tax", path: "/finance/tax" },
      ],
    },
    {
      role: "frontend",
      label: "Dashboard",
      icon: "fas fa-user-shield",
      path: "/",
    },
    {
      role: "Super Admin",
      label: "Finance",
      icon: "fas fa-file-invoice",
      path: "/finance",
      hasDropdown: true,
      children: [
        {
          label: "Cash Book",
          path: "/cash-book",
          hasDropdown: true,
          children: [
            { label: "Bank", path: "/cash-book/bank-cash-book" },
            { label: "Petty Cash", path: "/cash-book/petty-cash" },
            { label: "Cash Advance", path: "/cash-book/cash-advance" },
            { label: "Reimbursement", path: "/cash-book/reimbursement" },
            { label: "Format", path: "/cash-book/format" },
          ],
        },
        {
          label: "General Ledger",
          path: "/general-ledger",
          hasDropdown: true,
          children: [
            { label: "Report", path: "#" },
            { label: "COA Mapping", path: "/general-ledger/main-coa-mapping" },
            { label: "Setup", path: "/general-ledger/setup" },
            { label: "Entry Management", path: "#" },
          ],
        },
      ],
    },
    {
      role: "Super Admin",
      label: "Project",
      icon: "fas fa-file-invoice",
      path: "/project",
      hasDropdown: true,
      children: [
        {
          label: "Project Management",
          path: "/project/managementproject",
          hasDropdown: true,
          children: [
            { label: "Master", path: "/project/managementproject/master" },
            { label: "Phase", path: "/project/managementproject/phase" },
            { label: "Property", path: "/project/managementproject/property" },
            {
              label: "Property Phase",
              path: "/project/managementproject/_propertyphase",
            },
          ],
        },
        {
          label: "Setup",
          path: "/project/setup-project",
          hasDropdown: true,
          children: [
            { label: "Class", path: "/project/setup-project/class" },
            { label: "Component", path: "/project/setup-project/component" },
            { label: "Cost", path: "/project/setup-project/cost" },
          ],
        },
        {
          label: "Budget",
          path: "/project/budget",
          hasDropdown: true,
          children: [
            { label: "Entry", path: "/project/budget/entry" },
            { label: "Approval", path: "/project/budget/approval" },
          ],
        },
      ],
    },
    {
  role: "Super Admin",
  label: "Sales",
  icon: "fas fa-file-invoice",
  path: "/sales",
  hasDropdown: true,
  children: [
    {
      label: "Sales Administration",
      path: "/sales/salesadministration",
      hasDropdown: true,
      children: [
        {
          label: "Master",
          path: "/sales/salesadministration/master",
          hasDropdown: true,
          children: [
            { label: "Unit", path: "/sales/salesadministration/master/unit" },
            { label: "Discount", path: "/sales/salesadministration/master/discount" },
            { label: "Payment Plan", path: "/sales/salesadministration/master/paymentplan" },
            { label: "Price", path: "/sales/salesadministration/master/price" },
            { label: "Sales Agent", path: "/sales/salesadministration/master/salesagent" },
            { label: "Package", path: "/sales/salesadministration/master/package" },
            { label: "Media", path: "/sales/salesadministration/master/media" },
            { label: "Generation", path: "/sales/salesadministration/master/generation" },
            { label: "Occupation", path: "/sales/salesadministration/master/occupation" },
          ],
        },
        {
          label: "Purchase",
          path: "/sales/salesadministration/purchase",
          hasDropdown: true,
          children: [
            { label: "Hold / Release", path: "/sales/salesadministration/purchase/hold" },
            { label: "Reservation", path: "/sales/salesadministration/purchase/reservation" },
            { label: "Booking", path: "/sales/salesadministration/purchase/booking" },
            { label: "Billing", path: "/sales/salesadministration/purchase/billing" },
            { label: "Cancellation", path: "/sales/salesadministration/purchase/cancellation" },
            { label: "Change Owner", path: "/sales/salesadministration/purchase/changeowner" },
            { label: "Transfer Unit", path: "/sales/salesadministration/purchase/transferunit" },
            { label: "Rounding", path: "/sales/salesadministration/purchase/rounding" },
            { label: "Global Price", path: "/sales/salesadministration/purchase/globalprice" },
            { label: "Order Document", path: "/sales/salesadministration/purchase/orderdocument" },
          ],
        },
      ],
    },
  ],
}

  ];

  const renderMenuItems = (items) => {
    return items
      .filter((item) => !item.role || item.role === userRole)
      .map((item) => {
        const active = isActive(item.path, true) || isActive(item.path);
        const isParentActive = active && item.hasDropdown;
        const activeBgColor = isParentActive
          ? "bg-custom-blue"
          : active
          ? "bg-custom-blue3"
          : "";

        return (
          <li key={item.path} className="relative">
  <Link
    to={item.path}
    onClick={() => item.hasDropdown && toggleDropdown(item.label)}
    className={`flex items-center p-3 transition-colors duration-200 relative
      ${
        isActive(item.path, true)
          ? "text-white bg-custom-blue3"
          : isActive(item.path)
          ? "text-white bg-custom-blue"
          : "text-black hover:bg-gray-200 hover:text-black"
      }`}
  >
    {/* Ini bg aktif, posisinya absolute biar nggak ikut geser */}
    {active && (
      <span
        className={`absolute inset-0 -z-10 ${activeBgColor}`}
      ></span>
    )}

    <i
      className={`${item.icon} text-lg w-6 text-center ${
        active ? "text-white" : "text-custom-blue"
      }`}
    ></i>

    {!isSmallScreen && isSidebarVisible && (
      <span
        className={`ml-4 flex-1 ${
          active ? "text-white" : "text-custom-blue3"
        }`}
      >
        {item.label}
      </span>
    )}
  </Link>

  {/* Child menu */}
  {item.hasDropdown && openDropdowns[item.label] && item.children && (
    <ul className="pl-3 mt-1">{renderMenuItems(item.children)}</ul>
  )}
</li>

        );
      });
  };

  return (
    <div className="relative">
      <div
        className={`bg-custom-blue flex items-center justify-center border-b ${
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
        className={`fixed left-0 h-full border-gray-200 shadow-md transform duration-300 mb-20 ${
          isSmallScreen ? "w-20" : isSidebarVisible ? "w-64" : "w-20"
        } overflow-y-auto hidden-scrollbar bg-white`}
      >
        <ul className="space-y-2 mb-24">{renderMenuItems(menuItems)}</ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
  setIsSidebarVisible: PropTypes.func.isRequired,
};

export default Sidebar;
