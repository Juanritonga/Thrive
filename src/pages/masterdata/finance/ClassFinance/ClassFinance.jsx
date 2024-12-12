import axios from "axios";
import { useState, useEffect } from "react";
import addClassFinance from "./AddClassFinance";
import updatedClassFinance from "./UpdatedClassFinance";

const ClassFinance = () => {
  const [ClassFinances, setClassFinances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClassFinance, setNewClassFinance] = useState({
    name: "",
    code: "",
    status: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editClassFinance, setEditClassFinance] = useState({
    name: "",
    code: "",
    status: "",
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenEditModal = (ClassFinance) => {
    setEditClassFinance({
      ...ClassFinance,
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const fetchClassFinances = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const response = await axios.get(
        "https://thrive-be.app-dev.altru.id/api/v1/finance/classes",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { page: 1, limit: 20 },
        }
      );

      if (response.data.success) {
        setClassFinances(response.data.data.items);
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

  const handleDeleteClassFinance = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await axios.delete(
        `https://thrive-be.app-dev.altru.id/api/v1/finance/classes/${editClassFinance.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Refresh the user roles list
        fetchClassFinances();
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

  const handleUpdateClassFinance = async () => {
    setLoading(true); // Set loading to true when starting the request
    await updatedClassFinance(
      editClassFinance,
      setClassFinances,
      setError,
      handleCloseEditModal
    );
    fetchClassFinances();
  };

  const handleAddClassFinance = async () => {
    setLoading(true); // Set loading to true when starting the request
    await addClassFinance(
      newClassFinance,
      setClassFinances,
      setNewClassFinance,
      setError,
      handleCloseModal
    );
    fetchClassFinances(); // Call this after adding a role to refresh the data
  };

  const filteredData = ClassFinances.filter((ClassFinance) =>
    Object.values(ClassFinance)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchClassFinances();
  }, []);

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
              {filteredData.map((ClassFinance) => (
                <tr
                  key={ClassFinance.id}
                  className="cursor-pointer border-t text-center text-custom-blue2"
                >
                  <td className="py-3 px-4">{ClassFinance.class_id}</td>
                  <td className="py-3 px-4">{ClassFinance.name}</td>
                  <td className="py-3 px-4">{ClassFinance.code}</td>
                  <td className="py-3 px-4">{ClassFinance.created_by}</td>
                  <td className="py-3 px-4">
                    {new Date(ClassFinance.updated_at)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
                        ClassFinance.status.toLowerCase() === "active"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {ClassFinance.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="font-bold bg-gray-200 text-gray-400 p-3 rounded-lg w-10 h-10 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      onClick={() => handleOpenEditModal(ClassFinance)}
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
                    value={newClassFinance.name}
                    onChange={(e) =>
                      setNewClassFinance({
                        ...newClassFinance,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Division */}
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
                    value={newClassFinance.code}
                    onChange={(e) =>
                      setNewClassFinance({
                        ...newClassFinance,
                        code: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Status */}
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
                    value={newClassFinance.status || ""}
                    onChange={(e) =>
                      setNewClassFinance({
                        ...newClassFinance,
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

              {/* Button */}
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-md"
                  onClick={handleAddClassFinance}
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
              <h2 className="text-lg">Edit User Role</h2>
              <button className="text-white" onClick={handleCloseEditModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
                    value={editClassFinance.name}
                    onChange={(e) =>
                      setEditClassFinance({
                        ...editClassFinance,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Division */}
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
                    value={editClassFinance.code}
                    onChange={(e) =>
                      setEditClassFinance({
                        ...editClassFinance,
                        code: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Status */}
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
                    value={editClassFinance.status || ""}
                    onChange={(e) =>
                      setEditClassFinance({
                        ...editClassFinance,
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

              {/* Button */}
              <div className="flex justify-end">
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-md"
                  onClick={() => handleDeleteClassFinance(editClassFinance.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-custom-blue text-white py-2 px-6 rounded-lg"
                  onClick={handleUpdateClassFinance}
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

export default ClassFinance;
