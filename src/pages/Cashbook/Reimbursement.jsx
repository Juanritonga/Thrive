import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const DataAdvance = [
  {
    id: "RCM001",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Jon Pantau",
    updateDate: "19-01-2024",
  },
  {
    id: "RCM002",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Sara Lestari",
    updateDate: "20-01-2024",
  },
  {
    id: "RCM003",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Ali Setiawan",
    updateDate: "21-01-2024",
  },
  {
    id: "RCM004",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Eka Pratama",
    updateDate: "22-01-2024",
  },
  {
    id: "RCM005",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Budi Santoso",
    updateDate: "23-01-2024",
  },
  {
    id: "RCM006",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Cici Dewi",
    updateDate: "24-01-2024",
  },
  {
    id: "RCM007",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Dani Yudha",
    updateDate: "25-01-2024",
  },
  {
    id: "RCM008",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Gita Puspita",
    updateDate: "26-01-2024",
  },
  {
    id: "RCM009",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Rama Prabowo",
    updateDate: "27-01-2024",
  },
  {
    id: "RCM010",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Lina Sari",
    updateDate: "28-01-2024",
  },
  {
    id: "RCM011",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Jon Pantau",
    updateDate: "19-01-2024",
  },
  {
    id: "RCM012",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Cici Dewi",
    updateDate: "24-01-2024",
  },
  {
    id: "RCM013",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Dani Yudha",
    updateDate: "25-01-2024",
  },
  {
    id: "RCM014",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Gita Puspita",
    updateDate: "26-01-2024",
  },
  {
    id: "RCM015",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Rama Prabowo",
    updateDate: "27-01-2024",
  },
  {
    id: "RCM016",
    reimburse_transaction: "Balikin Duit",
    petty_cash_account: "102300",
    bank_transaction: "02310230",
    bank_code: "BCA",
    madeBy: "Lina Sari",
    updateDate: "28-01-2024",
  },
];

const Reimbursement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(DataAdvance);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  const [newItem, setNewItem] = useState({
    id: "",
    reimburse_transaction: "",
    petty_cash_account: "",
    bank_transaction: "",
    bank_code: "",
    madeBy: "",
    updateDate: new Date().toLocaleDateString("en-GB"),
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = items.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleRowClick = (id) => {
    navigate(`${id}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    if (newItem.id && newItem.reimburse_transaction && newItem.prefix && newItem.format) {
      setItems([...items, newItem]);
      setNewItem({
        id: "",
        reimburse_transaction: "",
        petty_cash_account: "",
        bank_transaction: "",
        bank_code: "",
        madeBy: "",
        updateDate: new Date().toLocaleDateString("en-GB"),
      });
      handleCloseModal();
    } else {
      alert("Isi semua field terlebih dahulu.");
    }
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
      <Outlet />
      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <div className="relative w-full sm:w-[300px]">
          <input
            type="text"
            placeholder="Cari"
            className="pl-6 pr-10 py-3 w-full border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass absolute right-2 top-1/2 transform -translate-y-1/2 text-custom-blue"></i>
        </div>

        <button
          className="bg-custom-blue text-white px-2 py-2 p-4 rounded-lg w-full sm:w-auto flex items-center justify-center space-x-2"
          onClick={handleOpenModal}
        >
          <i className="fa-solid fa-plus text-white"></i>
          <span>Tambah Baru</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto shadow-sm mb-6">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="text-custom-blue bg-gray-200">
              <th className="py-3 px-4 border">Reimburse ID</th>
              <th className="py-3 px-4 border">Reimburse Transaction</th>
              <th className="py-3 px-4 border">Petty Cash Acc.</th>
              <th className="py-3 px-4 border">Bank Transaction</th>
              <th className="py-3 px-4 border">Bank Code</th>
              <th className="py-3 px-4 border">Made By</th>
              <th className="py-3 px-4 border">Update Date</th>
              <th className="py-3 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr
                key={item.id}
                className="cursor-pointer border-t text-center text-custom-blue2"
                onClick={() => navigate(`${item.id}`)}
              >
                <td className="py-3 px-4">{item.id}</td>
                <td className="py-3 px-4">{item.reimburse_transaction}</td>
                <td className="py-3 px-4">{item.petty_cash_account}</td>
                <td className="py-3 px-4">{item.bank_transaction}</td>
                <td className="py-3 px-4">{item.bank_code}</td>
                <td className="py-3 px-4">{item.madeBy}</td>
                <td className="py-3 px-4">{item.updateDate}</td>
                <td className="py-3 px-4 border">
                  <button className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg w-12 h-12">
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <span className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length} entries
        </span>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
            <button
              className="px-4 py-2 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map(
              (_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === index + 1
                      ? "bg-custom-blue text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              className="px-4 py-2 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredData.length / itemsPerPage)
              }
            >
              &gt;
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600"></span>
            <select
              className="px-4 py-2 border rounded-md text-white bg-custom-blue "
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))} // Mengubah state itemsPerPage
            >
              <option value={10}>10 Baris</option>
              <option value={20}>20 Baris</option>
              <option value={50}>50 Baris</option>
            </select>
            <span className="text-sm text-gray-600"></span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg w-[35%] mx-auto ">
            <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg">Tambah Baru</h2>
              </div>
              <button className="text-white" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-custom-blue2">
                    Cash In / Out
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-400">
                    <option>Cash In / Out</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-custom-blue2">
                    Cash Bank ID
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-custom-blue2">
                    Transaction Receipt
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-400">
                    <option>Transaction Receipt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-custom-blue2">
                    Receipt No.
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-custom-blue2">
                    Receipt to
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-custom-blue2">
                    Bank Code
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-400">
                    <option>Bank Code</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-custom-blue2">
                    bank_transaction
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-400">
                    <option>bank_transaction</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-custom-blue2">
                    Rate
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-custom-blue2">
                    Reference
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-custom-blue2">
                    Date
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder="Tanggal"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <i className="fas fa-calendar-alt text-gray-400"></i>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-custom-blue2">
                    reimburse_transaction
                  </label>
                  <textarea
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <button
                  className="w-1/2 py-2 bg-red-500 text-white rounded hover:bg-red-500"
                  onClick={handleCloseModal}
                >
                  Delete
                </button>

                <button
                  className="w-1/2 py-2 bg-blue-700 text-white rounded hover:bg-blue-500"
                  onClick={handleAddItem}
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reimbursement;
