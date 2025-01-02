import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import addDivision from "./Division/AddDivision";
import updatedDivision from "./Division/UpdatedDivision";
import SearchBar from "@/components/SearchBar";
import AddButton from "@/components/AddButton";
import Table from "@/components/Table";
import ModalCRUD from "@/components/ModalCRUD";
import Pagination from "@/components/Pagination";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchDivisions = async () => {
  try {
    const token = sessionStorage.getItem("authToken");
    if (!token) throw new Error("Authorization token is missing.");

    const response = await api.get("/divisions", {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchDivisions = useCallback(async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const offset = (currentPage - 1) * limit;

      const response = await api.get("/divisions", {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit, offset },
      });

      if (response.data.success) {
        setDivisions(response.data.data.items);
        setTotalItems(response.data.data.total || 0);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching divisions:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit]);

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
    if (editMode) {
      await updatedDivision(
        currentDivision,
        setDivisions,
        setError,
        handleCloseModal
      );
    } else {
      await addDivision(
        currentDivision,
        setDivisions,
        setCurrentDivision,
        setError,
        handleCloseModal
      );
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
        prev.filter(
          (division) => division.division_id !== currentDivision.division_id
        )
      );
      handleCloseModal();
    } catch (err) {
      console.error("Error deleting division:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
          try {
            const data = await fetchDivisions();
            setDivisions(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
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
        setCurrentDivision((prev) => ({
          ...prev,
          division_name: e.target.value,
        })),
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      value: currentDivision.description,
      onChange: (e) =>
        setCurrentDivision((prev) => ({
          ...prev,
          description: e.target.value,
        })),
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
    { header: "Role", accessor: "division_name" },
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
