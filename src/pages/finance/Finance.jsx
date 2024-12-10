import { NavLink, Outlet, useLocation, Link } from "react-router-dom";

const Finance = () => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    const breadcrumbPath = [
      <Link
        key="dashboard"
        to="/"
        className="ml-4 text-custom-blue fa-solid fa-calculator"
      />,
    ];

    paths.forEach((path, index) => {
      const to = `/${paths.slice(0, index + 1).join("/")}`;
      breadcrumbPath.push(
        <span key={to} className="mx-1">
          {" > "}
          <Link
            to={to}
            className={`text-custom-blue ${
              location.pathname === to ? "font-bold" : "text-gray-500"
            }`}
          >
            {path.charAt(0).toUpperCase() + path.slice(1)}
          </Link>
        </span>
      );
    });

    return breadcrumbPath;
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="text-black">
        <h1 className="text-2xl font-bold text-custom-blue ml-3 mt-4">
          MASTER DATA
        </h1>
        <div className="text-sm">{getBreadcrumbs()}</div>
      </div>

      <div className="flex-1">
        <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
          <div className="flex justify-center gap-4">
            {/* Bank Tab */}
            <NavLink
              to="bank"
              className={({ isActive }) =>
                `font-bold flex-1 px-3 py-3 text-center border rounded transition-all duration-300 ${
                  isActive
                    ? "bg-custom-blue text-white shadow-lg scale-105"
                    : "bg-white text-custom-blue hover:bg-gray-300 hover:text-black"
                }`
              }
            >
              Bank
            </NavLink>

            {/* Transcode Tab */}
            <NavLink
              to="transcode"
              className={({ isActive }) =>
                `font-bold flex-1 px-3 py-3 text-center border rounded transition-all duration-300 ${
                  isActive
                    ? "bg-custom-blue text-white shadow-lg scale-105"
                    : "bg-white text-custom-blue hover:bg-gray-300 hover:text-black"
                }`
              }
            >
              Transcode
            </NavLink>
          </div>

          {/* Nested Routes */}
          <div className="mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
