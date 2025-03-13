import { NavLink, Outlet } from "react-router-dom";

const FinanceExternal = () => {

  return (
    <div className="flex flex-col h-screen">

      <div className="flex-1">
        <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
          <div className="flex justify-center gap-4">
            <NavLink
              to="bank"
              className={({ isActive }) =>
                `font-bold flex-1 px-3 py-3 text-center border rounded ${
                  isActive
                    ? "bg-gray-200"
                    : "bg-white text-custom-blue hover:bg-gray-300 hover:text-black"
                }`
              }
            >
              Bank
            </NavLink>
            <NavLink
              to="transcode"
              className={({ isActive }) =>
                `font-bold flex-1 px-3 py-3 text-center border rounded ${
                  isActive
                    ? "bg-gray-200"
                    : "bg-white text-custom-blue hover:bg-gray-300 hover:text-black"
                }`
              }
            >
              Transcode
            </NavLink>
          </div>
          <div className="mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceExternal;
