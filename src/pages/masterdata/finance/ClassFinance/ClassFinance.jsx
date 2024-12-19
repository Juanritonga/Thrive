import axios from "axios";
import { useState, useEffect } from "react";
import addClassFinance from "./AddClassFinance";
import updatedClassFinance from "./UpdatedClassFinance";
import Table from "@/components/Table";
import ModalCRUD from "@/components/ModalCRUD";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
  const columns = [
    { header: "Class ID", accessor: "class_id" },
    { header: "Nama Kelas", accessor: "name" },
    { header: "Kode", accessor: "code" },
    { header: "Dibuat Oleh", accessor: "created_by" },
    {
      header: "Tanggal Update",
      accessor: (item) =>
        new Date(item.updated_at)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-"),
    },
    {
      header: "Status",
      accessor: (item) => (
        <span
          className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
            item.status.toLowerCase() === "active"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {item.status}
        </span>
      ),
    },
  ];
  const actions = [
    {
      label: "Edit",
      icon: "fas fa-edit",
      buttonClass: "bg-gray-200 text-gray-400",
      handler: (item) => handleOpenEditModal(item),
    },
  ];

  const formFields = [
    {
      name: "name",
      label: "Nama Project",
      type: "text",
      value: newClassFinance.name,
      onChange: (e) =>
        setNewClassFinance((prev) => ({ ...prev, name: e.target.value })),
    },
    {
      name: "code",
      label: "Code",
      type: "text",
      value: newClassFinance.code,
      onChange: (e) =>
        setNewClassFinance((prev) => ({ ...prev, code: e.target.value })),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      value: newClassFinance.status,
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
      onChange: (e) =>
        setNewClassFinance((prev) => ({ ...prev, status: e.target.value })),
    },
  ];

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

      const response = await api.get("/finance/classes",
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

      const response = await api.delete(`/finance/classes/${editClassFinance.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
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
    setLoading(true);
    await updatedClassFinance(
      editClassFinance,
      setClassFinances,
      setError,
      handleCloseEditModal
    );
    fetchClassFinances();
  };

  const handleAddClassFinance = async () => {
    setLoading(true);
    await addClassFinance(
      newClassFinance,
      setClassFinances,
      setNewClassFinance,
      setError,
      handleCloseModal
    );
    fetchClassFinances();
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
          <Table columns={columns} data={filteredData} actions={actions} />
        )}
      </div>

      {isModalOpen && (
        <ModalCRUD
        isOpen={isModalOpen}
        title={isEditModalOpen ? "Edit Kelas Keuangan" : "Tambah Baru"}
        onClose={handleCloseModal}
        onSave={handleAddClassFinance}
        onDelete={isEditModalOpen ? handleDeleteClassFinance : null}
        formFields={formFields}
      />
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
