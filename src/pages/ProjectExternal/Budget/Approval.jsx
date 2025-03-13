import { useState } from "react";
import { Link } from "react-router-dom";

export const testData = [
  {
    entity: "ENT001",
    projectID: "PRO001",
    totalBudget: "Rp 10.000.000.000",
    projectLength: "2025 - 2029",
    status: "Approved",
  },
  {
    entity: "ENT002",
    projectID: "PRO002",
    totalBudget: "Rp 10.000.000.000",
    projectLength: "2025 - 2029",
    status: "Rejected",
  },
];

const Approval = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(testData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [error, setError] = useState("");

  const [newItem, setNewItem] = useState({
    entity: "",
    projectID: "",
    totalBudget: "",
    projectLength: "",
    status: "Approved",
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

  const handleOpenModal = () => {
    setError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    if (
      !newItem.entity ||
      !newItem.projectID ||
      !newItem.totalBudget ||
      !newItem.projectLength
    ) {
      setError("Isi semua field terlebih dahulu.");
      return;
    }

    if (items.some((item) => item.projectID === newItem.projectID)) {
      setError("Project ID sudah ada. Harap gunakan Project ID yang unik.");
      return;
    }

    setItems([...items, newItem]);
    setNewItem({
      entity: "",
      projectID: "",
      totalBudget: "",
      projectLength: "",
      status: "Approved",
    });
    handleCloseModal();
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
              <th className="py-3 px-4 border">Entity</th>
              <th className="py-3 px-4 border">Project ID</th>
              <th className="py-3 px-4 border">Total Budget</th>
              <th className="py-3 px-4 border">Project Length</th>
              <th className="py-3 px-4 border">Status</th>
              <th className="py-3 px-4 border">YoY Budget</th>
              <th className="py-3 px-4 border">Breakdown</th>
              <th className="py-3 px-4 border">Approval</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={index}
                className="border-t text-center text-custom-blue2"
              >
                <td className="py-3 px-4">{item.entity}</td>
                <td className="py-3 px-4">{item.projectID}</td>
                <td className="py-3 px-4">{item.totalBudget}</td>
                <td className="py-3 px-4">{item.projectLength}</td>
                <td className="py-3 px-4">{item.status}</td>
                <td className="py-3 px-4 border">
                  <Link to="/budget/approval/yoy-budget">
                    <button className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg items-center w-12 h-12">
                      <i className="fa-solid fa-square-poll-vertical"></i>
                    </button>
                  </Link>
                </td>
                <td className="py-3 px-4 border">
                  <Link to="/budget/approval/breakdown">
                    <button className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg  items-center  w-12 h-12">
                      <i className="fa-solid fa-list-ul"></i>
                    </button>
                  </Link>
                </td>
                <td className="py-3 px-4 border">
                  <button className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg  items-center  w-12 h-12">
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">User ID</label>
                  <input
                    type="text"
                    name="entity"
                    value={newItem.entity}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    name="projectID"
                    value={newItem.projectID}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Staff Submit</label>
                  <input
                    type="text"
                    name="totalBudget"
                    value={newItem.totalBudget}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Division</label>
                  <input
                    type="text"
                    name="projectLength"
                    value={newItem.projectLength}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Department</label>
                  <input
                    type="text"
                    name="projectLength"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Document No.</label>
                  <input
                    type="text"
                    name="projectLength"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Document Date</label>
                  <input
                    type="text"
                    name="projectLength"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Description</label>
                  <input
                    type="text"
                    name="projectLength"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Reference No.</label>
                  <input
                    type="text"
                    name="projectLength"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Currency</label>
                  <input
                    type="text"
                    name="projectLength"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Amount</label>
                  <input
                    type="text"
                    name="projectLength"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Approval Status</label>
                  <select
                    name="status"
                    value={newItem.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={newItem.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="3"
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

export default Approval;
