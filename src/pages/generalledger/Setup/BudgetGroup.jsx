import { useState } from "react";

const BudgetGroup = () => {
  const dummyBudgetGroup = [
    {
      budget_version: "BG2021",
      description: "Budget Operasional 2021",
      tahun: "2021",
      created_by: "Jon Pantau",
      updated_at: "2024-01-01",
      status: "Active",
    },
    {
      budget_version: "BG2022",
      description: "Budget Operasional 2022",
      tahun: "2022",
      created_by: "Jon Pantau",
      updated_at: "2024-01-02",
      status: "Inactive",
    },
    {
      budget_version: "BG2023",
      description: "Budget Operasional 2023",
      tahun: "2023",
      created_by: "Jon Pantau",
      updated_at: "2024-01-03",
      status: "Inactive",
    },
  ];

  const [budgetGroups, setBudgetGroups] = useState(dummyBudgetGroup);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [newBudgetGroup, setNewBudgetGroup] = useState({
    budget_version: "",
    description: "",
    tahun: "",
    created_by: "",
    updated_at: new Date().toISOString().split("T")[0],
    status: "Active",
  });
  const [editMode, setEditMode] = useState(false);

  const indexOfLastItem = currentPage * limit;
  const indexOfFirstItem = indexOfLastItem - limit;

  const filteredData = budgetGroups.filter((budgetGroup) =>
    Object.values(budgetGroup)
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
    setNewBudgetGroup({
      budget_version: "",
      description: "",
      tahun: "",
      created_by: "",
      updated_at: new Date().toISOString().split("T")[0],
      status: "Active",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewBudgetGroup({
      budget_version: "",
      description: "",
      tahun: "",
      created_by: "",
      updated_at: new Date().toISOString().split("T")[0],
      status: "Active",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudgetGroup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveNewBudgetGroup = (e) => {
    e.preventDefault();
    if (editMode) {
      setBudgetGroups((prev) =>
        prev.map((budgetGroup) =>
          budgetGroup.budget_version === newBudgetGroup.budget_version
            ? { ...newBudgetGroup }
            : budgetGroup
        )
      );
    } else {
      setBudgetGroups((prev) => [...prev, newBudgetGroup]);
    }
    setShowModal(false);
  };

  const handleEdit = (budgetGroup) => {
    setNewBudgetGroup(budgetGroup);
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <div className="relative w-full sm:w-[300px]">
          <input
            type="text"
            placeholder="Cari Budget Group"
            className="pl-6 pr-10 py-3 w-full border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass absolute right-2 top-1/2 transform -translate-y-1/2 text-custom-blue"></i>
        </div>
        <button
          onClick={handleTambahBaru}
          className="bg-custom-blue text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          + Tambah Baru
        </button>
      </div>
      <div className="overflow-auto shadow-sm mb-6">
        {paginatedData.length === 0 ? (
          <p>No budget groups found.</p>
        ) : (
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="text-custom-blue bg-gray-200">
                <th className="py-3 px-4 border">Budget Version</th>
                <th className="py-3 px-4 border">Description</th>
                <th className="py-3 px-4 border">Tahun</th>
                <th className="py-3 px-4 border">Dibuat Oleh</th>
                <th className="py-3 px-4 border">Tanggal Update</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((budgetGroup) => (
                <tr
                  key={budgetGroup.budget_version}
                  className="cursor-pointer border-t text-center text-custom-blue2"
                >
                  <td className="py-3 px-4">{budgetGroup.budget_version}</td>
                  <td className="py-3 px-4">{budgetGroup.description}</td>
                  <td className="py-3 px-4">{budgetGroup.tahun}</td>
                  <td className="py-3 px-4">{budgetGroup.created_by}</td>
                  <td className="py-3 px-4">
                    {new Date(budgetGroup.updated_at).toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
                        budgetGroup.status.toLowerCase() === "active"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {budgetGroup.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(budgetGroup)}
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
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[600px] p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                padding: "8px",
                borderRadius: "50%",
              }}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-custom-blue mb-4">
              {editMode ? "Edit Budget Group" : "Tambah Baru"}
            </h2>
            <form onSubmit={handleSaveNewBudgetGroup}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-bold">Budget Version</label>
                  <input
                    type="text"
                    name="budget_version"
                    className="border rounded-md p-2 w-full"
                    value={newBudgetGroup.budget_version}
                    onChange={handleInputChange}
                    required
                    disabled={editMode}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold">Description</label>
                  <input
                    type="text"
                    name="description"
                    className="border rounded-md p-2 w-full"
                    value={newBudgetGroup.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold">Tahun</label>
                  <input
                    type="text"
                    name="tahun"
                    className="border rounded-md p-2 w-full"
                    value={newBudgetGroup.tahun}
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
                    value={newBudgetGroup.created_by}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold">Status</label>
                  <select
                    name="status"
                    className="border rounded-md p-2 w-full"
                    value={newBudgetGroup.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-4 rounded-md"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetGroup;
