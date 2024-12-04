import { useState } from "react";

export const TypeData = [
    {
        id: "FRM001",
        description: "Journal Memorial",
        type: "Lab/II/AA/0624",
        prefix: "JM",
        madeBy: "Jon Pantau",
        updateDate: "19-01-2024",
        acquistion:"Yes",
      },
      {
        id: "FRM002",
        description: "Expense Report",
        type: "Lab/II/BB/0624",
        prefix: "ER",
        madeBy: "Sara Lestari",
        updateDate: "20-01-2024",
        acquistion:"Yes",
      },
      {
        id: "FRM003",
        description: "Purchase Order",
        type: "Lab/III/CC/0724",
        prefix: "PO",
        madeBy: "Ali Setiawan",
        updateDate: "21-01-2024",
        acquistion:"Yes",
      },
      {
        id: "FRM004",
        description: "Invoice",
        type: "Lab/IV/DD/0824",
        prefix: "INV",
        madeBy: "Eka Pratama",
        updateDate: "22-01-2024",
        acquistion:"Yes",
      },
      {
        id: "FRM005",
        description: "Payment Voucher",
        type: "Lab/V/EE/0924",
        prefix: "PV",
        madeBy: "Budi Santoso",
        updateDate: "23-01-2024",
        acquistion:"Yes",
      },
      {
        id: "FRM006",
        description: "Budget Plan",
        type: "Lab/VI/FF/1024",
        prefix: "BP",
        madeBy: "Cici Dewi",
        updateDate: "24-01-2024",
        acquistion:"Yes",
      },
      {
        id: "FRM007",
        description: "Cash Receipt",
        type: "Lab/VII/GG/1124",
        prefix: "CR",
        madeBy: "Dani Yudha",
        updateDate: "25-01-2024",
        acquistion:"Yes",
      },
      {
        id: "FRM008",
        description: "Credit Memo",
        type: "Lab/VIII/HH/1224",
        prefix: "CM",
        madeBy: "Gita Puspita",
        updateDate: "26-01-2024",
        acquistion:"Yes",
      },
      {
        id: "FRM009",
        description: "Payment Receipt",
        type: "Lab/IX/II/1324",
        prefix: "PR",
        madeBy: "Rama Prabowo",
        updateDate: "27-01-2024",
        acquistion:"Yes",
      },
      {
        id: "FRM010",
        description: "Refund Request",
        type: "Lab/X/JJ/1424",
        prefix: "RR",
        madeBy: "Lina Sari",
        updateDate: "28-01-2024",
        acquistion:"Yes",
      },
      {
        id: "FRM0011",
        description: "Journal Memorial",
        type: "Lab/II/AA/0624",
        prefix: "JM",
        madeBy: "Jon Pantau",
        updateDate: "19-01-2024",
        acquistion:"Yes",
      },
      {
        id: "FRM0012",
        description: "Budget Plan",
        type: "Lab/VI/FF/1024",
        prefix: "BP",
        madeBy: "Cici Dewi",
        updateDate: "24-01-2024",
        acquistion:"Yes",
      },
      {
        id: "FRM0013",
        description: "Cash Receipt",
        type: "Lab/VII/GG/1124",
        prefix: "CR",
        madeBy: "Dani Yudha",
        updateDate: "25-01-2024",
        acquistion:"Yes",
      },
      {
        id: "FRM0014",
        description: "Credit Memo",
        type: "Lab/VIII/HH/1224",
        prefix: "CM",
        madeBy: "Gita Puspita",
        updateDate: "26-01-2024",
        acquistion:"Yes",
      },
      {
        id: "FRM0015",
        description: "Payment Receipt",
        type: "Lab/IX/II/1324",
        prefix: "PR",
        madeBy: "Rama Prabowo",
        updateDate: "27-01-2024",
        acquistion:"Yes",
      },
      {
        id: "FRM016",
        description: "Refund Request",
        type: "Lab/X/JJ/1424",
        prefix: "RR",
        madeBy: "Lina Sari",
        updateDate: "28-01-2024",
        acquistion:"Yes",
      },
];

const Type = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(TypeData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);  // Ubah jadi state

  const [newItem, setNewItem] = useState({
    id: "",
    description: "",
    type: "",
    prefix: "",
    madeBy: "", // Bisa diubah jika user mengisi sendiri
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    if (newItem.id && newItem.description && newItem.prefix && newItem.type) {
        setItems([...items, newItem]);
        setNewItem({
          id: "",
          description: "",
          type: "",
          prefix: "",
          madeBy: "Default User",
          updateDate: new Date().toLocaleDateString("en-GB"),
          acquistion: "Yes",
        });
        handleCloseModal(); // Pindahkan ke sini
      } else {
        alert("Isi semua field terlebih dahulu.");
      }      
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
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
              <th className="py-3 px-4 border">Acq. Type ID</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">Type</th>
              <th className="py-3 px-4 border">Prefix</th>
              <th className="py-3 px-4 border">Made By</th>
              <th className="py-3 px-4 border">Update Date</th>
              <th className="py-3 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr
                key={item.id}
                className="border-t text-center text-custom-blue2"
              >
                <td className="py-3 px-4">{item.id}</td>
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4">{item.type}</td>
                <td className="py-3 px-4">{item.prefix}</td>
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
          {/* Tombol untuk memilih jumlah item per halaman */}

          {/* Pagination buttons */}
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
              value={itemsPerPage}  // Tampilkan sesuai state itemsPerPage
              onChange={(e) => setItemsPerPage(Number(e.target.value))}  // Mengubah state itemsPerPage
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

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700">Format ID</label>
                  <input
                    type="text"
                    name="id"
                    value={newItem.id}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Prefix</label>
                  <input
                    type="text"
                    name="prefix"
                    value={newItem.prefix}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newItem.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded h-24"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700">Type</label>
                  <input
                    type="text"
                    name="type"
                    value={newItem.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Status</label>
                  <select
                    name="acquistion"
                    value={newItem.acquistion}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <button
                  className="w-1/2 py-2 bg-red-400 text-white rounded hover:bg-red-500"
                  onClick={handleCloseModal}
                >
                  Delete
                </button>

                <button
                  className="w-1/2 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
                  onClick={handleAddItem}
                >
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

export default Type;

