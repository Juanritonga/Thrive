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

const Division = () => {
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentDivision, setCurrentDivision] = useState({
    division_name: "",
    description: "",
    status: "Active",
  });

  const fetchDivisions = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await api.get("/divisions", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: 1, limit: 20 },
      });

      if (response.data.success) {
        setDivisions(response.data.data.items);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching divisions:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (mode = "create", division = null) => {
    if (mode === "edit") {
      setCurrentDivision(division);
      setEditMode(true);
    } else {
      setCurrentDivision({
        division_name: "",
        description: "",
        status: "Active",
      });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveDivision = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      if (editMode) {
        await api.put(`/divisions/${currentDivision.division_id}`, currentDivision, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDivisions((prev) =>
          prev.map((division) =>
            division.division_id === currentDivision.division_id
              ? { ...division, ...currentDivision }
              : division
          )
        );
      } else {
        const response = await api.post("/divisions", currentDivision, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDivisions((prev) => [...prev, response.data.data]);
      }
      handleCloseModal();
    } catch (err) {
      console.error("Error saving division:", err.message);
      setError(err.message);
    }
  };

  const handleDeleteDivision = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      await api.delete(`/divisions/${currentDivision.division_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDivisions((prev) =>
        prev.filter((division) => division.division_id !== currentDivision.division_id)
      );
      handleCloseModal();
    } catch (err) {
      console.error("Error deleting division:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  const filteredData = divisions.filter((division) =>
    Object.values(division)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const formFields = [
    {
      name: "division_name",
      label: "Division Name",
      type: "text",
      value: currentDivision.division_name,
      onChange: (e) =>
        setCurrentDivision((prev) => ({ ...prev, division_name: e.target.value })),
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      value: currentDivision.description,
      onChange: (e) =>
        setCurrentDivision((prev) => ({ ...prev, description: e.target.value })),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      value: currentDivision.status,
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
      onChange: (e) =>
        setCurrentDivision((prev) => ({ ...prev, status: e.target.value })),
    },
  ];

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
      icon: "fas fa-edit",
      buttonClass:
        "bg-gray-200 text-gray-400 p-3 rounded-lg flex items-center justify-center w-10 h-10",
      handler: (division) => handleOpenModal("edit", division),
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
          placeholder="Cari Division"
        />
        <AddButton onClick={() => handleOpenModal("create")} />
      </div>
      <div className="overflow-auto shadow-sm mb-6">
        {filteredData.length === 0 ? (
          <p>No divisions found.</p>
        ) : (
          <Table columns={columns} data={filteredData} actions={actions} />
        )}
      </div>

      <ModalCRUD
        isOpen={showModal}
        title={editMode ? "Edit Division" : "Tambah Baru"}
        onClose={handleCloseModal}
        onSave={handleSaveDivision}
        onDelete={editMode ? handleDeleteDivision : null}
        formFields={formFields}
        editMode={editMode}
      />
    </div>
  );
};

export default Division;
