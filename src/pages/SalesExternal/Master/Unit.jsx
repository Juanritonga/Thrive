import { useState } from "react";

export const testData = [
    {
      propertyType: "Perumahan",
      lotNumber: "001",
      commercial: "For Sale",
      lotStatus: "Indent",
      area: "200 m2",
      harga: "Rp 2.000.000.000",
    },
    {
      propertyType: "Perumahan",
      lotNumber: "002",
      commercial: "For Sale",
      lotStatus: "Ready",
      area: "180 m2",
      harga: "Rp 1.800.000.000",
    },
    {
      propertyType: "Ruko",
      lotNumber: "003",
      commercial: "For Rent",
      lotStatus: "Occupied",
      area: "150 m2",
      harga: "Rp 15.000.000/bulan",
    },
    {
      propertyType: "Perumahan",
      lotNumber: "004",
      commercial: "For Sale",
      lotStatus: "Ready",
      area: "250 m2",
      harga: "Rp 2.500.000.000",
    },
    {
      propertyType: "Kantor",
      lotNumber: "005",
      commercial: "For Rent",
      lotStatus: "Vacant",
      area: "300 m2",
      harga: "Rp 25.000.000/bulan",
    },
    {
      propertyType: "Perumahan",
      lotNumber: "006",
      commercial: "For Sale",
      lotStatus: "Indent",
      area: "190 m2",
      harga: "Rp 1.900.000.000",
    },
    {
      propertyType: "Ruko",
      lotNumber: "007",
      commercial: "For Sale",
      lotStatus: "Ready",
      area: "160 m2",
      harga: "Rp 2.200.000.000",
    },
    {
      propertyType: "Perumahan",
      lotNumber: "008",
      commercial: "For Rent",
      lotStatus: "Occupied",
      area: "210 m2",
      harga: "Rp 12.000.000/bulan",
    },
    {
      propertyType: "Gudang",
      lotNumber: "009",
      commercial: "For Rent",
      lotStatus: "Vacant",
      area: "500 m2",
      harga: "Rp 30.000.000/bulan",
    },
    {
      propertyType: "Perumahan",
      lotNumber: "010",
      commercial: "For Sale",
      lotStatus: "Ready",
      area: "220 m2",
      harga: "Rp 2.200.000.000",
    },
  ];

const Unit = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(testData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [error, setError] = useState("");

  const [newItem, setNewItem] = useState({
    propertyType: "",
    lotNumber: "",
    commercial: "",
    lotStatus: "",
    area: "",
    harga: "",
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

  const handleOpenModal = () => {
    setError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    if (
      !newItem.propertyType ||
      !newItem.lotNumber ||
      !newItem.commercial ||
      !newItem.lotStatus ||
      !newItem.area ||
      !newItem.harga
    ) {
      setError("Isi semua field terlebih dahulu.");
      return;
    }

    if (items.some((item) => item.lotNumber === newItem.lotNumber)) {
      setError("Nomor Lot sudah ada. Harap gunakan nomor yang unik.");
      return;
    }

    setItems([...items, newItem]);
    setNewItem({
      propertyType: "",
      lotNumber: "",
      commercial: "",
      lotStatus: "",
      area: "",
      harga: "",
    });
    handleCloseModal();
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
          className="bg-custom-blue text-white px-4 py-2 rounded-lg w-full sm:w-auto flex items-center justify-center space-x-2"
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
              <th className="py-3 px-4 border">Property Type</th>
              <th className="py-3 px-4 border">Lot No.</th>
              <th className="py-3 px-4 border">Commercial</th>
              <th className="py-3 px-4 border">Lot Status</th>
              <th className="py-3 px-4 border">Area</th>
              <th className="py-3 px-4 border">Harga</th>
              <th className="py-3 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={index}
                className="border-t text-center text-custom-blue2"
              >
                <td className="py-3 px-4">{item.propertyType}</td>
                <td className="py-3 px-4">{item.lotNumber}</td>
                <td className="py-3 px-4">{item.commercial}</td>
                <td className="py-3 px-4">{item.lotStatus}</td>
                <td className="py-3 px-4">{item.area}</td>
                <td className="py-3 px-4">{item.harga}</td>
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
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg w-[600px]">
            <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
              <h2 className="text-lg">Tambah Baru</h2>
              <button className="text-white" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Property Type</label>
                  <input
                    type="text"
                    name="propertyType"
                    value={newItem.propertyType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Lot No.</label>
                  <input
                    type="text"
                    name="lotNumber"
                    value={newItem.lotNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Commercial</label>
                  <select
                    name="commercial"
                    value={newItem.commercial}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Pilih Commercial</option>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Lot Status</label>
                  <select
                    name="lotStatus"
                    value={newItem.lotStatus}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Pilih Status</option>
                    <option value="Ready">Ready</option>
                    <option value="Indent">Indent</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Vacant">Vacant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Area</label>
                  <input
                    type="text"
                    name="area"
                    value={newItem.area}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Contoh: 200 m2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Harga</label>
                  <input
                    type="text"
                    name="harga"
                    value={newItem.harga}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Contoh: Rp 2.000.000.000"
                  />
                </div>
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

export default Unit;