import axios from "axios";
import { useState, useEffect } from "react";
import Table from "@/components/Table";
import SearchBar from "@/components/SearchBar";
import AddButton from "@/components/AddButton";
import ModalCRUD from "@/components/ModalCRUD";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const UserRole = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    role_name: "",
    division_id: "",
    status: "Active",
  });
  const [editMode, setEditMode] = useState(false);

  const fetchUserRoles = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const response = await api.get("/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page: 1, limit: 20 },
      });

      if (response.data.success) {
        setUserRoles(response.data.data.items);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching user roles:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDivisions = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await api.get("/divisions", {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 10 },
      });

      if (response.data.success) {
        setDivisions(response.data.data.items);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching divisions:", err.message);
      setError(err.message);
    }
  };

  const handleOpenModal = (mode = "create", data = null) => {
    if (mode === "edit") {
      setCurrentRole(data);
      setEditMode(true);
    } else {
      setCurrentRole({
        role_name: "",
        division_id: divisions[0]?.id || "",
        status: "Active",
      });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveRole = async () => {
    setLoading(true);  // Menambahkan loading sebelum operasi
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");
  
      if (editMode) {
        // Untuk update role
        await api.put(`/roles/${currentRole.id}`, currentRole, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // Update langsung state userRoles untuk memperbarui data
        setUserRoles((prev) =>
          prev.map((role) =>
            role.id === currentRole.id ? { ...role, ...currentRole } : role
          )
        );
      } else {
        // Untuk tambah role
        const response = await api.post("/roles", currentRole, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // Tambahkan data baru ke userRoles
        setUserRoles((prev) => [...prev, response.data.data]);
      }
      handleCloseModal();
    } catch (err) {
      console.error("Error saving role:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);  // Menambahkan loading false setelah operasi selesai
    }
  };
  
  
  const handleDeleteRole = async () => {
    setLoading(true);  // Menambahkan loading sebelum operasi
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");
  
      await api.delete(`/roles/${currentRole.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setUserRoles((prev) => prev.filter((role) => role.id !== currentRole.id));
      handleCloseModal();
    } catch (err) {
      console.error("Error deleting role:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);  // Menambahkan loading false setelah operasi selesai
    }
  };
  

  useEffect(() => {
    fetchUserRoles();
    fetchDivisions();
  }, []);

  const filteredData = userRoles.filter((userRole) =>
    Object.values(userRole)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const formFields = [
    {
      name: "role_name",
      label: "Role Name",
      type: "text",
      value: currentRole.role_name,
      onChange: (e) =>
        setCurrentRole((prev) => ({ ...prev, role_name: e.target.value })),
    },
    {
      name: "division_id",
      label: "Division",
      type: "select",
      value: currentRole.division_id,
      options: divisions.map((division) => ({
        value: division.id,
        label: division.division_name,
      })),
      onChange: (e) =>
        setCurrentRole((prev) => ({ ...prev, division_id: e.target.value })),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      value: currentRole.status,
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
      onChange: (e) =>
        setCurrentRole((prev) => ({ ...prev, status: e.target.value })),
    },
  ];

  const columns = [
    { header: "Role ID", accessor: "role_id" },
    { header: "Role Name", accessor: "role_name" },
    { header: "Division Name", accessor: "division_name" },
    {
      header: "Status",
      accessor: (role) => (
        <span
          className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
            role.status.toLowerCase() === "active"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {role.status}
        </span>
      ),
    },
    {
      header: "Created At",
      accessor: (role) =>
        new Date(role.created_at).toLocaleDateString("en-GB"),
    },
    {
      header: "Updated At",
      accessor: (role) =>
        new Date(role.updated_at).toLocaleDateString("en-GB"),
    },
  ];

  const actions = [
    {
      icon: "fas fa-edit",
      buttonClass:
        "bg-gray-200 text-gray-400 p-3 rounded-lg flex items-center justify-center w-10 h-10",
      handler: (role) => handleOpenModal("edit", role),
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
          placeholder="Search Roles"
        />
        <AddButton onClick={() => handleOpenModal("create")} />
      </div>
      <div className="overflow-auto shadow-sm mb-6">
        {filteredData.length === 0 ? (
          <p>No user roles found.</p>
        ) : (
          <Table columns={columns} data={filteredData} actions={actions} />
        )}
      </div>

      <ModalCRUD
        isOpen={showModal}
        title={editMode ? "Edit Role" : "Tambah Baru"}
        onClose={handleCloseModal}
        onSave={handleSaveRole}
        onDelete={editMode ? handleDeleteRole : null}
        formFields={formFields}
        editMode={editMode}
      />
    </div>
  );
};

export default UserRole;
