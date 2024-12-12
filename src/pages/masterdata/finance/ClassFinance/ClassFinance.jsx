import axios from "axios";
import { useState, useEffect } from "react";
import AddClassFinance from "./AddClassFinance";

const ClassFinance = () => {
  const [classFs, setClassFs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(100);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClassF, setNewClassF] = useState({
    name: "",
    code: "",
    status: "",
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);


    const fetchClassFs = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) throw new Error("Authorization token is missing.");

        const response = await axios.get(
          "https://thrive-be.app-dev.altru.id/api/v1/finance/classes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { page: currentPage, limit },
          }
        );

        if (response.data.success) {
          setClassFs(response.data.data.items);
          setTotalPages(response.data.data.total_pages || 1);
        } else {
          throw new Error(
            response.data.message || "Unexpected response format."
          );
        }
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "An error occurred."
        );
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {

    fetchClassFs();
  }, [currentPage, limit]);

  const handleAddClass = async () => {
    setLoading(true); // Set loading to true when starting the request
    await AddClassFinance(
      newClassF,
      setClassFs,
      setNewClassF,
      setError,
      handleCloseModal
    );
    fetchClassFs(); // Call this after adding a class to refresh the data
  };
  

  // Check for null or undefined before calling Object.values
  const filteredData = classFs.filter(
    (classF) =>
      classF &&
      Object.values(classF)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const indexOfFirstItem = (currentPage - 1) * limit;
  const indexOfLastItem = Math.min(
    indexOfFirstItem + limit,
    filteredData.length
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-custom-blue border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

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
        </div>
        <button
          className="bg-custom-blue text-white px-2 py-2 rounded-lg w-full sm:w-auto"
          onClick={handleOpenModal}
        >
          Tambah Baru
        </button>
      </div>
      <div className="overflow-auto shadow-sm mb-6">
        {filteredData.length === 0 ? (
          <p>No data found.</p>
        ) : (
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="text-custom-blue bg-gray-200">
                <th className="py-3 px-4 border">Class ID</th>
                <th className="py-3 px-4 border">Nama Kelas</th>
                <th className="py-3 px-4 border">Kode</th>
                <th className="py-3 px-4 border">Dibuat Oleh</th>
                <th className="py-3 px-4 border">Tanggal Update</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData
                .slice(indexOfFirstItem, indexOfLastItem)
                .map((classF) => (
                  <tr
                    key={classF.id}
                    className="cursor-pointer border-t text-center text-custom-blue2"
                  >
                    <td className="py-3 px-4">{classF.class_id}</td>
                    <td className="py-3 px-4">{classF.name}</td>
                    <td className="py-3 px-4">{classF.code}</td>
                    <td className="py-3 px-4">{classF.created_by}</td>
                    <td className="py-3 px-4">
                      {new Date(classF.updated_at)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
                          classF.status.toLowerCase() === "active"
                            ? "bg-green-200 text-green-600"
                            : "bg-red-200 text-red-600"
                        }`}
                      >
                        {classF.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg w-12 h-12">
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
          <div className="flex items-center space-x-2">
            <select
              className="px-4 py-2 border rounded-md text-white bg-custom-blue"
              value={limit}
              onChange={(e) =>
                setCurrentPage(1) || setLimit(Number(e.target.value))
              }
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
          <div className="bg-white rounded-lg w-98">
            <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg">Tambah Baru</h2>
              </div>
              <button className="text-white" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Entitas */}
                <div>
                  <label
                    htmlFor="ClassName"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Nama Project
                  </label>
                  <input
                    type="text"
                    id="ClassName"
                    placeholder="Class Name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newClassF.name}
                    onChange={(e) =>
                      setNewClassF({ ...newClassF, name: e.target.value })
                    }
                  />
                </div>

                {/* Nama Project */}
                <div>
                  <label
                    htmlFor="code"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Code
                  </label>
                  <input
                    type="text"
                    id="code"
                    placeholder="class"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newClassF.code}
                    onChange={(e) =>
                      setNewClassF({ ...newClassF, code: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Status
                </label>
                <select
                  id="status"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                  value={newClassF.status}
                  onChange={(e) =>
                    setNewClassF({ ...newClassF, status: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Tombol Aksi */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <button
                  className="w-full sm:w-1/2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                {loading ? (
                  <button
                    className="w-full sm:w-1/2 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed"
                    disabled
                  >
                    Processing...
                  </button>
                ) : (
                  <button
                    className="w-full sm:w-1/2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                    onClick={handleAddClass}
                  >
                    Simpan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassFinance;
