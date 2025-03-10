import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import addEntity from "./Entity/AddEntity";
import updatedEntity from "./Entity/UpdatedEntity";
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

export const fetchEntitys = async () => {
  try {
    const token = sessionStorage.getItem("authToken");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await api.get("/entities", {
      headers: { Authorization: `Bearer ${token}` },
      params: { page: 1, limit: 20 },
    });

    if (response.data.success) {
      return response.data.data.items;
    } else {
      throw new Error(response.data.message || "Unexpected response format.");
    }
  } catch (err) {
    console.error("Error fetching Entity:", err.message);
    throw err;
  }
};

const Entity = () => {
  const [Entitys, setEntitys] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [access, setAccess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEntity, setCurrentEntity] = useState({
    entity_name: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    division: "",
    access: "",
    email: "",
    phone: "",
    fax: "",
    fiscal_year: "",
    audit_period: "",
    status: "",
  });

  const fetchDivisions = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await api.get("/divisions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { limit: 50 },
      });

      if (response.data.success) {
        setDivisions(response.data.data.items);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching roles:", err.message);
      setError(err.message);
    }
  }, []);
  const fetchAccess = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await api.get("/role-access", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { limit: 50 },
      });

      if (response.data.success) {
        setAccess(response.data.data.items);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching roles:", err.message);
      setError(err.message);
    }
  }, []);

  const handleOpenModal = (mode = "create", Entity = null) => {
    if (mode === "edit") {
      setCurrentEntity(Entity);
      setEditMode(true);
    } else {
      setCurrentEntity({
        entity_name: "",
        address: "",
        city: "",
        province: "",
        postal_code: "",
        division: "",
        access: "",
        email: "",
        phone: "",
        fax: "",
        fiscal_year: "",
        audit_period: "",
        status: "",
      });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveEntity = async () => {
    if (editMode) {
      await updatedEntity(
        currentEntity,
        setEntitys,
        setError,
        handleCloseModal
      );
    } else {
      await addEntity(
        currentEntity,
        setEntitys,
        setCurrentEntity,
        setError,
        handleCloseModal
      );
    }
  };

  const handleDeleteEntity = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      await api.delete(`/entities/${currentEntity.Entity_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEntitys((prev) =>
        prev.filter(
          (Entity) => Entity.Entity_id !== currentEntity.Entity_id
        )
      );
      handleCloseModal();
    } catch (err) {
      console.error("Error deleting Entity:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEntitys();
        setEntitys(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDivisions();
    fetchAccess();
    fetchData();
  }, []);

  const filteredData = Entitys.filter((Entity) =>
    Object.values(Entity)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const formFields = [
    {
      name: "entity_name",
      label: "Entity Name",
      type: "text",
      value: currentEntity.entity_name,
      onChange: (e) =>
        setCurrentEntity((prev) => ({
          ...prev,
          entity_name: e.target.value,
        })),
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      value: currentEntity.address,
      onChange: (e) =>
        setCurrentEntity((prev) => ({ ...prev, address: e.target.value })),
    },
    {
      name: "city",
      label: "City",
      type: "text",
      value: currentEntity.city,
      onChange: (e) =>
        setCurrentEntity((prev) => ({ ...prev, city: e.target.value })),
    },
    {
      name: "province",
      label: "Provinsi",
      type: "text",
      value: currentEntity.province,
      onChange: (e) =>
        setCurrentEntity((prev) => ({ ...prev, province: e.target.value })),
    },
    {
      name: "postal_code",
      label: "Postal Code",
      type: "text",
      value: currentEntity.postal_code,
      onChange: (e) =>
        setCurrentEntity((prev) => ({ ...prev, postal_code: e.target.value })),
    },
    {
      name: "division_id",
      label: "Division",
      type: "select",
      value: currentEntity.division_id,
      options: divisions.map((division) => ({
        value: division.id,
        label: division.division_name,
      })),
      onChange: (e) =>
        setCurrentEntity((prev) => ({ ...prev, division_id: e.target.value })),
    },
    {
      name: "access",
      label: "Access",
      type: "select",
      value: currentEntity.access_id,
      options: access.map((access) => ({
        value: access.id,
        label: access.role_name,
      })),
      onChange: (e) =>
        setCurrentEntity((prev) => ({ ...prev, access_id: e.target.value })),
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      value: currentEntity.email,
      onChange: (e) =>
        setCurrentEntity((prev) => ({ ...prev, email: e.target.value })),
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
      value: currentEntity.phone,
      onChange: (e) =>
        setCurrentEntity((prev) => ({ ...prev, phone: e.target.value })),
    },
    {
      name: "fax",
      label: "Fax",
      type: "text",
      value: currentEntity.fax,
      onChange: (e) =>
        setCurrentEntity((prev) => ({ ...prev, fax: e.target.value })),
    },
    {
      name: "fiscal_year",
      label: "Fiscal Year",
      type: "text",
      value: currentEntity.fiscal_year,
      onChange: (e) =>
        setCurrentEntity((prev) => ({ ...prev, fiscal_year: e.target.value })),
    },
    {
      name: "audit_period",
      label: "Audit Period",
      type: "text",
      value: currentEntity.audit_period,
      onChange: (e) =>
        setCurrentEntity((prev) => ({
          ...prev,
          audit_period: e.target.value,
        })),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      value: currentEntity.status,
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
      onChange: (e) =>
        setCurrentEntity((prev) => ({ ...prev, status: e.target.value })),
    },
  ];

  const columns = [
    { header: "Entity ID", accessor: "entity_id" },
    { header: "Entity Name", accessor: "entity_name" },
    { header: "City", accessor: "city" },
    { header: "Created By", accessor: "created_by" },
    {
      header: "Updated At",
      accessor: (role) => new Date(role.updated_at).toLocaleDateString("en-GB"),
    },
    {
      header: "Status",
      accessor: (Entity) => (
        <span
          className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
            Entity.status.toLowerCase() === "active"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {Entity.status}
        </span>
      ),
    },
  ];

  const actions = [
    {
      icon: "fas fa-edit",
      buttonClass:
        "bg-gray-200 text-gray-400 p-3 rounded-lg flex items-center justify-center w-10 h-10",
      handler: (Entity) => handleOpenModal("edit", Entity),
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
          placeholder="Cari Entity"
        />
        <AddButton onClick={() => handleOpenModal("create")} />
      </div>
      <div className="overflow-auto shadow-sm mb-6">
        {filteredData.length === 0 ? (
          <p>No Entitys found.</p>
        ) : (
          <Table columns={columns} data={filteredData} actions={actions} />
        )}
      </div>

      <ModalCRUD
        isOpen={showModal}
        title={editMode ? "Edit Entity" : "Tambah Baru"}
        onClose={handleCloseModal}
        onSave={handleSaveEntity}
        onDelete={editMode ? handleDeleteEntity : null}
        formFields={formFields}
        editMode={editMode}
      />
    </div>
  );
};

export default Entity;
