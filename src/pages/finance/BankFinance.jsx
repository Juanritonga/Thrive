import { useState } from "react";
import SearchBar from "@/components/SearchBar";

const BankFinance = () => {
  const dummyBanks = [
    {
      bank_id: "BNK001",
      bank: "BCA",
      account_number: "4440000333311",
      created_by: "Jon Pantau",
      updated_at: "2024-01-01",
      status: "Active",
    },
    {
      bank_id: "BNK001",
      bank: "BCA",
      account_number: "4440000333311",
      created_by: "Jon Pantau",
      updated_at: "2024-01-02",
      status: "Inactive",
    },
    {
      bank_id: "BNK001",
      bank: "BCA",
      account_number: "4440000333311",
      created_by: "Jon Pantau",
      updated_at: "2024-01-03",
      status: "Inactive",
    },
    {
      bank_id: "BNK001",
      bank: "BCA",
      account_number: "4440000333311",
      created_by: "Jon Pantau",
      updated_at: "2024-01-03",
      status: "Inactive",
    },
    {
      bank_id: "BNK001",
      bank: "BCA",
      account_number: "4440000333311",
      created_by: "Jon Pantau",
      updated_at: "2024-01-03",
      status: "Active",
    },
    {
      bank_id: "BNK001",
      bank: "BCA",
      account_number: "4440000333311",
      created_by: "Jon Pantau",
      updated_at: "2024-01-03",
      status: "Active",
    },
  ];

  const [banks, setBanks] = useState(dummyBanks);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [newBank, setNewBank] = useState({
    bank_id: "",
    bank: "",
    account_number: "",
    created_by: "",
    updated_at: new Date().toISOString().split("T")[0],
    status: "Active",
  });
  const [editMode, setEditMode] = useState(false);

  const indexOfLastItem = currentPage * limit;
  const indexOfFirstItem = indexOfLastItem - limit;

  const filteredData = banks.filter((bank) =>
    Object.values(bank)
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
    setNewBank({
      bank_id: "",
      bank: "",
      account_number: "",
      created_by: "",
      updated_at: new Date().toISOString().split("T")[0],
      status: "Active",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewBank({
      bank_id: "",
      bank: "",
      account_number: "",
      created_by: "",
      updated_at: new Date().toISOString().split("T")[0],
      status: "Active",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBank((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveNewBank = (e) => {
    e.preventDefault();
    if (editMode) {
      setBanks((prev) =>
        prev.map((bank) =>
          bank.bank_id === newBank.bank_id ? { ...newBank } : bank
        )
      );
    } else {
      setBanks((prev) => [...prev, newBank]);
    }
    setShowModal(false);
  };

  const handleEdit = (bank) => {
    setNewBank(bank);
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari Bank"
        />
      </div>
      <div className="overflow-auto shadow-sm mb-6">
        {paginatedData.length === 0 ? (
          <p>No banks found.</p>
        ) : (
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="text-custom-blue bg-gray-200">
                <th className="py-3 px-4 border">Bank ID</th>
                <th className="py-3 px-4 border">Bank Name</th>
                <th className="py-3 px-4 border">Acct. Number</th>
                <th className="py-3 px-4 border">Dibuat Oleh</th>
                <th className="py-3 px-4 border">Tanggal Update</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((bank) => (
                <tr
                  key={bank.bank_id}
                  className="cursor-pointer border-t text-center text-custom-blue2"
                >
                  <td className="py-3 px-4">{bank.bank_id}</td>
                  <td className="py-3 px-4">{bank.bank}</td>
                  <td className="py-3 px-4">{bank.account_number}</td>
                  <td className="py-3 px-4">{bank.created_by}</td>
                  <td className="py-3 px-4">
                    {new Date(bank.updated_at)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
                        bank.status.toLowerCase() === "active"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {bank.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(bank)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[600px] relative">
            <div className="bg-blue-900 text-white px-4 py-3 rounded-t-lg text-lg font-semibold text-left">
              {editMode ? "Edit Bank" : "Tambah Baru"}
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
              <form onSubmit={handleSaveNewBank}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-bold">Bank ID</label>
                    <input
                      type="text"
                      name="bank_id"
                      className="border rounded-md p-2 w-full"
                      value={newBank.bank_id}
                      onChange={handleInputChange}
                      required
                      disabled={editMode}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold">Bank Name</label>
                    <input
                      type="text"
                      name="bank"
                      className="border rounded-md p-2 w-full"
                      value={newBank.bank}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold">Account No.</label>
                    <input
                      type="text"
                      name="account_number"
                      className="border rounded-md p-2 w-full"
                      value={newBank.account_number}
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
                      value={newBank.created_by}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold">Status</label>
                    <select
                      name="status"
                      className="border rounded-md p-2 w-full"
                      value={newBank.status}
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

export default BankFinance;
