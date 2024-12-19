import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

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
    <div className="sticky top-0 left-0 right-0 bg-custom-blue flex w-full items-center justify-between py-4 h-20">
      <div className="flex items-center h-full">
        <img
          src="../thrive.png"
          alt="Company Logo"
          className="h-full object-contain mr-4 ml-4"
        />
        {role !== "Super Admin" && (
          <select className="bg-white text-gray-400 p-2 rounded w-full ml-40 sm:w-60">
            <option>Project</option>
          </select>
        )}
      </div>

      <div className="flex items-center sm:mt-0">
        <div className="flex items-center text-black p-2 rounded mr-4">
          <div className="font-bold bg-white text-custom-blue mr-2 p-4 rounded-lg flex items-center justify-center w-12 h-12">
            {name.charAt(0)}
          </div>
          <div className="min-w-0 mr-5">
            <div className="font-bold text-white text-sm truncate">{name}</div>
            <div className="text-xs text-white truncate">{role}</div>
          </div>
        </div>

        <i
          className="fa fa-sign-out bg-white text-custom-blue mr-2 p-4 rounded-lg cursor-pointer"
          onClick={handleLogout}
        ></i>

        <button
          className="font-bold text-white p-2 rounded hidden sm:block mr-5"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Header;
