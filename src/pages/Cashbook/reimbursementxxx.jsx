import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const DataAdvance = [
  {
    id: "FRM001",
    advanceTransaction: "Journal Memorial",
    referenceNo: "JM",
    staffID: "FRM001",
    receiptNo: "Lab/II/AA/0624",
    madeBy: "Jon Pantau",
    updateDate: "19-01-2024",
  },
  {
    id: "FRM002",
    advanceTransaction: "Expense Report",
    referenceNo: "ER",
    staffID: "FRM002",
    receiptNo: "Lab/II/BB/0624",
    madeBy: "Sara Lestari",
    updateDate: "20-01-2024",
  },
  {
    id: "FRM003",
    advanceTransaction: "Purchase Order",
    referenceNo: "PO",
    staffID: "FRM003",
    receiptNo: "Lab/III/CC/0724",
    madeBy: "Ali Setiawan",
    updateDate: "21-01-2024",
  },
  {
    id: "FRM004",
    advanceTransaction: "Invoice",
    referenceNo: "INV",
    staffID: "FRM004",
    receiptNo: "Lab/IV/DD/0824",
    madeBy: "Eka Pratama",
    updateDate: "22-01-2024",
  },
  {
    id: "FRM005",
    advanceTransaction: "Payment Voucher",
    referenceNo: "PV",
    staffID: "FRM005",
    receiptNo: "Lab/V/EE/0924",
    madeBy: "Budi Santoso",
    updateDate: "23-01-2024",
  },
  {
    id: "FRM006",
    advanceTransaction: "Budget Plan",
    referenceNo: "BP",
    staffID: "FRM006",
    receiptNo: "Lab/VI/FF/1024",
    madeBy: "Cici Dewi",
    updateDate: "24-01-2024",
  },
  {
    id: "FRM007",
    advanceTransaction: "Cash Receipt",
    referenceNo: "CR",
    staffID: "FRM007",
    receiptNo: "Lab/VII/GG/1124",
    madeBy: "Dani Yudha",
    updateDate: "25-01-2024",
  },
  {
    id: "FRM008",
    advanceTransaction: "Credit Memo",
    referenceNo: "CM",
    staffID: "FRM008",
    receiptNo: "Lab/VIII/HH/1224",
    madeBy: "Gita Puspita",
    updateDate: "26-01-2024",
  },
  {
    id: "FRM009",
    advanceTransaction: "Payment Receipt",
    referenceNo: "PR",
    staffID: "FRM009",
    receiptNo: "Lab/IX/II/1324",
    madeBy: "Rama Prabowo",
    updateDate: "27-01-2024",
  },
  {
    id: "FRM010",
    advanceTransaction: "Refund Request",
    referenceNo: "RR",
    staffID: "FRM010",
    receiptNo: "Lab/X/JJ/1424",
    madeBy: "Lina Sari",
    updateDate: "28-01-2024",
  },
  {
    id: "FRM011",
    advanceTransaction: "Journal Memorial",
    referenceNo: "JM",
    staffID: "FRM011",
    receiptNo: "Lab/II/AA/0624",
    madeBy: "Jon Pantau",
    updateDate: "19-01-2024",
  },
  {
    id: "FRM012",
    advanceTransaction: "Budget Plan",
    referenceNo: "BP",
    staffID: "FRM012",
    receiptNo: "Lab/VI/FF/1024",
    madeBy: "Cici Dewi",
    updateDate: "24-01-2024",
  },
  {
    id: "FRM013",
    advanceTransaction: "Cash Receipt",
    referenceNo: "CR",
    staffID: "FRM013",
    receiptNo: "Lab/VII/GG/1124",
    madeBy: "Dani Yudha",
    updateDate: "25-01-2024",
  },
  {
    id: "FRM014",
    advanceTransaction: "Credit Memo",
    referenceNo: "CM",
    staffID: "FRM014",
    receiptNo: "Lab/VIII/HH/1224",
    madeBy: "Gita Puspita",
    updateDate: "26-01-2024",
  },
  {
    id: "FRM015",
    advanceTransaction: "Payment Receipt",
    referenceNo: "PR",
    staffID: "FRM015",
    receiptNo: "Lab/IX/II/1324",
    madeBy: "Rama Prabowo",
    updateDate: "27-01-2024",
  },
  {
    id: "FRM016",
    advanceTransaction: "Refund Request",
    referenceNo: "RR",
    staffID: "FRM016",
    receiptNo: "Lab/X/JJ/1424",
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
    advanceTransaction: "",
    referenceNo: "",
    staffID: "",
    receiptNo: "",
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
    if (newItem.id && newItem.description && newItem.prefix && newItem.format) {
      setItems([...items, newItem]);
      setNewItem({
        id: "",
        advanceTransaction: "",
        referenceNo: "",
        staffID: "",
        receiptNo: "",
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

      <div className="overflow-auto shadow-sm mb-6">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="text-custom-blue bg-gray-200">
              <th className="py-3 px-4 border">Advance ID</th>
              <th className="py-3 px-4 border">Advance Transaction</th>
              <th className="py-3 px-4 border">Refrence No.</th>
              <th className="py-3 px-4 border">Satff ID</th>
              <th className="py-3 px-4 border">Receipt No.</th>
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
                <td className="py-3 px-4">{item.advanceTransaction}</td>
                <td className="py-3 px-4">{item.referenceNo}</td>
                <td className="py-3 px-4">{item.staffID}</td>
                <td className="py-3 px-4">{item.receiptNo}</td>
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
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={10}>10 Baris</option>
              <option value={20}>20 Baris</option>
              <option value={50}>50 Baris</option>
            </select>
            <span className="text-sm text-gray-600"></span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg w-98">
            <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg">Tambah Baru</h2>
              </div>
              <button className="text-white" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cash Advance ID
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Advance Transaction
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    <option>Advance Transaction</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Receipt No.
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Receipt to
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Reference No.
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bank Code
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    <option>Bank Code</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Currency
                  </label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    <option>Currency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rate
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    rows="3"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
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
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-4 rounded-md"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md"
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
