import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import addBank from "./BankFinanceInternal/AddBank";
import updateBank from "./BankFinanceInternal/UpdateBank";
import SearchBar from "@/components/SearchBar";
import AddButton from "@/components/AddButton";
import Table from "@/components/Table";
import ModalCRUD from "@/components/ModalCRUD";
import Pagination from "@/components/Pagination";
import { fetchCurrencys } from "./Currency";
import { fetchDivisions } from "../MasterDataInternal/User/Division";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const BankFinanceInternal = () => {
  const [currencies, setCurrencies] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBank, setCurrentBank] = useState({
    bank: "",
    account_number: "",
    account_code: "",
    currency_id: "",
    division_id: "",
    status: "Active",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchBanks = useCallback(async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      const offset = (currentPage - 1) * limit;

      const response = await api.get("/banks", {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit, offset },
      });

      if (response.data.success) {
        setBanks(response.data.data.items);
        setTotalItems(response.data.data.total || 0);
      } else {
        throw new Error(response.data.message || "Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching banks:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit]);

  const handleOpenModal = (mode = "create", bank = null) => {
    if (mode === "edit") {
      setCurrentBank(bank);
      setEditMode(true);
    } else {
      setCurrentBank({
        bank: "",
        account_number: "",
        account_code: "",
        currency_id: "",
        division_id: "",
        status: "Active",
      });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveBank = async () => {
    if (editMode) {
      await updateBank(currentBank, setBanks, setError, handleCloseModal);
    } else {
      await addBank(currentBank, setBanks, setCurrentBank, setError, handleCloseModal);
    }
    fetchBanks();
  };

  const handleDeleteBank = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token is missing.");

      await api.delete(`/banks/${currentBank.bank_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBanks((prev) => prev.filter((bank) => bank.bank_id !== currentBank.bank_id));
      handleCloseModal();
    } catch (err) {
      console.error("Error deleting bank:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const data = await fetchCurrencys();
        setCurrencies(data);
      } catch (err) {
        console.error("Error loading currencies:", err.message);
        setError(err.message);
      }
    };

    const loadDivisions = async () => {
      try {
        const data = await fetchDivisions();
        setDivisions(data);
      } catch (err) {
        console.error("Error loading divisions:", err.message);
        setError(err.message);
      }
    };

    loadCurrencies();
    loadDivisions();
    fetchBanks();
  }, [fetchBanks]);

  const filteredData = banks.filter((bank) =>
    Object.values(bank)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const formFields = [
    {
      name: "bank",
      label: "Bank",
      type: "text",
      value: currentBank.bank,
      onChange: (e) => setCurrentBank((prev) => ({ ...prev, bank: e.target.value })),
    },
    {
      name: "account_number",
      label: "Account Number",
      type: "number",
      value: currentBank.account_number,
      onChange: (e) =>
        setCurrentBank((prev) => ({ ...prev, account_number: e.target.value })),
    },
    {
      name: "account_code",
      label: "Account Code",
      type: "text",
      value: currentBank.account_code,
      onChange: (e) =>
        setCurrentBank((prev) => ({ ...prev, account_code: e.target.value })),
    },
    {
      name: "currency_id",
      label: "Currency",
      type: "select",
      value: currentBank.currency_id,
      options: currencies.map((currency) => ({
        value: currency.currency_id,
        label: currency.currency,
      })),
      onChange: (e) =>
        setCurrentBank((prev) => ({ ...prev, currency_id: e.target.value })),
    },
    {
      name: "division_id",
      label: "Division",
      type: "select",
      value: currentBank.division_id,
      options: divisions.map((division) => ({
        value: division.division_id,
        label: division.division_name,
      })),
      onChange: (e) =>
        setCurrentBank((prev) => ({ ...prev, division_id: e.target.value })),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      value: currentBank.status,
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
      onChange: (e) =>
        setCurrentBank((prev) => ({ ...prev, status: e.target.value })),
    },
  ];

  const columns = [
    { header: "Bank ID", accessor: "bank_id" },
    { header: "Bank", accessor: "bank" },
    { header: "Entitas", accessor: "entity" },
    { header: "No. Rekening", accessor: "account_number" },
    { header: "Dibuat Oleh", accessor: "created_by" },
    {
      header: "Tanggal Update",
      accessor: (bank) =>
        new Date(bank.updated_at)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-"),
    },
    {
      header: "Status",
      accessor: (bank) => (
        <span
          className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
            bank.status.toLowerCase() === "active"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {bank.status}
        </span>
      ),
    },
  ];

  const actions = [
    {
      icon: "fas fa-edit",
      buttonClass:
        "bg-gray-200 text-gray-400 p-3 rounded-lg flex items-center justify-center w-10 h-10",
      handler: (bank) => handleOpenModal("edit", bank),
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
          <p>No banks found.</p>
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
        title={editMode ? "Edit Currency" : "Tambah Baru"}
        onClose={handleCloseModal}
        onSave={handleSaveBank}
        onDelete={editMode ? handleDeleteBank : null}
        formFields={formFields}
        editMode={editMode}
      />
    </div>
  );
};

export default BankFinanceInternal;
