import { useState } from "react";

export const testData = [
  {
    entity: "CLA001",
    projectId: "PROJ001",
    phaseID: "PHA001",
    propertyID: "PRO001",
    phasePropertyID: "PHP001",
    lotNumber: "001",
    landArea: "10.000 m2",
    buildingArea: "6.000 m2",
    budgetAmount: "Rp 10.000.000.000",
  },
  {
    entity: "CLA002",
    projectId: "PROJ002",
    phaseID: "PHA002",
    propertyID: "PRO002",
    phasePropertyID: "PHP002",
    lotNumber: "002",
    landArea: "12.500 m2",
    buildingArea: "7.200 m2",
    budgetAmount: "Rp 12.500.000.000",
  },
  {
    entity: "CLA003",
    projectId: "PROJ003",
    phaseID: "PHA003",
    propertyID: "PRO003",
    phasePropertyID: "PHP003",
    lotNumber: "003",
    landArea: "8.000 m2",
    buildingArea: "5.000 m2",
    budgetAmount: "Rp 8.000.000.000",
  },
  {
    entity: "CLA004",
    projectId: "PROJ004",
    phaseID: "PHA004",
    propertyID: "PRO004",
    phasePropertyID: "PHP004",
    lotNumber: "004",
    landArea: "15.000 m2",
    buildingArea: "9.000 m2",
    budgetAmount: "Rp 15.000.000.000",
  },
  {
    entity: "CLA005",
    projectId: "PROJ005",
    phaseID: "PHA005",
    propertyID: "PRO005",
    phasePropertyID: "PHP005",
    lotNumber: "005",
    landArea: "9.500 m2",
    buildingArea: "6.500 m2",
    budgetAmount: "Rp 9.500.000.000",
  },
  {
    entity: "CLA006",
    projectId: "PROJ006",
    phaseID: "PHA006",
    propertyID: "PRO006",
    phasePropertyID: "PHP006",
    lotNumber: "006",
    landArea: "11.000 m2",
    buildingArea: "7.800 m2",
    budgetAmount: "Rp 11.000.000.000",
  },
  {
    entity: "CLA007",
    projectId: "PROJ007",
    phaseID: "PHA007",
    propertyID: "PRO007",
    phasePropertyID: "PHP007",
    lotNumber: "007",
    landArea: "13.000 m2",
    buildingArea: "8.500 m2",
    budgetAmount: "Rp 13.000.000.000",
  },
  {
    entity: "CLA008",
    projectId: "PROJ008",
    phaseID: "PHA008",
    propertyID: "PRO008",
    phasePropertyID: "PHP008",
    lotNumber: "008",
    landArea: "7.000 m2",
    buildingArea: "4.500 m2",
    budgetAmount: "Rp 7.000.000.000",
  },
  {
    entity: "CLA009",
    projectId: "PROJ009",
    phaseID: "PHA009",
    propertyID: "PRO009",
    phasePropertyID: "PHP009",
    lotNumber: "009",
    landArea: "14.000 m2",
    buildingArea: "9.500 m2",
    budgetAmount: "Rp 14.000.000.000",
  },
  {
    entity: "CLA010",
    projectId: "PROJ010",
    phaseID: "PHA010",
    propertyID: "PRO010",
    phasePropertyID: "PHP010",
    lotNumber: "010",
    landArea: "10.500 m2",
    buildingArea: "6.700 m2",
    budgetAmount: "Rp 10.500.000.000",
  },
  {
    entity: "CLA011",
    projectId: "PROJ011",
    phaseID: "PHA011",
    propertyID: "PRO011",
    phasePropertyID: "PHP011",
    lotNumber: "011",
    landArea: "16.000 m2",
    buildingArea: "10.000 m2",
    budgetAmount: "Rp 16.000.000.000",
  },
  {
    entity: "CLA012",
    projectId: "PROJ012",
    phaseID: "PHA012",
    propertyID: "PRO012",
    phasePropertyID: "PHP012",
    lotNumber: "012",
    landArea: "8.500 m2",
    buildingArea: "5.800 m2",
    budgetAmount: "Rp 8.500.000.000",
  },
  {
    entity: "CLA013",
    projectId: "PROJ013",
    phaseID: "PHA013",
    propertyID: "PRO013",
    phasePropertyID: "PHP013",
    lotNumber: "013",
    landArea: "11.500 m2",
    buildingArea: "7.300 m2",
    budgetAmount: "Rp 11.500.000.000",
  },
  {
    entity: "CLA014",
    projectId: "PROJ014",
    phaseID: "PHA014",
    propertyID: "PRO014",
    phasePropertyID: "PHP014",
    lotNumber: "014",
    landArea: "9.000 m2",
    buildingArea: "6.200 m2",
    budgetAmount: "Rp 9.000.000.000",
  },
  {
    entity: "CLA015",
    projectId: "PROJ015",
    phaseID: "PHA015",
    propertyID: "PRO015",
    phasePropertyID: "PHP015",
    lotNumber: "015",
    landArea: "12.000 m2",
    buildingArea: "8.000 m2",
    budgetAmount: "Rp 12.000.000.000",
  },
];

const Breakdown = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(testData.length / itemsPerPage);
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
              <th className="py-3 px-4 border">Phase ID</th>
              <th className="py-3 px-4 border">Property ID</th>
              <th className="py-3 px-4 border">Phase Property ID</th>
              <th className="py-3 px-4 border">Lot Number</th>
              <th className="py-3 px-4 border">Land Area</th>
              <th className="py-3 px-4 border">Building Area</th>
              <th className="py-3 px-4 border">Budget Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className="border-t text-center text-custom-blue2">
                <td className="py-3 px-4">{item.entity}</td>
                <td className="py-3 px-4">{item.projectId}</td>
                <td className="py-3 px-4">{item.phaseID}</td>
                <td className="py-3 px-4">{item.propertyID}</td>
                <td className="py-3 px-4">{item.phasePropertyID}</td>
                <td className="py-3 px-4">{item.lotNumber}</td>
                <td className="py-3 px-4">{item.landArea}</td>
                <td className="py-3 px-4">{item.buildingArea}</td>
                <td className="py-3 px-4">{item.budgetAmount}</td>
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

export default Breakdown;