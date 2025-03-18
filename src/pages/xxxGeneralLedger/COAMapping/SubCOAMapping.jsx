import { useState } from "react";

const SubCOAMapping = () => {
  const dummyCOAMapping = [
    {
      mapping_coa_code: "1-001-01",
      description: "Journal Memorial",
      created_by: "Jon Pantau",
      updated_at: "2024-01-01",
      status: "Active",
    },
    {
      mapping_coa_code: "1-001-02",
      description: "Journal Adjustment",
      created_by: "Jon Pantau",
      updated_at: "2024-01-02",
      status: "Inactive",
    },
    {
      mapping_coa_code: "1-001-03",
      description: "Journal Closing",
      created_by: "Jon Pantau",
      updated_at: "2024-01-03",
      status: "Inactive",
    },
  ];

  const [coaMappings, setCOAMappings] = useState(dummyCOAMapping);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [newCOAMapping, setNewCOAMapping] = useState({
    mapping_coa_code: "",
    description: "",
    created_by: "",
    updated_at: new Date().toISOString().split("T")[0],
    status: "Active",
  });
  const [editMode, setEditMode] = useState(false);

  const indexOfLastItem = currentPage * limit;
  const indexOfFirstItem = indexOfLastItem - limit;

  const filteredData = coaMappings.filter((coaMapping) =>
    Object.values(coaMapping)
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
    setNewCOAMapping({
      mapping_coa_code: "",
      description: "",
      created_by: "",
      updated_at: new Date().toISOString().split("T")[0],
      status: "Active",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewCOAMapping({
      mapping_coa_code: "",
      description: "",
      created_by: "",
      updated_at: new Date().toISOString().split("T")[0],
      status: "Active",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCOAMapping((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveNewCOAMapping = (e) => {
    e.preventDefault();
    if (editMode) {
      setCOAMappings((prev) =>
        prev.map((coaMapping) =>
          coaMapping.mapping_coa_code === newCOAMapping.mapping_coa_code
            ? { ...newCOAMapping }
            : coaMapping
        )
      );
    } else {
      setCOAMappings((prev) => [...prev, newCOAMapping]);
    }
    setShowModal(false);
  };

  const handleEdit = (coaMapping) => {
    setNewCOAMapping(coaMapping);
    setEditMode(true);
    setShowModal(true);
  };

  return (
    <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <div className="relative w-full sm:w-[300px]">
          <input
            type="text"
            placeholder="Cari COA Mapping"
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
          <p>No COA mappings found.</p>
        ) : (
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="text-custom-blue bg-gray-200">
                <th className="py-3 px-4 border">Mapping COA Code</th>
                <th className="py-3 px-4 border">Description</th>
                <th className="py-3 px-4 border">Dibuat Oleh</th>
                <th className="py-3 px-4 border">Tanggal Update</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((coaMapping) => (
                <tr
                  key={coaMapping.mapping_coa_code}
                  className="cursor-pointer border-t text-center text-custom-blue2"
                >
                  <td className="py-3 px-4">{coaMapping.mapping_coa_code}</td>
                  <td className="py-3 px-4">{coaMapping.description}</td>
                  <td className="py-3 px-4">{coaMapping.created_by}</td>
                  <td className="py-3 px-4">
                    {new Date(coaMapping.updated_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
                        coaMapping.status.toLowerCase() === "active"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {coaMapping.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEdit(coaMapping)}
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
        {editMode ? "Edit COA Mapping" : "Tambah Baru"}
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
        <form onSubmit={handleSaveNewCOAMapping}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-bold">Mapping COA Code</label>
              <input
                type="text"
                name="mapping_coa_code"
                className="border rounded-md p-2 w-full"
                value={newCOAMapping.mapping_coa_code}
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
                value={newCOAMapping.description}
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
                value={newCOAMapping.created_by}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">Status</label>
              <select
                name="status"
                className="border rounded-md p-2 w-full"
                value={newCOAMapping.status}
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

export default SubCOAMapping;
