import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import Table from "@/components/Table";
import SearchBar from "@/components/SearchBar";
import AddButton from "@/components/AddButton";
import ModalCRUD from "@/components/ModalCRUD";
import Pagination from "@/components/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchUserRoles = useCallback(async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");
  
      const offset = (currentPage - 1) * limit;
  
      const response = await api.get("/roles", {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit, offset },
      });
  
      console.log("API Response:", response.data); // Tambahkan ini untuk debugging
  
      if (response.data.success) {
        const formattedRoles = response.data.data.items.map((role) => ({
          ...role,
          created_at: role.created_at ? new Date(role.created_at) : new Date(), // Pastikan ada nilai
          updated_at: role.updated_at ? new Date(role.updated_at) : new Date(),
        }));
  
        console.log("Formatted Roles:", formattedRoles); // Debugging sebelum disimpan ke state
  
        setUserRoles(formattedRoles);
        setTotalItems(response.data.data.total || 0);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching user roles:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit]);
  

  const fetchDivisions = useCallback(async () => {
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
  }, []);

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
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");
  
      const timestamp = new Date().toISOString();
  
      if (editMode) {
        await api.put(`/roles/${currentRole.id}`, {
          ...currentRole,
          updated_at: timestamp,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setUserRoles((prev) =>
          prev.map((role) =>
            role.id === currentRole.id
              ? { ...role, ...currentRole, updated_at: timestamp }
              : role
          )
        );
      } else {
        const response = await api.post("/roles", {
          ...currentRole,
          created_at: timestamp,
          updated_at: timestamp,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // Cari division_name berdasarkan division_id yang dipilih
        const division = divisions.find((d) => d.id === currentRole.division_id);
        const division_name = division ? division.division_name : "Unknown";
  
        setUserRoles((prev) => [
          ...prev,
          {
            ...response.data.data,
            division_name, // Tambahkan division_name agar langsung muncul di tabel
            created_at: timestamp,
            updated_at: timestamp,
          },
        ]);
      }
      handleCloseModal();
    } catch (err) {
      console.error("Error saving role:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleDeleteRole = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRoles();
    fetchDivisions();
  }, [fetchUserRoles, fetchDivisions]);

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
    { header: "Role", accessor: "role_name" },
    { header: "Division", accessor: "division_name" }, // Pastikan pakai division_name
    {
      header: "Created At",
      accessor: (role) =>
        role.created_at && !isNaN(new Date(role.created_at))
          ? new Date(role.created_at).toLocaleDateString("en-GB")
          : "-",
    },
    {
      header: "Updated At",
      accessor: (role) =>
        role.updated_at && !isNaN(new Date(role.updated_at))
          ? new Date(role.updated_at).toLocaleDateString("en-GB")
          : "-",
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
