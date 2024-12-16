import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const Tax = () => {
  const [taxes, setTaxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [newTax, setNewTax] = useState({
    id: "",
    name: "",
    amount: "",
    status: "Active",
  });
  const [editMode, setEditMode] = useState(false);

  const indexOfLastItem = currentPage * limit;
  const indexOfFirstItem = indexOfLastItem - limit;

  const fetchTaxes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const response = await axios.get(
        "https://thrive-be.app-dev.altru.id/api/v1/taxes",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,
            limit,
          },
        }
      );

      if (response.data.success) {
        const validTaxes = response.data.data.items.filter(
          (tax) => tax && typeof tax === "object" && tax.tax_id
        );
        setTaxes(validTaxes);
        setTotalPages(response.data.data.total_pages || 1);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching taxes:", err.response || err.message);
      setError(
        err.response?.data?.message || err.message || "Failed to fetch taxes."
      );
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit]);

  useEffect(() => {
    fetchTaxes();
  }, [fetchTaxes]);

  const filteredData = taxes.filter((tax) => {
    const values = Object.values(tax || {}).map((value) => value || "");
    return values.join(" ").toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleTambahBaru = () => {
    setShowModal(true);
    setEditMode(false);
    setNewTax({
      id: "",
      name: "",
      amount: "",
      status: "Active",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTax((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveTax = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const payload = {
        name: newTax.name,
        amount: parseFloat(newTax.amount),
        status: newTax.status.toLowerCase(),
      };

      if (editMode) {
        await axios.put(
          `https://thrive-be.app-dev.altru.id/api/v1/taxes/${newTax.id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTaxes((prev) =>
          prev.map((tax) =>
            tax.id === newTax.id ? { ...tax, ...payload } : tax
          )
        );
      } else {
        await axios.post(
          "https://thrive-be.app-dev.altru.id/api/v1/taxes",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        fetchTaxes();
      }

      setShowModal(false);
      setNewTax({ id: "", name: "", amount: "", status: "Active" });
    } catch (err) {
      console.error("Error saving tax:", err.response || err.message);
      alert("Failed to save tax. Please try again.");
    }
  };

  const handleEdit = (tax) => {
    setNewTax({
      id: tax.id,
      name: tax.name,
      amount: tax.amount,
      status: tax.status,
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleDeleteTax = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      await axios.delete(
        `https://thrive-be.app-dev.altru.id/api/v1/taxes/${newTax.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTaxes((prev) => prev.filter((tax) => tax.id !== newTax.id));
      setShowModal(false);
    } catch (err) {
      console.error("Error deleting tax:", err.response || err.message);
      alert("Failed to delete tax. Please try again.");
    }
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
            placeholder="Cari Tax"
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
        {filteredData.length === 0 ? (
          <p>No taxes found.</p>
        ) : (
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="text-custom-blue bg-gray-200">
                <th className="py-3 px-4 border">Tax ID</th>
                <th className="py-3 px-4 border">Name</th>
                <th className="py-3 px-4 border">Amount</th>
                <th className="py-3 px-4 border">Dibuat Oleh</th>
                <th className="py-3 px-4 border">Updated At</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((tax, index) => {
                if (!tax || typeof tax !== "object") {
                  return null;
                }
                return (
                  <tr
                    key={tax.id || index}
                    className="cursor-pointer border-t text-center text-custom-blue2"
                  >
                    <td className="py-3 px-4">{tax.tax_id || "N/A"}</td>
                    <td className="py-3 px-4">{tax.name || "N/A"}</td>
                    <td className="py-3 px-4">{Math.min(tax.amount, 100)}%</td>
                    <td className="py-3 px-4">{tax.created_by || "N/A"}</td>
                    <td className="py-3 px-4">
                      {tax.updated_at
                        ? new Date(tax.updated_at)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "-")
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center justify-center px-6 py-2 rounded-full font-bold ${
                          tax.status?.toLowerCase() === "active"
                            ? "bg-green-200 text-green-600"
                            : "bg-red-200 text-red-600"
                        }`}
                      >
                        {tax.status || "N/A"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleEdit(tax)}
                        className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg w-12 h-12"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
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
            <div className="bg-custom-blue text-white px-4 py-3 rounded-t-lg text-lg font-semibold text-left">
              {editMode ? "Edit Tax" : "Tambah Baru"}
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
              <form onSubmit={handleSaveTax}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-bold">Tax Name</label>
                    <input
                      type="text"
                      name="name"
                      className="border rounded-md p-2 w-full"
                      value={newTax.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold">Amount</label>
                    <input
                      type="number"
                      name="amount"
                      className="border rounded-md p-2 w-full"
                      value={newTax.amount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-bold">Status</label>
                    <select
                      name="status"
                      className="border rounded-md p-2 w-full"
                      value={newTax.status}
                      onChange={handleInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                {/* Footer */}
                <div className="flex justify-end gap-4 mt-6">
                  {editMode && (
                    <button
                      type="button"
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                      onClick={handleDeleteTax}
                    >
                      Delete
                    </button>
                  )}
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

export default Tax;
