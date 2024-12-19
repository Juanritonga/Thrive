import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import Table from "@/components/Table";
import ModalCRUD from "@/components/ModalCRUD";
import SearchBar from "@/components/SearchBar";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const Tax = () => {
  const [taxes, setTaxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentTax, setCurrentTax] = useState({
    id: "",
    name: "",
    amount: "",
    status: "Active",
  });
  const [editMode, setEditMode] = useState(false);

  const fetchTaxes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const response = await api.get("/taxes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit,
        },
      });

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

  const handleOpenModal = (mode = "create", data = null) => {
    if (mode === "edit") {
      setCurrentTax(data);
      setEditMode(true);
    } else {
      setCurrentTax({
        id: "",
        name: "",
        amount: "",
        status: "Active",
      });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveTax = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const payload = {
        name: currentTax.name,
        amount: parseFloat(currentTax.amount),
        status: currentTax.status.toLowerCase(),
      };

      if (editMode) {
        await api.put(`/taxes/${currentTax.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTaxes((prev) =>
          prev.map((tax) =>
            tax.id === currentTax.id ? { ...tax, ...payload } : tax
          )
        );
      } else {
        await api.post("/taxes", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        fetchTaxes();
      }

      setShowModal(false);
      setCurrentTax({ id: "", name: "", amount: "", status: "Active" });
    } catch (err) {
      console.error("Error saving tax:", err.response || err.message);
      alert("Failed to save tax. Please try again.");
    }
  };

  const handleDeleteTax = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      await api.delete(`/taxes/${currentTax.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTaxes((prev) => prev.filter((tax) => tax.id !== currentTax.id));
      setShowModal(false);
    } catch (err) {
      console.error("Error deleting tax:", err.response || err.message);
      alert("Failed to delete tax. Please try again.");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredData = taxes.filter((tax) => {
    const values = Object.values(tax || {}).map((value) => value || "");
    return values.join(" ").toLowerCase().includes(searchQuery.toLowerCase());
  });

  const formFields = [
    {
      name: "name",
      label: "Tax Name",
      type: "text",
      value: currentTax.name,
      onChange: (e) =>
        setCurrentTax((prev) => ({ ...prev, name: e.target.value })),
    },
    {
      name: "amount",
      label: "Amount",
      type: "number",
      value: currentTax.amount,
      onChange: (e) =>
        setCurrentTax((prev) => ({ ...prev, amount: e.target.value })),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      value: currentTax.status,
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
      onChange: (e) =>
        setCurrentTax((prev) => ({ ...prev, status: e.target.value })),
    },
  ];

  const columns = [
    { header: "Tax ID", accessor: "tax_id" },
    { header: "Name", accessor: "name" },
    { header: "Amount", accessor: (tax) => `${Math.min(tax.amount, 100)}%` },
    { header: "Created By", accessor: "created_by" },
    {
      header: "Updated At",
      accessor: (tax) =>
        tax.updated_at
          ? new Date(tax.updated_at)
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-")
          : "N/A",
    },
    {
      header: "Status",
      accessor: (tax) => (
        <span
          className={`inline-flex items-center justify-center px-6 py-2 rounded-full font-bold ${
            tax.status?.toLowerCase() === "active"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {tax.status || "N/A"}
        </span>
      ),
    },
  ];

  const actions = [
    {
      icon: "fas fa-edit",
      buttonClass:
        "bg-gray-200 text-gray-400 p-3 rounded-lg flex items-center justify-center w-10 h-10",
      handler: (item) => handleOpenModal("edit", item),
    },
  ];

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
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari Tax"
        />
        <button
          onClick={() => handleOpenModal("create")}
          className="bg-custom-blue text-white py-2 px-4 rounded-md"
        >
          + Tambah Baru
        </button>
      </div>
      <div className="overflow-auto shadow-sm mb-6">
        {filteredData.length === 0 ? (
          <p>No taxes found.</p>
        ) : (
          <Table columns={columns} data={filteredData} actions={actions} />
        )}
      </div>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <span className="text-sm text-gray-500">
          Showing {(currentPage - 1) * limit + 1} to{" "}
          {Math.min(currentPage * limit, taxes.length)} of {taxes.length} entries
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

      <ModalCRUD
        isOpen={showModal}
        title={editMode ? "Edit Tax" : "Tambah Baru"}
        onClose={handleCloseModal}
        onSave={handleSaveTax}
        onDelete={editMode ? handleDeleteTax : null}
        formFields={formFields}
        editMode={editMode}
      />
    </div>
  );
};

export default Tax;
