import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import addChart from "./ChartOfAccount/AddChartOfAccount";
import updateChart from "./ChartOfAccount/UpdateChartOfAccount";
import SearchBar from "@/components/SearchBar";
import AddButton from "@/components/AddButton";
import Table from "@/components/Table";
import ModalCRUD from "@/components/ModalCRUD";
import Pagination from "@/components/Pagination";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const Chart = () => {
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [classFinances, setClassFinances] = useState([]);
  const [currentChart, setCurrentChart] = useState({
    id: "",
    name: "",
    class_id: "",
    status: "Active",
  });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCharts = useCallback(async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const offset = (currentPage - 1) * limit;

      const response = await api.get("/finance/acc", {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit, offset },
      });

      if (response.data.success) {
        setCharts(response.data.data.items);
        setTotalItems(response.data.data.total || 0);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching charts:", err.response || err.message);
      setError(err.response?.data?.message || err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit]);

  const fetchClassFinances = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await api.get("/finance/classes", {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 10 },
      });

      if (response.data.success) {
        setClassFinances(response.data.data.items);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching class finances:", err.response || err.message);
      setError(err.response?.data?.message || err.message || "An error occurred.");
    }
  }, []);

  const handleOpenModal = (mode = "create", data = null) => {
    if (mode === "edit") {
      setCurrentChart(data);
      setEditMode(true);
    } else {
      setCurrentChart({
        id: "",
        name: "",
        class_id: classFinances[0]?.id || "",
        status: "Active",
      });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChart = async () => {
    setLoading(true);
    try {
      if (editMode) {
        await updateChart(currentChart, setCharts, setError, handleCloseModal);
      } else {
        await addChart(currentChart, setCharts, setError, handleCloseModal);
      }
      fetchCharts();
    } catch (err) {
      console.error("Error saving chart:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChart = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      await api.delete(`/finance/acc/${currentChart.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCharts((prev) => prev.filter((chart) => chart.id !== currentChart.id));
      handleCloseModal();
    } catch (err) {
      console.error("Error deleting chart:", err.response || err.message);
      setError(err.response?.data?.message || err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharts();
    fetchClassFinances();
  }, [fetchCharts, fetchClassFinances]);

  const filteredData = charts.filter((chart) =>
    Object.values(chart)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const formFields = [
    {
      name: "name",
      label: "Chart Name",
      type: "text",
      value: currentChart.name,
      onChange: (e) =>
        setCurrentChart((prev) => ({ ...prev, name: e.target.value })),
    },
    {
      name: "class_id",
      label: "Class Finance",
      type: "select",
      value: currentChart.class_id,
      options: classFinances.map((classFinance) => ({
        value: classFinance.id,
        label: classFinance.name,
      })),
      onChange: (e) =>
        setCurrentChart((prev) => ({ ...prev, class_id: e.target.value })),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      value: currentChart.status,
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
      onChange: (e) =>
        setCurrentChart((prev) => ({ ...prev, status: e.target.value })),
    },
  ];

  const columns = [
    { header: "ID Acc.", accessor: "acc_id" },
    { header: "Nama Acc.", accessor: "name" },
    { header: "Kelas", accessor: "class_name" },
    { header: "Kode", accessor: "class_code" },
    { header: "Dibuat Oleh", accessor: "created_by" },
    {
      header: "Tanggal Update",
      accessor: (chart) =>
        chart.updated_at
          ? new Date(chart.updated_at)
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-")
          : "N/A",
    },
    {
      header: "Status",
      accessor: (chart) => (
        <span
          className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
            chart.status.toLowerCase() === "active"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {chart.status}
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
          placeholder="Cari Acc."
        />
        <AddButton onClick={() => handleOpenModal("create")} />
      </div>
      <div className="overflow-auto shadow-sm mb-6">
        {filteredData.length === 0 ? (
          <p>No charts found.</p>
        ) : (
          <Table columns={columns} data={filteredData} actions={actions} />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / limit)}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        limit={limit}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setCurrentPage(1);
        }}
      />
      <ModalCRUD
        isOpen={showModal}
        title={editMode ? "Edit Chart" : "Tambah Baru"}
        onClose={handleCloseModal}
        onSave={handleSaveChart}
        onDelete={editMode ? handleDeleteChart : null}
        formFields={formFields}
        editMode={editMode}
      />
    </div>
  );
};

export default Chart;
