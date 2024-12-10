import axios from "axios";
import { useState, useEffect } from "react";

const BankFinance = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const indexOfLastItem = currentPage * limit;
  const indexOfFirstItem = indexOfLastItem - limit;

  useEffect(() => {
    const fetchBanks = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authorization token is missing.");
        }

        const response = await axios.get(
          "https://thrive-be.app-dev.altru.id/api/v1/banks",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: currentPage,
              limit: limit,
            },
          }
        );

        if (response.data.success) {
          setBanks(response.data.data.items);
          setTotalPages(response.data.data.total_pages || 1);
        } else {
          throw new Error(
            response.data.message || "Unexpected response format."
          );
        }
      } catch (err) {
        console.error("Error:", err.response || err.message);
        setError(
          err.response?.data?.message ||
            err.message ||
            "An unexpected error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, [currentPage, limit]);

  const filteredData = banks.filter((bank) =>
    Object.values(bank)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleTambahBaru = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <div className="relative w-full sm:w-[300px]">
          <input
            type="text"
            placeholder="Cari Bank"
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
        {filteredData.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="text-custom-blue bg-gray-200">
                <th className="py-3 px-4 border">Bank ID</th>
                <th className="py-3 px-4 border">Bank</th>
                <th className="py-3 px-4 border">Entitas</th>
                <th className="py-3 px-4 border">No. Rekening</th>
                <th className="py-3 px-4 border">Dibuat Oleh</th>
                <th className="py-3 px-4 border">Tanggal Update</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((bank) => (
                <tr
                  key={bank.bank_id}
                  className="cursor-pointer border-t text-center text-custom-blue2"
                >
                  <td className="py-3 px-4">{bank.bank_id}</td>
                  <td className="py-3 px-4">{bank.bank}</td>
                  <td className="py-3 px-4">{bank.entity}</td>
                  <td className="py-3 px-4">{bank.account_number}</td>
                  <td className="py-3 px-4">{bank.created_by}</td>
                  <td className="py-3 px-4">
                    {new Date(bank.updated_at)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </td>{" "}
                  <td className="py-3 px-4">{bank.status}</td>
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

      {/* Pagination */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <span className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, banks.length)} of {banks.length} entries
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

      {/* Modal */}
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
              Tambah Baru
            </h2>
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-bold">Bank ID</label>
                  <input
                    type="text"
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold">Bank Name</label>
                  <input
                    type="text"
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold">Account No.</label>
                  <input
                    type="text"
                    className="border rounded-md p-2 w-full"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold">Currency</label>
                  <select className="border rounded-md p-2 w-full">
                    <option>Rupiah</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold">Entitas</label>
                  <select className="border rounded-md p-2 w-full">
                    <option>Entitas</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold">Status</label>
                  <select className="border rounded-md p-2 w-full">
                    <option>Active</option>
                    <option>Inactive</option>
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

export default BankFinance;
