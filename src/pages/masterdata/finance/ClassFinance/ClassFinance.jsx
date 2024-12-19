import axios from "axios";
import { useState, useEffect } from "react";
import addClassFinance from "./AddClassFinance";
import updatedClassFinance from "./UpdatedClassFinance";
import Table from "@/components/Table";
import ModalCRUD from "@/components/ModalCRUD";
import SearchBar from "@/components/SearchBar";

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentFinance, setCurrentFinance] = useState({
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
      icon: "fas fa-edit",
      buttonClass:
        "bg-gray-200 text-gray-400 p-3 rounded-lg flex items-center justify-center w-10 h-10",
      handler: (item) => handleOpenModal("edit", item),
    },
  ];

  const formFields = [
    {
      name: "name",
      label: "Nama Project",
      type: "text",
      value: currentFinance.name,
      onChange: (e) =>
        setCurrentFinance((prev) => ({ ...prev, name: e.target.value })),
    },
    {
      name: "code",
      label: "Code",
      type: "text",
      value: currentFinance.code,
      onChange: (e) =>
        setCurrentFinance((prev) => ({ ...prev, code: e.target.value })),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      value: currentFinance.status,
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
      onChange: (e) =>
        setCurrentFinance((prev) => ({ ...prev, status: e.target.value })),
    },
  ];

  const handleOpenModal = (mode = "create", data = null) => {
    if (mode === "edit") {
      setCurrentFinance(data);
      setIsEditModalOpen(true);
    } else {
      setCurrentFinance({
        name: "",
        code: "",
        status: "",
      });
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const fetchClassFinances = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const response = await api.get("/finance/classes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page: 1, limit: 20 },
      });

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

  const handleSaveClassFinance = async () => {
    setLoading(true);
    try {
      if (isEditModalOpen) {
        await updatedClassFinance(
          currentFinance,
          setClassFinances,
          setError,
          handleCloseModal
        );
      } else {
        await addClassFinance(
          currentFinance,
          setClassFinances,
          setError,
          handleCloseModal
        );
      }
      fetchClassFinances();
    } catch (err) {
      setError("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClassFinance = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await api.delete(
        `/finance/classes/${currentFinance.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        fetchClassFinances();
        handleCloseModal();
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
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari Kelas"
        />
        <button
          className="bg-custom-blue text-white px-2 py-2 rounded-lg w-full sm:w-auto"
          onClick={() => handleOpenModal("create")}
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

      <ModalCRUD
        isOpen={isModalOpen || isEditModalOpen}
        title={isEditModalOpen ? "Edit Kelas Keuangan" : "Tambah Baru"}
        onClose={handleCloseModal}
        onSave={handleSaveClassFinance}
        onDelete={isEditModalOpen ? handleDeleteClassFinance : null}
        formFields={formFields}
        editMode={isEditModalOpen}
      />
    </div>
  );
};

export default ClassFinance;
