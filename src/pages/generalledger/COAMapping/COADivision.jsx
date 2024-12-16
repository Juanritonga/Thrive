import { useState } from "react";

const COADivision = () => {
  const dummyCOADivision = [
    {
      division_code: "ACCT",
      department_code: "ACCT",
      start_code: "10000",
      end_code: "19999",
      created_by: "Jon Pantau",
      updated_at: "2024-01-01",
      status: "Active",
    },
    {
      division_code: "FIN",
      department_code: "FIN",
      start_code: "20000",
      end_code: "29999",
      created_by: "Jon Pantau",
      updated_at: "2024-01-02",
      status: "Inactive",
    },
    {
      division_code: "HR",
      department_code: "HR",
      start_code: "30000",
      end_code: "39999",
      created_by: "Jon Pantau",
      updated_at: "2024-01-03",
      status: "Inactive",
    },
  ];

  const [coaDivisions, setCOADivisions] = useState(dummyCOADivision);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [newCOADivision, setNewCOADivision] = useState({
    division_code: "",
    department_code: "",
    start_code: "",
    end_code: "",
    created_by: "",
    updated_at: new Date().toISOString().split("T")[0],
    status: "Active",
  });
  const [editMode, setEditMode] = useState(false);

  const indexOfLastItem = currentPage * limit;
  const indexOfFirstItem = indexOfLastItem - limit;

  const filteredData = coaDivisions.filter((coaDivision) =>
    Object.values(coaDivision)
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
    setNewCOADivision({
      division_code: "",
      department_code: "",
      start_code: "",
      end_code: "",
      created_by: "",
      updated_at: new Date().toISOString().split("T")[0],
      status: "Active",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewCOADivision({
      division_code: "",
      department_code: "",
      start_code: "",
      end_code: "",
      created_by: "",
      updated_at: new Date().toISOString().split("T")[0],
      status: "Active",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCOADivision((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveNewCOADivision = (e) => {
    e.preventDefault();
    if (editMode) {
      setCOADivisions((prev) =>
        prev.map((coaDivision) =>
          coaDivision.division_code === newCOADivision.division_code &&
          coaDivision.department_code === newCOADivision.department_code
            ? { ...newCOADivision }
            : coaDivision
        )
      );
    } else {
      setCOADivisions((prev) => [...prev, newCOADivision]);
    }
    setShowModal(false);
  };

  const handleEdit = (coaDivision) => {
    setNewCOADivision(coaDivision);
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <div className="relative w-full sm:w-[300px]">
          <input
            type="text"
            placeholder="Cari COA Division"
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
          <p>No COA Divisions found.</p>
        ) : (
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="text-custom-blue bg-gray-200">
                <th className="py-3 px-4 border">Div. Code</th>
                <th className="py-3 px-4 border">Dept. Code</th>
                <th className="py-3 px-4 border">Start Code</th>
                <th className="py-3 px-4 border">End Code</th>
                <th className="py-3 px-4 border">Dibuat Oleh</th>
                <th className="py-3 px-4 border">Tanggal Update</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((coaDivision) => (
                <tr
                  key={coaDivision.division_code}
                  className="cursor-pointer border-t text-center text-custom-blue2"
                >
                  <td className="py-3 px-4">{coaDivision.division_code}</td>
                  <td className="py-3 px-4">{coaDivision.department_code}</td>
                  <td className="py-3 px-4">{coaDivision.start_code}</td>
                  <td className="py-3 px-4">{coaDivision.end_code}</td>
                  <td className="py-3 px-4">{coaDivision.created_by}</td>
                  <td className="py-3 px-4">
                    {new Date(coaDivision.updated_at).toLocaleDateString(
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
                        coaDivision.status.toLowerCase() === "active"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {coaDivision.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(coaDivision)}
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
    <div className="bg-white rounded-lg w-[600px] relative">
      <div className="bg-blue-900 text-white px-4 py-3 rounded-t-lg text-lg font-semibold">
        {editMode ? "Edit COA Division" : "Tambah Baru"}
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
        <form onSubmit={handleSaveNewCOADivision}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-bold">Division Code</label>
              <input
                type="text"
                name="division_code"
                className="border rounded-md p-2 w-full"
                value={newCOADivision.division_code}
                onChange={handleInputChange}
                required
                disabled={editMode}
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">Department Code</label>
              <input
                type="text"
                name="department_code"
                className="border rounded-md p-2 w-full"
                value={newCOADivision.department_code}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">Start Code</label>
              <input
                type="text"
                name="start_code"
                className="border rounded-md p-2 w-full"
                value={newCOADivision.start_code}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">End Code</label>
              <input
                type="text"
                name="end_code"
                className="border rounded-md p-2 w-full"
                value={newCOADivision.end_code}
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
                value={newCOADivision.created_by}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">Status</label>
              <select
                name="status"
                className="border rounded-md p-2 w-full"
                value={newCOADivision.status}
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

export default COADivision;
