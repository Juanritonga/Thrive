import axios from "axios";
import { useState, useEffect } from "react";
import addCurrency from "./Currency/AddCurrency";
import updatedCurrency from "./Currency/UpdatedCurrency";
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

const Currency = () => {
  const [currencys, setCurrencys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState({
    currency: "",
    code: "",
    conv_rate: "",
    status: "Active",
  });

  const fetchCurrencys = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const response = await api.get("/currencies", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: 1, limit: 20 },
      });

      if (response.data.success) {
        setCurrencys(response.data.data.items);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching Currency:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (mode = "create", currency = null) => {
    if (mode === "edit") {
      setCurrentCurrency(currency);
      setEditMode(true);
    } else {
      setCurrentCurrency({
        currency: "",
        code: "",
        conv_rate: "",
        status: "Active",
      });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveCurrency = async () => {
    if (editMode) {
      await updatedCurrency(
        currentCurrency,
        setCurrencys,
        setError,
        handleCloseModal
      );
    } else {
      await addCurrency(
        currentCurrency,
        setCurrencys,
        setCurrentCurrency,
        setError,
        handleCloseModal
      );
    }
  };

 const handleDeleteCurrency = async () => {
     try {
       const token = sessionStorage.getItem("authToken");
       if (!token) throw new Error("Authorization token is missing.");
 
       await api.delete(`/currencies/${currentCurrency.currency_id}`, {
         headers: { Authorization: `Bearer ${token}` },
       });
 
       setCurrencys((prev) =>
         prev.filter((currency) => currency.currency_id !== currentCurrency.currency_id)
       );
       handleCloseModal();
     } catch (err) {
       console.error("Error deleting currency:", err.message);
       setError(err.message);
     }
   };
 
   useEffect(() => {
     fetchCurrencys();
   }, []);

   const filteredData = currencys.filter((currency) =>
    Object.values(currency)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const formFields = [
    {
      name: "currency",
      label: "Currency",
      type: "text",
      value: currentCurrency.currency,
      onChange: (e) =>
        setCurrentCurrency((prev) => ({ ...prev, currency: e.target.value })),
    },
    {
      name: "code",
      label: "Kode",
      type: "text",
      value: currentCurrency.code,
      onChange: (e) =>
        setCurrentCurrency((prev) => ({ ...prev, code: e.target.value })),
    },
    {
      name: "conv_rate",
      label: "Conversi Rate",
      type: "number",
      value: currentCurrency.conv_rate,
      onChange: (e) =>
        setCurrentCurrency((prev) => ({ ...prev, conv_rate: e.target.value })),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      value: currentCurrency.status,
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
      onChange: (e) =>
        setCurrentCurrency((prev) => ({ ...prev, status: e.target.value })),
    },
  ];

  const columns = [
    { header: "Currency ID", accessor: "currency_id" },
    { header: "Currency", accessor: "currency" },
    { header: "Kode", accessor: "code" },
    { header: "Konversi", accessor: "conv_rate" },
    { header: "Dibuat Oleh", accessor: "created_by" },
    {
      header: "Tanggal Update",
      accessor: (currency) =>
        new Date(currency.updated_at)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-"),
    },
    {
      header: "Status",
      accessor: (currency) => (
        <span
          className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
            currency.status.toLowerCase() === "active"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {currency.status}
        </span>
      ),
    },
  ];

  const actions = [
    {
      icon: "fas fa-edit",
      buttonClass:
        "bg-gray-200 text-gray-400 p-3 rounded-lg flex items-center justify-center w-10 h-10",
      handler: (currency) => console.log("Edit action for:", currency),
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
          placeholder="Cari Currency"
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
        title={editMode ? "Edit Currency" : "Tambah Baru"}
        onClose={handleCloseModal}
        onSave={handleSaveCurrency}
        onDelete={editMode ? handleDeleteCurrency : null}
        formFields={formFields}
        editMode={editMode}
      />
    </div>
  );
};

export default Currency;
