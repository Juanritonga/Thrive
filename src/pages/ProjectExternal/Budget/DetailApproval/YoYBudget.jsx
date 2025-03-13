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
  },
];

const YoYBudget = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [items] = useState(testData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
      <div className="flex flex-wrap justify-between items-center gap-4">
        <span className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, items.length)} of {items.length} entries
        </span>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
            <button
              className="px-4 py-2 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(Math.ceil(items.length / itemsPerPage))].map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-custom-blue text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="px-4 py-2 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(items.length / itemsPerPage)}
            >
              &gt;
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <select
              className="px-4 py-2 border rounded-md text-white bg-custom-blue"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={10}>10 Baris</option>
              <option value={20}>20 Baris</option>
              <option value={50}>50 Baris</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoYBudget;