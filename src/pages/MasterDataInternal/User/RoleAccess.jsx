import axios from "axios";
import { useState, useEffect } from "react";
import addRoleAcces from "./RoleAccess/AddRoleAcces";
import updateRoleAcces from "./RoleAccess/UpdateRoleAcces";
import SearchBar from "@/components/SearchBar";
import AddButton from "@/components/AddButton";
import Table from "@/components/Table";
import ModalCRUD from "@/components/ModalCRUD";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchRoleAccess = async () => {
  try {
    const token = sessionStorage.getItem("authToken");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await api.get("/role-access", {
      headers: { Authorization: `Bearer ${token}` },
      params: { page: 1, limit: 20 },
    });

    if (response.data.success) {
      return response.data.data.items;
    } else {
      throw new Error(response.data.message || "Unexpected response format.");
    }
  } catch (err) {
    console.error("Error fetching Currency:", err.message);
    throw err;
  }
};

const RoleAcces = () => {
  const [RoleAccess, setRoleAccess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRoleAcces, setCurrentRoleAcces] = useState({
    role_id: "",
    modules: "",
    status: "Active",
  });

  const handleOpenModal = (mode = "create", RoleAcces = null) => {
    if (mode === "edit") {
      setCurrentRoleAcces(RoleAcces);
      setEditMode(true);
    } else {
      setCurrentRoleAcces({
        role_id: "",
        modules: "",
        status: "Active",
      });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveRoleAcces = async () => {
    if (editMode) {
      await updateRoleAcces(
        currentRoleAcces,
        setRoleAccess,
        setError,
        handleCloseModal
      );
    } else {
      await addRoleAcces(
        currentRoleAcces,
        setRoleAccess,
        setCurrentRoleAcces,
        setError,
        handleCloseModal
      );
    }
  };

  const handleDeleteRoleAcces = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      await api.delete(`/role-access/${currentRoleAcces.RoleAcces_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRoleAccess((prev) =>
        prev.filter(
          (RoleAcces) =>
            RoleAcces.RoleAcces_id !== currentRoleAcces.RoleAcces_id
        )
      );
      handleCloseModal();
    } catch (err) {
      console.error("Error deleting RoleAcces:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRoleAccess();
        setRoleAccess(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = RoleAccess.filter((RoleAcces) =>
    Object.values(RoleAcces)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const formFields = [
    {
      name: "access_id",
      label: "Access ID",
      type: "text",
      value: currentRoleAcces.access_id,
      onChange: (e) =>
        setCurrentRoleAcces((prev) => ({
          ...prev,
          RoleAcces_name: e.target.value,
        })),
    },
    {
      name: "role_name",
      label: "Role Name",
      type: "text",
      value: currentRoleAcces.role_name,
      onChange: (e) =>
        setCurrentRoleAcces((prev) => ({
          ...prev,
          description: e.target.value,
        })),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      value: currentRoleAcces.status,
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
      onChange: (e) =>
        setCurrentRoleAcces((prev) => ({ ...prev, status: e.target.value })),
    },
  ];

  const columns = [
    { header: "Role Acces ID", accessor: "access_id" },
    { header: "Role Acces Name", accessor: "role_name" },
    {
      header: "Status",
      accessor: (RoleAcces) => (
        <span
          className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
            RoleAcces.status.toLowerCase() === "active"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {RoleAcces.status}
        </span>
      ),
    },
    { header: "Created By", accessor: "created_by" },
    {
      header: "Created At",
      accessor: (role) => new Date(role.created_at).toLocaleDateString("en-GB"),
    },
    {
      header: "Updated At",
      accessor: (role) => new Date(role.updated_at).toLocaleDateString("en-GB"),
    },
  ];

  const actions = [
    {
      icon: "fas fa-edit",
      buttonClass:
        "bg-gray-200 text-gray-400 p-3 rounded-lg flex items-center justify-center w-10 h-10",
      handler: (RoleAcces) => handleOpenModal("edit", RoleAcces),
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
          placeholder="Cari RoleAcces"
        />
        <AddButton onClick={() => handleOpenModal("create")} />
      </div>
      <div className="overflow-auto shadow-sm mb-6">
        {filteredData.length === 0 ? (
          <p>No RoleAccess found.</p>
        ) : (
          <Table columns={columns} data={filteredData} actions={actions} />
        )}
      </div>

      <ModalCRUD
        isOpen={showModal}
        title={editMode ? "Edit RoleAcces" : "Tambah Baru"}
        onClose={handleCloseModal}
        onSave={handleSaveRoleAcces}
        onDelete={editMode ? handleDeleteRoleAcces : null}
        formFields={formFields}
        editMode={editMode}
      />
    </div>
  );
};

export default RoleAcces;
