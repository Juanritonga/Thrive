import axios from "axios";
import { useState, useEffect } from "react";
import addChart from "./Chart/AddChart";
import updatedChart from "./Chart/UpdatedChart";
import Table from "@/pages/components/Table";

const Chart = () => {
  const [Chart, setChart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classFinances, setClassFinances] = useState([]);
  const [newChart, setNewChart] = useState({
    name: "",
    class_id: "",
    status: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChart, setEditChart] = useState({
    name: "",
    class_id: "",
    status: "",
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenEditModal = (Chart) => {
    setEditChart({
      ...Chart,
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const fetchCharts = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const response = await axios.get(
        "https://thrive-be.app-dev.altru.id/api/v1/finance/acc",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { page: 1, limit: 20 },
        }
      );

      if (response.data.success) {
        setChart(response.data.data.items);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
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
  const fetchClassFinances = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await axios.get(
        "https://thrive-be.app-dev.altru.id/api/v1/finance/classes",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { limit: 10 },
        }
      );

      console.log("Divisions fetched:", response.data.data.items);

      if (response.data.success) {
        setClassFinances(response.data.data.items); // Set fetched class finances

        if (!newChart.class_id) {
          setNewChart((prev) => ({
            ...prev,
            class_id: response.data.data.items[0]?.id || "", // Set class_id if not already set
          }));
        }
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "An error occurred."
      );
    }
  };

  const handleDeleteChart = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await axios.delete(
        `https://thrive-be.app-dev.altru.id/api/v1/finance/acc/${editChart.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Refresh the user roles list
        fetchCharts();
        handleCloseEditModal();
      } else {
        throw new Error(response.data.message || "Failed to delete role.");
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
    fetchCharts();
    fetchClassFinances();
  }, []);

  const handleAddChart = async () => {
    setLoading(true);
    await addChart(newChart, setChart, setNewChart, setError, handleCloseModal);
    fetchCharts();
  };

  const handleUpdateChart = async () => {
    setLoading(true); // Set loading to true when starting the request
    await updatedChart(editChart, setChart, setError, handleCloseEditModal);
    fetchCharts();
  };

  const filteredData = Chart.filter((Chart) =>
    Object.values(Chart)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

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
          ? new Date(chart.updated_at).toLocaleDateString("en-GB").replace(/\//g, "-")
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
      label: "Edit",
      icon: "fas fa-edit",
      buttonClass: "bg-gray-200 text-gray-400",
      handler: handleOpenEditModal,
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
        <div className="relative w-full sm:w-[300px]">
          <input
            type="text"
            placeholder="Cari"
            className="pl-6 pr-10 py-3 w-full border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass absolute right-2 top-1/2 transform -translate-y-1/2 text-custom-blue"></i>
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
          <p>No users found.</p>
        ) : (
          <Table columns={columns} data={filteredData} actions={actions} />
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg w-98">
            <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
              <h2 className="text-lg">Tambah Baru</h2>
              <button className="text-white" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="ChartName"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Chart Name
                  </label>
                  <input
                    type="text"
                    id="ChartName"
                    placeholder="Chart Name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newChart.Chart_name}
                    onChange={(e) =>
                      setNewChart({
                        ...newChart,
                        Chart_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="class_id"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Class Finance
                  </label>
                  <select
                    id="class_id"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newChart.class_id}
                    onChange={(e) =>
                      setNewChart({ ...newChart, class_id: e.target.value })
                    }
                  >
                    <option value="">Select Class</option>
                    {classFinances.map((classFinance) => (
                      <option key={classFinance.id} value={classFinance.id}>
                        {classFinance.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newChart.status || ""}
                    onChange={(e) =>
                      setNewChart({
                        ...newChart,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-md"
                  onClick={handleAddChart}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg w-98">
            <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg">Edit Divison</h2>
              </div>
              <button className="text-white" onClick={handleCloseEditModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block font-semibold text-gray-700">
                  Chart Name
                </label>
                <input
                  type="text"
                  value={editChart.Chart_name}
                  onChange={(e) =>
                    setEditChart({
                      ...editChart,
                      Chart_name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="ClassFinance"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Class
                </label>
                <select
                  id="ClassFinance"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                  value={editChart.class_id || ""}
                  onChange={(e) =>
                    setEditChart({
                      ...editChart,
                      class_id: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    Select Class
                  </option>
                  {classFinances.map((ClassFinance) => (
                    <option key={ClassFinance.id} value={ClassFinance.id}>
                      {ClassFinance.class_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-semibold text-gray-700">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-md"
                  value={editChart.status}
                  onChange={(e) =>
                    setEditChart({
                      ...editChart,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-md"
                  onClick={() => handleDeleteChart(editChart.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-custom-blue text-white py-2 px-6 rounded-lg"
                  onClick={handleUpdateChart}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
