import { NavLink, Outlet } from "react-router-dom";

const Setup = () => {
  return (
    <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
      <div className="flex justify-center gap-4">
        <NavLink
          to="transactiontype"
          className={({ isActive }) =>
            `font-bold flex-1 px-3 py-3 text-center border rounded transition-all duration-300 ${
              isActive
                ? "bg-custom-blue text-white shadow-lg scale-105"
                : "bg-white text-custom-blue hover:bg-gray-300 hover:text-black"
            }`
          }
        >
          Trans. Type
        </NavLink>
        <NavLink
          to="budgetgroup"
          className={({ isActive }) =>
            `font-bold flex-1 px-3 py-3 text-center border rounded transition-all duration-300 ${
              isActive
                ? "bg-custom-blue text-white shadow-lg scale-105"
                : "bg-white text-custom-blue hover:bg-gray-300 hover:text-black"
            }`
          }
        >
          Budget Group
        </NavLink>
        <NavLink
          to="accountperiod"
          className={({ isActive }) =>
            `font-bold flex-1 px-3 py-3 text-center border rounded transition-all duration-300 ${
              isActive
                ? "bg-custom-blue text-white shadow-lg scale-105"
                : "bg-white text-custom-blue hover:bg-gray-300 hover:text-black"
            }`
          }
        >
          Acct. Period
        </NavLink>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Setup;
