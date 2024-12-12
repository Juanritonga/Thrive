import { NavLink, Outlet } from "react-router-dom";

const UserMasterData = () => {
  return (
    <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
      <div className="flex justify-center gap-4">
        <NavLink
          to="UserData"
          className={({ isActive }) =>
            `font-bold flex-1 px-3 py-3 bg-white text-custom-blue border rounded text-center ${isActive ? 'bg-gray-300' : 'hover:bg-gray-300'}`
          }
        >
          User Data
        </NavLink>
        <NavLink
          to="UserRole"
          className={({ isActive }) =>
            `font-bold flex-1 px-3 py-3 bg-white text-custom-blue border rounded text-center ${isActive ? 'bg-gray-300' : 'hover:bg-gray-300'}`
          }
        >
          User Role
        </NavLink>
        <NavLink
          to="RoleAccess"
          className={({ isActive }) =>
            `font-bold flex-1 px-3 py-3 bg-white text-custom-blue border rounded text-center ${isActive ? 'bg-gray-300' : 'hover:bg-gray-300'}`
          }
        >
          Role Access
        </NavLink>
        <NavLink
          to="Division"
          className={({ isActive }) =>
            `font-bold flex-1 px-3 py-3 bg-white text-custom-blue border rounded text-center ${isActive ? 'bg-gray-300' : 'hover:bg-gray-300'}`
          }
        >
          Divisi
        </NavLink>
        <NavLink
          to="Departement"
          className={({ isActive }) =>
            `font-bold flex-1 px-3 py-3 bg-white text-custom-blue border rounded text-center ${isActive ? 'bg-gray-300' : 'hover:bg-gray-300'}`
          }
        >
          Departement
        </NavLink>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default UserMasterData;
