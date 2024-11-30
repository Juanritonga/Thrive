import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";

const CashBook = () => {
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

  return (
    <div className="flex flex-col h-screen">
      {/* Judul Besar (Selalu "Cash Book") */}
      <div className="text-black">
        <h1 className="text-2xl font-bold text-custom-blue ml-3 mt-4">CASH BOOK</h1>
        <div className="text-sm">{getBreadcrumbs()}</div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default CashBook;
