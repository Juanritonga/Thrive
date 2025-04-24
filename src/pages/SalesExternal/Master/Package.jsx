import { useState } from "react";

export const testData = [
  {
    packageCode: "PACK001",
    description: "Special Package",
    taxCode: "001",
    price: "Rp 200.000.000",
    startDate: "24/05/2023",
    endDate: "24/05/2029",
    status: "Active",
  },
  {
    packageCode: "PACK002",
    description: "Promo Akhir Tahun",
    taxCode: "002",
    price: "Rp 150.000.000",
    startDate: "01/12/2023",
    endDate: "31/12/2023",
    status: "Expired",
  },
  {
    packageCode: "PACK003",
    description: "Paket Premium",
    taxCode: "003",
    price: "Rp 350.000.000",
    startDate: "01/01/2024",
    endDate: "01/01/2030",
    status: "Active",
  },
  {
    packageCode: "PACK004",
    description: "Paket Reguler",
    taxCode: "004",
    price: "Rp 100.000.000",
    startDate: "15/03/2024",
    endDate: "15/03/2028",
    status: "Active",
  },
  {
    packageCode: "PACK005",
    description: "Paket Khusus Member",
    taxCode: "005",
    price: "Rp 180.000.000",
    startDate: "01/06/2023",
    endDate: "01/06/2027",
    status: "Inactive",
  },
  {
    packageCode: "PACK006",
    description: "Bundling Paket Properti",
    taxCode: "006",
    price: "Rp 400.000.000",
    startDate: "10/10/2022",
    endDate: "10/10/2026",
    status: "Active",
  },
  {
    packageCode: "PACK007",
    description: "Diskon Spesial Developer",
    taxCode: "007",
    price: "Rp 90.000.000",
    startDate: "20/08/2024",
    endDate: "20/08/2025",
    status: "Upcoming",
  },
  {
    packageCode: "PACK008",
    description: "Paket Ekonomis",
    taxCode: "008",
    price: "Rp 75.000.000",
    startDate: "01/01/2023",
    endDate: "01/01/2026",
    status: "Active",
  },
  {
    packageCode: "PACK009",
    description: "Paket Investasi",
    taxCode: "009",
    price: "Rp 500.000.000",
    startDate: "12/12/2023",
    endDate: "12/12/2029",
    status: "Active",
  },
  {
    packageCode: "PACK010",
    description: "Paket Musiman",
    taxCode: "010",
    price: "Rp 120.000.000",
    startDate: "01/04/2024",
    endDate: "30/06/2024",
    status: "Active",
  },
];

const Package = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(testData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [newItem, setNewItem] = useState({
    packageCode: "",
    description: "",
    taxCode: "",
    price: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

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
    if (
      newItem.packageCode &&
      newItem.description &&
      newItem.taxCode &&
      newItem.price &&
      newItem.startDate &&
      newItem.endDate
    ) {
      setItems([...items, newItem]);
      setNewItem({
        packageCode: "",
        description: "",
        taxCode: "",
        price: "",
        startDate: "",
        endDate: "",
        status: "Active",
      });
      handleCloseModal();
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
              <th className="py-3 px-4 border">Package Code</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">Tax Code</th>
              <th className="py-3 px-4 border">Price</th>
              <th className="py-3 px-4 border">Start Date</th>
              <th className="py-3 px-4 border">End Date</th>
              <th className="py-3 px-4 border">Status</th>
              <th className="py-3 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className="border-t text-center text-custom-blue2">
                <td className="py-3 px-4">{item.packageCode}</td>
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4">{item.taxCode}</td>
                <td className="py-3 px-4">{item.price}</td>
                <td className="py-3 px-4">{item.startDate}</td>
                <td className="py-3 px-4">{item.endDate}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-6 py-1 rounded-full font-bold w-max ${
                      item.status === "Active"
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 border">
                  <button className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg items-center w-12 h-12">
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
              className="px-4 py-2 border rounded-md text-white bg-custom-blue"
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg w-[600px]">
            <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg">Tambah Baru</h2>
              </div>
              <button className="text-white" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Package Code</label>
                    <input
                      type="text"
                      name="packageCode"
                      value={newItem.packageCode}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Tax Code</label>
                    <input
                      type="text"
                      name="taxCode"
                      value={newItem.taxCode}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Start Date</label>
                    <input
                      type="text"
                      name="startDate"
                      value={newItem.startDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Description</label>
                    <input
                      type="text"
                      name="description"
                      value={newItem.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Price</label>
                    <input
                      type="text"
                      name="price"
                      value={newItem.price}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g. Rp 200.000.000"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">End Date</label>
                    <input
                      type="text"
                      name="endDate"
                      value={newItem.endDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  value={newItem.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-between gap-4 mt-6">
                <button
                  className="w-1/2 py-2 bg-red-400 text-white rounded hover:bg-red-500"
                  onClick={handleCloseModal}
                >
                  Batal
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

export default Package;