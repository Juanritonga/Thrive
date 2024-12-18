import { useState } from "react";

const TranscodeFinance = () => {
  const dummyTranscodes = [
    {
      transcode_id: "TRNS001",
      transaction_type: "General Ledger",
      transcode: "GL",
      created_by: "Jon Pantau",
      updated_at: "2024-01-01",
      status: "Active",
    },
    {
      transcode_id: "TRNS001",
      transaction_type: "Account Payable",
      transcode: "AP",
      created_by: "Jon Pantau",
      updated_at: "2024-01-02",
      status: "Inactive",
    },
    {
      transcode_id: "TRNS001",
      transaction_type: "Account Receivable",
      transcode: "AR",
      created_by: "Jon Pantau",
      updated_at: "2024-01-03",
      status: "Inactive",
    },
    {
      transcode_id: "TRNS001",
      transaction_type: "Purchase Order",
      transcode: "PO",
      created_by: "Jon Pantau",
      updated_at: "2024-01-03",
      status: "Inactive",
    },
    {
      transcode_id: "TRNS001",
      transaction_type: "Sales",
      transcode: "SA",
      created_by: "Jon Pantau",
      updated_at: "2024-01-03",
      status: "Active",
    },
    {
      transcode_id: "TRNS001",
      transaction_type: "Purchase Request",
      transcode: "PR",
      created_by: "Jon Pantau",
      updated_at: "2024-01-03",
      status: "Active",
    },
  ];

  const [transcodes, setTranscodes] = useState(dummyTranscodes);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [newTranscode, setNewTranscode] = useState({
    transcode_id: "",
    transaction_type: "",
    transcode: "",
    created_by: "",
    updated_at: new Date().toISOString().split("T")[0],
    status: "Active",
  });
  const [editMode, setEditMode] = useState(false);

  const indexOfLastItem = currentPage * limit;
  const indexOfFirstItem = indexOfLastItem - limit;

  const filteredData = transcodes.filter((transcode) =>
    Object.values(transcode)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleTambahBaru = () => {
    setShowModal(true);
    setEditMode(false);
    setNewTranscode({
      transcode_id: "",
      transaction_type: "",
      transcode: "",
      created_by: "",
      updated_at: new Date().toISOString().split("T")[0],
      status: "Active",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTranscode((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveTranscode = (e) => {
    e.preventDefault();
    if (editMode) {
      setTranscodes((prev) =>
        prev.map((transcode) =>
          transcode.transcode_id === newTranscode.transcode_id
            ? { ...newTranscode }
            : transcode
        )
      );
    } else {
      setTranscodes((prev) => [...prev, newTranscode]);
    }
    setShowModal(false);
  };

  const handleEdit = (transcode) => {
    setNewTranscode(transcode);
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <div className="relative w-full sm:w-[300px]">
          <input
            type="text"
            placeholder="Cari Transcode"
            className="pl-6 pr-10 py-3 w-full border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass absolute right-2 top-1/2 transform -translate-y-1/2 text-custom-blue"></i>
        </div>
        <button
          onClick={handleTambahBaru}
          className="bg-custom-blue text-white py-2 px-4 rounded-md"
        >
          + Tambah Baru
        </button>
      </div>
      <div className="overflow-auto shadow-sm mb-6">
        {paginatedData.length === 0 ? (
          <p>No transcodes found.</p>
        ) : (
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="text-custom-blue bg-gray-200">
                <th className="py-3 px-4 border">Transcode ID</th>
                <th className="py-3 px-4 border">Transaction Type</th>
                <th className="py-3 px-4 border">Transcode</th>
                <th className="py-3 px-4 border">Dibuat Oleh</th>
                <th className="py-3 px-4 border">Tanggal Update</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((transcode) => (
                <tr
                  key={transcode.transcode_id}
                  className="cursor-pointer border-t text-center text-custom-blue2"
                >
                  <td className="py-3 px-4">{transcode.transcode_id}</td>
                  <td className="py-3 px-4">{transcode.transaction_type}</td>
                  <td className="py-3 px-4">{transcode.transcode}</td>
                  <td className="py-3 px-4">{transcode.created_by}</td>
                  <td className="py-3 px-4">
                    {new Date(transcode.updated_at)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
                        transcode.status.toLowerCase() === "active"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {transcode.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(transcode)}
                      className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg w-12 h-12"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <span className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length} entries
        </span>
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center space-x-3">
            <button
              className="px-4 py-2 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
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
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
          <select
            className="px-4 py-2 border rounded-md text-white bg-custom-blue"
            value={limit}
            onChange={(e) => {
              setCurrentPage(1);
              setLimit(Number(e.target.value));
            }}
          >
            <option value={10}>10 Rows</option>
            <option value={20}>20 Rows</option>
            <option value={50}>50 Rows</option>
          </select>
        </div>
      </div>

      {showModal && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-[600px] relative">
      <div className="bg-blue-900 text-white px-4 py-3 rounded-t-lg text-lg font-semibold text-left">
        {editMode ? "Edit Transcode" : "Tambah Baru"}
      </div>
      <button
        onClick={handleCloseModal}
        className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 text-2xl font-bold"
        style={{
          lineHeight: "1",
          borderRadius: "50%",
        }}
      >
        &times;
      </button>
      <div className="p-6">
        <form onSubmit={handleSaveTranscode}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-bold">Transcode ID</label>
              <input
                type="text"
                name="transcode_id"
                className="border rounded-md p-2 w-full"
                value={newTranscode.transcode_id}
                onChange={handleInputChange}
                required
                disabled={editMode}
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">Transaction Type</label>
              <input
                type="text"
                name="transaction_type"
                className="border rounded-md p-2 w-full"
                value={newTranscode.transaction_type}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">Transcode</label>
              <input
                type="text"
                name="transcode"
                className="border rounded-md p-2 w-full"
                value={newTranscode.transcode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">Created By</label>
              <input
                type="text"
                name="created_by"
                className="border rounded-md p-2 w-full"
                value={newTranscode.created_by}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">Status</label>
              <select
                name="status"
                className="border rounded-md p-2 w-full"
                value={newTranscode.status}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default TranscodeFinance;
