import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";

const MasterData = () => {
  const location = useLocation();

  // Menentukan breadcrumb berdasarkan path
  const getBreadcrumbs = () => {
    const paths = location.pathname.split("/").filter(Boolean); // Mendapatkan path dalam array
    let breadcrumbPath = [];

    // Menambahkan "Dashboard" di awal breadcrumb dan memeriksa apakah itu halaman aktif
    breadcrumbPath.push(
      <Link
        key="dashboard"
        to="/"
        className={`ml-4 fa-solid fa-calculator text-custom-blue ${location.pathname === "/" ? "font-bold" : ""}`}
      >
      </Link>
    );

    // Menangani kasus default untuk /MasterData menjadi /MasterData/type
    if (location.pathname === "/MasterData") {
      paths.push("type");
    }

    // Menambahkan bagian breadcrumb selanjutnya dan mengarahkan ke halaman yang tepat
    paths.forEach((path, index) => {
      const to = `/${paths.slice(0, index + 1).join("/")}`; // Mengonstruir path lengkap
      breadcrumbPath.push(
        <span key={to}>
          {" > "}
          <Link
            to={to} // Mengarahkan ke halaman path ini
            className={`text-custom-blue ${location.pathname === to ? "font-bold" : "text-gray-500"}`}
          >
            {path.charAt(0).toUpperCase() + path.slice(1)} {/* Menampilkan nama path */}
          </Link>
        </span>
      );
    });

    return breadcrumbPath;
  };

  // Fungsi untuk menentukan kelas hover aktif
  const getLinkClass = (path) => {
    const isActive = location.pathname.includes(path); // Menentukan apakah link ini aktif
    return `flex-1 mx-2 border-2 font-bold text-center py-2 text-custom-blue rounded-lg ${isActive ? "bg-gray-200" : "bg-white hover:bg-gray-300"}`;
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Judul Besar (Selalu "Master Data") */}
      <div className="text-black">
        <h1 className="text-2xl font-bold text-custom-blue ml-3 mt-4">MASTER DATA</h1>
        <div className="text-sm">{getBreadcrumbs()}</div>
      </div>

      <div className="flex justify-around p-4 bg-gray-100 border-b">
        <Link to="type" className={getLinkClass("type")}>
          Type
        </Link>
        <Link to="class" className={getLinkClass("class")}>
          Class
        </Link>
        <Link to="location" className={getLinkClass("location")}>
          Location
        </Link>
        <Link to="master" className={getLinkClass("master")}>
          Master
        </Link>
      </div>

      {/* Content Outlet */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MasterData;
