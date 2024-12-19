import { NavLink, Outlet } from "react-router-dom";

const FinanceMasterData = () => {
  return (
    <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4">
        <NavLink
          to="ClassFinance"
          className={({ isActive }) =>
            `font-bold flex-1 px-2 py-2 sm:px-3 sm:py-3 bg-white text-custom-blue border rounded text-center ${
              isActive ? "bg-gray-300" : "hover:bg-gray-300"
            }`
          }
        >
          Class Master
        </NavLink>
        <NavLink
          to="chart"
          className={({ isActive }) =>
            `font-bold flex-1 px-2 py-2 sm:px-3 sm:py-3 bg-white text-custom-blue border rounded text-center ${
              isActive ? "bg-gray-300" : "hover:bg-gray-300"
            }`
          }
        >
          Chart of Acc.
        </NavLink>
        <NavLink
          to="currency"
          className={({ isActive }) =>
            `font-bold flex-1 px-2 py-2 sm:px-3 sm:py-3 bg-white text-custom-blue border rounded text-center ${
              isActive ? "bg-gray-300" : "hover:bg-gray-300"
            }`
          }
        >
          Currency
        </NavLink>
        <NavLink
          to="bank"
          className={({ isActive }) =>
            `font-bold flex-1 px-2 py-2 sm:px-3 sm:py-3 bg-white text-custom-blue border rounded text-center ${
              isActive ? "bg-gray-300" : "hover:bg-gray-300"
            }`
          }
        >
          Bank
        </NavLink>
        <NavLink
          to="tax"
          className={({ isActive }) =>
            `font-bold flex-1 px-2 py-2 sm:px-3 sm:py-3 bg-white text-custom-blue border rounded text-center ${
              isActive ? "bg-gray-300" : "hover:bg-gray-300"
            }`
          }
        >
          Tax
        </NavLink>
      </div>
      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default FinanceMasterData;
