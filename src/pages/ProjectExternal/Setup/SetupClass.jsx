import { useState } from "react";

export const testData = [
  {
    classID: "CLA001",
    description: "Journal Memorial",
    costType: "Cost",
    costAllocation: "Sellable Area",
    chargeType: "Land",
    madeBy: "Jon Pantau",
    updateDate: "19-01-2024",
  },
  {
    classID: "CLA002",
    description: "Journal Memorial",
    costType: "Cost",
    costAllocation: "Sellable Area",
    chargeType: "Land",
    madeBy: "Jon Pantau",
    updateDate: "19-01-2024",
  },
  {
    classID: "CLA003",
    description: "General Ledger",
    costType: "Revenue",
    costAllocation: "Rentable Area",
    chargeType: "Building",
    madeBy: "Alice Smith",
    updateDate: "20-01-2024",
  },
  {
    classID: "CLA004",
    description: "Accounts Payable",
    costType: "Expense",
    costAllocation: "Common Area",
    chargeType: "Maintenance",
    madeBy: "Bob Johnson",
    updateDate: "21-01-2024",
  },
  {
    classID: "CLA005",
    description: "Accounts Receivable",
    costType: "Revenue",
    costAllocation: "Sellable Area",
    chargeType: "Land",
    madeBy: "Charlie Brown",
    updateDate: "22-01-2024",
  },
  {
    classID: "CLA006",
    description: "Fixed Assets",
    costType: "Cost",
    costAllocation: "Building Area",
    chargeType: "Depreciation",
    madeBy: "Diana Prince",
    updateDate: "23-01-2024",
  },
  {
    classID: "CLA007",
    description: "Inventory Management",
    costType: "Cost",
    costAllocation: "Storage Area",
    chargeType: "Handling",
    madeBy: "Evan Wright",
    updateDate: "24-01-2024",
  },
  {
    classID: "CLA008",
    description: "Payroll",
    costType: "Expense",
    costAllocation: "Office Area",
    chargeType: "Salaries",
    madeBy: "Fiona Green",
    updateDate: "25-01-2024",
  },
  {
    classID: "CLA009",
    description: "Tax Reporting",
    costType: "Expense",
    costAllocation: "Common Area",
    chargeType: "Taxes",
    madeBy: "George Black",
    updateDate: "26-01-2024",
  },
  {
    classID: "CLA010",
    description: "Budgeting",
    costType: "Planning",
    costAllocation: "Sellable Area",
    chargeType: "Forecast",
    madeBy: "Hannah White",
    updateDate: "27-01-2024",
  },
  {
    classID: "CLA011",
    description: "Financial Reporting",
    costType: "Revenue",
    costAllocation: "Rentable Area",
    chargeType: "Analysis",
    madeBy: "Ian Blue",
    updateDate: "28-01-2024",
  },
  {
    classID: "CLA012",
    description: "Cash Flow",
    costType: "Cost",
    costAllocation: "Common Area",
    chargeType: "Liquidity",
    madeBy: "Jenna Red",
    updateDate: "29-01-2024",
  },
  {
    classID: "CLA013",
    description: "Audit Trail",
    costType: "Expense",
    costAllocation: "Office Area",
    chargeType: "Compliance",
    madeBy: "Kevin Yellow",
    updateDate: "30-01-2024",
  },
  {
    classID: "CLA014",
    description: "Depreciation Schedule",
    costType: "Cost",
    costAllocation: "Building Area",
    chargeType: "Depreciation",
    madeBy: "Laura Purple",
    updateDate: "31-01-2024",
  },
  {
    classID: "CLA015",
    description: "Project Accounting",
    costType: "Revenue",
    costAllocation: "Sellable Area",
    chargeType: "Billing",
    madeBy: "Mike Orange",
    updateDate: "01-02-2024",
  },
];

const SetupClass = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(testData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [newItem, setNewItem] = useState({
    classID: "",
    description: "",
    costType: "",
    costAllocation: "",
    chargeType: "",
    madeBy: "Default User",
    updateDate: new Date().toLocaleDateString("en-GB"),
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = items.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    if (
      newItem.classID &&
      newItem.description &&
      newItem.costType &&
      newItem.costAllocation &&
      newItem.chargeType
    ) {
      setItems([...items, newItem]);
      setNewItem({
        classID: "",
        description: "",
        costType: "",
        costAllocation: "",
        chargeType: "",
        madeBy: "Default User",
        updateDate: new Date().toLocaleDateString("en-GB"),
      });
      handleCloseModal();
    } else {
      alert("Isi semua field terlebih dahulu.");
    }
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <div className="relative w-full sm:w-[300px]">
          <input
            type="text"
            placeholder="Cari"
            className="pl-6 pr-10 py-3 w-full border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass absolute right-2 top-1/2 transform -translate-y-1/2 text-custom-blue"></i>
        </div>

        <button
          className="bg-custom-blue text-white px-4 py-2 rounded-lg w-full sm:w-auto flex items-center justify-center space-x-2"
          onClick={handleOpenModal}
        >
          <i className="fa-solid fa-plus text-white"></i>
          <span>Tambah Baru</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto shadow-sm mb-6">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="text-custom-blue bg-gray-200">
              <th className="py-3 px-4 border">Class ID</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">Cost Type</th>
              <th className="py-3 px-4 border">Cost Allocation</th>
              <th className="py-3 px-4 border">Charge Type</th>
              <th className="py-3 px-4 border">Made By</th>
              <th className="py-3 px-4 border">Update Date</th>
              <th className="py-3 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={index}
                className="border-t text-center text-custom-blue2"
              >
                <td className="py-3 px-4">{item.classID}</td>
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4">{item.costType}</td>
                <td className="py-3 px-4">{item.costAllocation}</td>
                <td className="py-3 px-4">{item.chargeType}</td>
                <td className="py-3 px-4">{item.madeBy}</td>
                <td className="py-3 px-4">{item.updateDate}</td>
                <td className="py-3 px-4">
                  <button className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg  items-center  w-12 h-12">
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <span className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length} entries
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
            {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map(
              (_, index) => (
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
              )
            )}
            <button
              className="px-4 py-2 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredData.length / itemsPerPage)
              }
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

      {/* Modal Tambah Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg w-[600px]">
            <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
              <h2 className="text-lg">Tambah Baru</h2>
              <button className="text-white" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Class ID</label>
                  <input
                    type="text"
                    name="classID"
                    value={newItem.classID}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={newItem.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Cost Type</label>
                  <input
                    type="text"
                    name="costType"
                    value={newItem.costType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Cost Allocation</label>
                  <input
                    type="text"
                    name="costAllocation"
                    value={newItem.costAllocation}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Charge Type</label>
                  <input
                    type="text"
                    name="chargeType"
                    value={newItem.chargeType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-4 mt-6">
                <button
                  className="w-1/2 py-2 bg-red-400 text-white rounded hover:bg-red-500"
                  onClick={handleCloseModal}
                >
                  Batal
                </button>
                <button
                  className="w-1/2 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
                  onClick={handleAddItem}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetupClass;