import axios from "axios";
import { useState, useEffect } from "react";
import addDivision from "./Division/AddDivision";
import updatedDivision from "./Division/UpdatedDivision";
import Table from "@/pages/components/Table";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  // This will now use the environment variable
  headers: {
    "Content-Type": "application/json",
  },
});

const Division = () => {
  const [Division, setDivision] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDivision, setNewDivision] = useState({
    division_name: "",
    description: "",
    status: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editDivision, setEditDivision] = useState({
    division_name: "",
    description: "",
    status: "",
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenEditModal = (Division) => {
    setEditDivision({
      ...Division,
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const fetchDivision = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const response = await api.get("/divisions", {  // Use 'api' instance here
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: { page: 1, limit: 20 },
      });

      if (response.data.success) {
        setDivision(response.data.data.items);
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

  const handleDeleteDivision = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this division?"
    );
    if (confirmDelete) {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authorization token is missing.");
        }

        const response = await api.delete(  // Use 'api' instance here
          `/divisions/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          alert("Division deleted successfully.");
          fetchDivision(); // Reload divisions after deletion
        } else {
          throw new Error(
            response.data.message || "Failed to delete division."
          );
        }
      } catch (err) {
        console.error("Error:", err.response || err.message);
        setError(
          err.response?.data?.message ||
            err.message ||
            "An unexpected error occurred."
        );
      }
    }
  };

  useEffect(() => {
    fetchDivision();
  }, []);

  const handleAddDivision = async () => {
    setLoading(true);
    await addDivision(
      newDivision,
      setDivision,
      setNewDivision,
      setError,
      handleCloseModal
    );
    fetchDivision();
  };

  const handleUpdateDivision = async () => {
    setLoading(true); // Set loading to true when starting the request
    await updatedDivision(
      editDivision,
      setDivision,
      setError,
      handleCloseEditModal
    );
    fetchDivision();
  };

  const filteredData = Division.filter((Division) =>
    Object.values(Division)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const columns = [
    { header: "Division ID", accessor: "division_id" },
    { header: "Division Name", accessor: "division_name" },
    { header: "Description", accessor: "description" },
    {
      header: "Status",
      accessor: (division) => (
        <span
          className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
            division.status.toLowerCase() === "active"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {division.status}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: "Edit",
      icon: "fas fa-edit",
      buttonClass: "bg-gray-200 text-gray-400 hover:bg-gray-300",
      handler: (division) => handleOpenEditModal(division),
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
                    htmlFor="divisionName"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Division Name
                  </label>
                  <input
                    type="text"
                    id="divisionName"
                    placeholder="Division Name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newDivision.division_name}
                    onChange={(e) =>
                      setNewDivision({
                        ...newDivision,
                        division_name: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    placeholder="Description"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={newDivision.description}
                    onChange={(e) =>
                      setNewDivision({
                        ...newDivision,
                        description: e.target.value,
                      })
                    }
                  />
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
                    value={newDivision.status || ""}
                    onChange={(e) =>
                      setNewDivision({
                        ...newDivision,
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
                  onClick={handleAddDivision}
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
              <h2 className="text-lg">Edit Division</h2>
              <button className="text-white" onClick={handleCloseEditModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="divisionName"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Division Name
                  </label>
                  <input
                    type="text"
                    id="divisionName"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={editDivision.division_name}
                    onChange={(e) =>
                      setEditDivision({
                        ...editDivision,
                        division_name: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                    value={editDivision.description}
                    onChange={(e) =>
                      setEditDivision({
                        ...editDivision,
                        description: e.target.value,
                      })
                    }
                  />
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
                    value={editDivision.status || ""}
                    onChange={(e) =>
                      setEditDivision({
                        ...editDivision,
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

              <div className="flex justify-end">
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-md"
                  onClick={() => handleDeleteDivision(editDivision.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-custom-blue text-white py-2 px-6 rounded-lg"
                  onClick={handleUpdateDivision}
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

export default Division;
