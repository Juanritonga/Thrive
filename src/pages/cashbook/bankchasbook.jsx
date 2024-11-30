import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export const DataBank = [
  {
    id: "CB001",
    description: "Cash Bank",
    bank: "Bank ABC",
    currency: "IDR",
    receiptNo: "CB/II/AA/0624",
    madeBy: "Jon Pantau",
    updateDate: "19-01-2024",
    aksi: "Active",
  },
  {
    id: "CB002",
    description: "Cash Bank",
    bank: "Bank XYZ",
    currency: "USD",
    receiptNo: "CB/II/BB/0624",
    madeBy: "Sara Lestari",
    updateDate: "20-01-2024",
    aksi: "Inactive",
  },
  {
    id: "CB003",
    description: "Cash Bank",
    bank: "Bank DEF",
    currency: "IDR",
    receiptNo: "CB/III/CC/0724",
    madeBy: "Ali Setiawan",
    updateDate: "21-01-2024",
    aksi: "Active",
  },
  {
    id: "CB004",
    description: "Cash Bank",
    bank: "Bank GHI",
    currency: "IDR",
    receiptNo: "CB/IV/DD/0824",
    madeBy: "Eka Pratama",
    updateDate: "22-01-2024",
    aksi: "Active",
  },
  {
    id: "CB005",
    description: "Cash Bank",
    bank: "Bank JKL",
    currency: "USD",
    receiptNo: "CB/V/EE/0924",
    madeBy: "Budi Santoso",
    updateDate: "23-01-2024",
    aksi: "Inactive",
  },
  {
    id: "CB006",
    description: "Cash Bank",
    bank: "Bank MNO",
    currency: "IDR",
    receiptNo: "CB/VI/FF/1024",
    madeBy: "Cici Dewi",
    updateDate: "24-01-2024",
    aksi: "Active",
  },
  {
    id: "CB007",
    description: "Cash Bank",
    bank: "Bank PQR",
    currency: "USD",
    receiptNo: "CB/VII/GG/1124",
    madeBy: "Dani Yudha",
    updateDate: "25-01-2024",
    aksi: "Inactive",
  },
  {
    id: "CB008",
    description: "Cash Bank",
    bank: "Bank STU",
    currency: "IDR",
    receiptNo: "CB/VIII/HH/1224",
    madeBy: "Gita Puspita",
    updateDate: "26-01-2024",
    aksi: "Active",
  },
  {
    id: "CB009",
    description: "Cash Bank",
    bank: "Bank VWX",
    currency: "USD",
    receiptNo: "CB/IX/II/1324",
    madeBy: "Rama Prabowo",
    updateDate: "27-01-2024",
    aksi: "Inactive",
  },
  {
    id: "CB010",
    description: "Cash Bank",
    bank: "Bank YZA",
    currency: "IDR",
    receiptNo: "CB/X/JJ/1424",
    madeBy: "Lina Sari",
    updateDate: "28-01-2024",
    aksi: "Active",
  },
  {
    id: "CB011",
    description: "Cash Bank",
    bank: "Bank ABC",
    currency: "IDR",
    receiptNo: "CB/II/AA/0624",
    madeBy: "Jon Pantau",
    updateDate: "19-01-2024",
    aksi: "Active",
  },
  {
    id: "CB012",
    description: "Cash Bank",
    bank: "Bank DEF",
    currency: "IDR",
    receiptNo: "CB/VI/FF/1024",
    madeBy: "Cici Dewi",
    updateDate: "24-01-2024",
    aksi: "Active",
  },
  {
    id: "CB013",
    description: "Cash Bank",
    bank: "Bank XYZ",
    currency: "USD",
    receiptNo: "CB/VII/GG/1124",
    madeBy: "Dani Yudha",
    updateDate: "25-01-2024",
    aksi: "Inactive",
  },
  {
    id: "CB014",
    description: "Cash Bank",
    bank: "Bank STU",
    currency: "IDR",
    receiptNo: "CB/VIII/HH/1224",
    madeBy: "Gita Puspita",
    updateDate: "26-01-2024",
    aksi: "Active",
  },
  {
    id: "CB015",
    description: "Cash Bank",
    bank: "Bank PQR",
    currency: "USD",
    receiptNo: "CB/IX/II/1324",
    madeBy: "Rama Prabowo",
    updateDate: "27-01-2024",
    aksi: "Inactive",
  },
  {
    id: "CB016",
    description: "Cash Bank",
    bank: "Bank YZA",
    currency: "IDR",
    receiptNo: "CB/X/JJ/1424",
    madeBy: "Lina Sari",
    updateDate: "28-01-2024",
    aksi: "Active",
  },
];

const Bank = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(DataBank);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();


  const [newItem, setNewItem] = useState({
    id: "",
    description: "",
    bank: "",
    currency: "",
    receiptNo: "",
    madeBy: "Default User",
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
    navigate(`${id}`); // Navigasi ke child dengan ID
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    if (newItem.id && newItem.description && newItem.bank && newItem.currency) {
      setItems([...items, newItem]);
      setNewItem({
        id: "",
        description: "",
        bank: "",
        currency: "",
        madeBy: "Default User",
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
              <th className="py-3 px-4 border">Format ID</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">Bank</th>
              <th className="py-3 px-4 border">Currency</th>
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
              onClick={() => navigate(`${item.id}`)} // Navigasi ke rute dengan ID
            >
                <td className="py-3 px-4">{item.id}</td>
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4">{item.bank}</td>
                <td className="py-3 px-4">{item.currency}</td>
                <td className="py-3 px-4">{item.madeBy}</td>
                <td className="py-3 px-4">{item.updateDate}</td>
                <td className="py-3 px-4 border">
                  <button className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg  items-center  w-12 h-12">
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <span className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length} entries
        </span>

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
          <select
            className="px-4 py-2 border rounded-md text-white bg-custom-blue"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={10}>10 Baris</option>
            <option value={20}>20 Baris</option>
            <option value={50}>50 Baris</option>
          </select>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg">
            <div className="bg-blue-900 text-white text-lg font-semibold p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg">Tambah Baru</h2>
              </div>
              <button className="text-white" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700">Cash In / Out</label>
                  <select className="w-full mt-1 p-2 border rounded">
                    <option>Cash In / Out</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Cash Bank ID</label>
                  <input
                    type="text"
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Transaction Receipt
                  </label>
                  <select className="w-full mt-1 p-2 border rounded">
                    <option>Aktif</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Receipt No.</label>
                  <input
                    type="text"
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Receipt to</label>
                  <input
                    type="text"
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Bank Code</label>
                  <select className="w-full mt-1 p-2 border rounded">
                    <option>Bank Code</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Currency</label>
                  <select className="w-full mt-1 p-2 border rounded">
                    <option>Currency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Rate</label>
                  <input
                    type="text"
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Reference</label>
                  <input
                    type="text"
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Date</label>
                  <input
                    type="date"
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    className="w-full mt-1 p-2 border rounded"
                    rows="4"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button className="bg-red-500 text-white py-2 px-4 rounded">
                  Delete
                </button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded">
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bank;
