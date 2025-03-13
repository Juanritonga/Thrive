import { useState } from "react";


export const testData = [
    {
      entity: "Entity001",
      projectId: "PROJ001",
      year: 2024,
      month: "January",
      budget: 100000,
    },
    {
      entity: "Entity002",
      projectId: "PROJ002",
      year: 2024,
      month: "February",
      budget: 150000,
    },
    {
      entity: "Entity003",
      projectId: "PROJ003",
      year: 2024,
      month: "March",
      budget: 200000,
    },
    {
      entity: "Entity004",
      projectId: "PROJ004",
      year: 2024,
      month: "April",
      budget: 175000,
    },
    {
      entity: "Entity005",
      projectId: "PROJ005",
      year: 2024,
      month: "May",
      budget: 120000,
    },
    {
      entity: "Entity006",
      projectId: "PROJ006",
      year: 2024,
      month: "June",
      budget: 250000,
    },
    {
      entity: "Entity007",
      projectId: "PROJ007",
      year: 2024,
      month: "July",
      budget: 300000,
    },
    {
      entity: "Entity008",
      projectId: "PROJ008",
      year: 2024,
      month: "August",
      budget: 180000,
    },
    {
      entity: "Entity009",
      projectId: "PROJ009",
      year: 2024,
      month: "September",
      budget: 160000,
    },
    {
      entity: "Entity010",
      projectId: "PROJ010",
      year: 2024,
      month: "October",
      budget: 140000,
    },
    {
      entity: "Entity011",
      projectId: "PROJ011",
      year: 2024,
      month: "November",
      budget: 210000,
    },
    {
      entity: "Entity012",
      projectId: "PROJ012",
      year: 2024,
      month: "December",
      budget: 230000,
    }
  ];
  

const YoYBudget = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Hitung total halaman
  const totalPages = Math.ceil(testData.length / itemsPerPage);

  // Ambil data untuk halaman saat ini
  const currentData = testData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
      <div className="overflow-auto shadow-sm mb-6">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="text-custom-blue bg-gray-200">
              <th className="py-3 px-4 border">Entity</th>
              <th className="py-3 px-4 border">Project ID</th>
              <th className="py-3 px-4 border">Year</th>
              <th className="py-3 px-4 border">Month</th>
              <th className="py-3 px-4 border">Budget</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className="border-t text-center text-custom-blue2">
                <td className="py-3 px-4">{item.entity}</td>
                <td className="py-3 px-4">{item.projectId}</td>
                <td className="py-3 px-4">{item.year}</td>
                <td className="py-3 px-4">{item.month}</td>
                <td className="py-3 px-4">{item.budget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-4">
        <button
          className={`px-4 py-2 border rounded ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="py-2 px-4 border rounded">{currentPage} / {totalPages}</span>
        <button
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default YoYBudget;
