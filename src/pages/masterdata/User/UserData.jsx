import axios from "axios";
import { useState, useEffect } from "react";
import Table from "@/components/Table";
import SearchBar from "@/components/SearchBar";
import ModalCRUD from "@/components/ModalCRUD";
import AddButton from "@/components/AddButton";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const User = () => {
  const [users, setUsers] = useState([]);
  const [entities, setEntities] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    full_name: "",
    position: "",
    role_id: "",
    entity_id: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
    password: "",
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page: 1, limit: 20 },
      });

      if (response.data.success) {
        setUsers(response.data.data.items);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching users:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await api.get("/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { limit: 10 },
      });

      if (response.data.success) {
        setRoles(response.data.data.items);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching roles:", err.message);
      setError(err.message);
    }
  };

  const fetchEntities = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await api.get("/entities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { limit: 10 },
      });

      if (response.data.success) {
        setEntities(response.data.data.items);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching entities:", err.message);
      setError(err.message);
    }
  };

  const handleOpenModal = (mode = "create", data = null) => {
    if (mode === "edit") {
      setCurrentUser(data);
      setEditMode(true);
    } else {
      setCurrentUser({
        full_name: "",
        position: "",
        role_id: roles[0]?.id || "",
        entity_id: entities[0]?.id || "",
        email: "",
        phone: "",
        address: "",
        status: "Active",
        password: "",
      });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveUser = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      if (editMode) {
        await api.put(`/users/${currentUser.id}`, currentUser, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers((prev) =>
          prev.map((user) =>
            user.id === currentUser.id ? { ...user, ...currentUser } : user
          )
        );
      } else {
        const response = await api.post("/users", currentUser, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers((prev) => [...prev, response.data.data]);
      }
      handleCloseModal();
    } catch (err) {
      console.error("Error saving user:", err.message);
      setError(err.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      await api.delete(`/users/${currentUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) => prev.filter((user) => user.id !== currentUser.id));
      handleCloseModal();
    } catch (err) {
      console.error("Error deleting user:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchEntities();
  }, []);

  const filteredData = users.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const formFields = [
    {
      name: "full_name",
      label: "Full Name",
      type: "text",
      value: currentUser.full_name,
      onChange: (e) =>
        setCurrentUser((prev) => ({ ...prev, full_name: e.target.value })),
    },
    {
      name: "position",
      label: "Position",
      type: "text",
      value: currentUser.position,
      onChange: (e) =>
        setCurrentUser((prev) => ({ ...prev, position: e.target.value })),
    },
    {
      name: "role_id",
      label: "Role",
      type: "select",
      value: currentUser.role_id,
      options: roles.map((role) => ({
        value: role.id,
        label: role.role_name,
      })),
      onChange: (e) =>
        setCurrentUser((prev) => ({ ...prev, role_id: e.target.value })),
    },
    {
      name: "entity_id",
      label: "Entity",
      type: "select",
      value: currentUser.entity_id,
      options: entities.map((entity) => ({
        value: entity.id,
        label: entity.entity_name,
      })),
      onChange: (e) =>
        setCurrentUser((prev) => ({ ...prev, entity_id: e.target.value })),
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      value: currentUser.email,
      onChange: (e) =>
        setCurrentUser((prev) => ({ ...prev, email: e.target.value })),
    },
    {
      name: "phone",
      label: "Phone",
      type: "tel",
      value: currentUser.phone,
      onChange: (e) =>
        setCurrentUser((prev) => ({ ...prev, phone: e.target.value })),
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      value: currentUser.address,
      onChange: (e) =>
        setCurrentUser((prev) => ({ ...prev, address: e.target.value })),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      value: currentUser.status,
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
      onChange: (e) =>
        setCurrentUser((prev) => ({ ...prev, status: e.target.value })),
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      value: currentUser.password,
      onChange: (e) =>
        setCurrentUser((prev) => ({ ...prev, password: e.target.value })),
    },
  ];

  const columns = [
    { header: "User ID", accessor: "user_id" },
    { header: "Full Name", accessor: "full_name" },
    { header: "Role", accessor: "role" },
    { header: "Entity", accessor: "entity" },
    {
      header: "Status",
      accessor: (user) => (
        <span
          className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
            user.status.toLowerCase() === "active"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {user.status}
        </span>
      ),
    },
  ];

  const actions = [
    {
      icon: "fas fa-edit",
      buttonClass:
        "bg-gray-200 text-gray-400 p-3 rounded-lg flex items-center justify-center w-10 h-10",
      handler: (user) => handleOpenModal("edit", user),
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
          placeholder="Search Users"
        />
        <AddButton onClick={() => handleOpenModal("create")} />
      </div>
      <div className="overflow-auto shadow-sm mb-6">
        {filteredData.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <Table columns={columns} data={filteredData} actions={actions} />
        )}
      </div>

      <ModalCRUD
        isOpen={showModal}
        title={editMode ? "Edit User" : "Tambah Baru"}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        onDelete={editMode ? handleDeleteUser : null}
        formFields={formFields}
        editMode={editMode}
      />
    </div>
  );
};

export default User;
