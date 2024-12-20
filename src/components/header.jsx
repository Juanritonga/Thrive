import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const getBreadcrumbs = (pathname) => {
  const paths = pathname.split("/").filter(Boolean);

  const pathNameMap = {
    "master-data": "Master Data",
    "user-role": "User Role",
    "user-data": "User Data",
    "role-access": "Role Access",
    "class-finance": "Class Finance",
    "cash-book": "Cash Book",
    "bank-cash-book": "Bank Cash Book",
    "petty-cash": "Petty Cash",
    "cash-advance": "Cash Advance",
    "general-ledger": "General Ledger",
    "main-coa-mapping": "Main COA Mapping",
    "coa-mapping": "COA Mapping",
    "coa-division": "COA Division",
    "transaction-type": "Transaction Type",
    "budget-group": "Budget Group",
    "account-period": "Account Period",
  };

  const breadcrumbPath = [
    <Link
      key="dashboard"
      to="/"
      className="ml-4 fa-solid fa-book text-gray-600"
    />,
  ];

  paths.forEach((path, index) => {
    const to = `/${paths.slice(0, index + 1).join("/")}`;
    const formattedPath =
      pathNameMap[path.toLowerCase()] ||
      path.charAt(0).toUpperCase() + path.slice(1);
    breadcrumbPath.push(
      <span key={to}>
        {" > "}
        <Link
          to={to}
          className={`text-black ${
            pathname === to ? "font-bold" : "text-gray-500"
          }`}
        >
          {formattedPath}
        </Link>
      </span>
    );
  });

  return breadcrumbPath;
};

const Header = ({ setIsSidebarVisible, isSidebarVisible }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedName = sessionStorage.getItem("name");
    const storedRole = sessionStorage.getItem("role");

    if (storedName && storedRole) {
      setName(storedName);
      setRole(storedRole);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="sticky top-0 left-0 right-0 flex w-full items-center justify-between py-4 h-22">
      <div className="flex items-center h-full">
        <button
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          className="mr-4 p-2 text-custom-blue rounded-full focus:outline-none"
        >
          <i className={`fas ${isSidebarVisible ? "fa-bars" : "fa-bars"}`}></i>
        </button>

        <div className="text-black">
          <h1 className="text-2xl font-bold ml-3 mt-4">
            {location.pathname === "/"
              ? "Home"
              : location.pathname.includes("finance")
              ? "Finance"
              : location.pathname.includes("cashbook")
              ? "Cashbook"
              : location.pathname.includes("fixed-assets")
              ? "Fixed Assets"
              : location.pathname.includes("general-ledger")
              ? "General Ledger"
              : "Master Data"}
          </h1>
          <div className="text-sm mb-4">
            {getBreadcrumbs(location.pathname)}
          </div>
        </div>

        {role !== "Super Admin" && (
          <select className="bg-gray-200 text-gray-400 p-2 rounded w-full ml-40 sm:w-60">
            <option>Project</option>
          </select>
        )}
      </div>

      <div className="flex items-center sm:mt-0">
        <div className="flex items-center text-black p-2 rounded mr-4">
          <div className="font-bold border border-gray-200 bg-white text-custom-blue mr-2 p-4 rounded-lg flex items-center justify-center w-12 h-12">
            {name.charAt(0)}
          </div>
          <div className="min-w-0 mr-5">
            <div className="font-bold text-black text-sm truncate">{name}</div>
            <div className="text-xs text-black truncate">{role}</div>
          </div>
        </div>

        <i
          className="fa fa-sign-out border border-gray-200 bg-white text-custom-blue mr-2 p-4 rounded-lg cursor-pointer"
          onClick={handleLogout}
        ></i>

        <button
          className="font-bold text-black p-2 rounded hidden sm:block mr-5"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
  setIsSidebarVisible: PropTypes.func.isRequired,
};

export default Header;
