import { useState } from "react";

export const testData = [
    {
      agencyCode: "AGEN001",
      agencyName: "CV Jual Rumah",
      type: "Company",
      address: "Jakarta",
      pic: "Jaja Miharja",
      contact: "081234567890",
    },
    {
      agencyCode: "AGEN002",
      agencyName: "PT Properti Maju",
      type: "Company",
      address: "Bandung",
      pic: "Rina Marlina",
      contact: "082345678901",
    },
    {
      agencyCode: "AGEN003",
      agencyName: "CV Cipta Griya",
      type: "Company",
      address: "Surabaya",
      pic: "Dedi Sutisna",
      contact: "083456789012",
    },
    {
      agencyCode: "AGEN004",
      agencyName: "Agus Property",
      type: "Individual",
      address: "Depok",
      pic: "Agus Salim",
      contact: "084567890123",
    },
    {
      agencyCode: "AGEN005",
      agencyName: "PT Rumah Idaman",
      type: "Company",
      address: "Yogyakarta",
      pic: "Intan Permatasari",
      contact: "085678901234",
    },
    {
      agencyCode: "AGEN006",
      agencyName: "CV Bangun Jaya",
      type: "Company",
      address: "Bekasi",
      pic: "Anton Prabowo",
      contact: "086789012345",
    },
    {
      agencyCode: "AGEN007",
      agencyName: "PT Hunian Nyaman",
      type: "Company",
      address: "Tangerang",
      pic: "Nina Kartika",
      contact: "087890123456",
    },
    {
      agencyCode: "AGEN008",
      agencyName: "Rudi Property",
      type: "Individual",
      address: "Bogor",
      pic: "Rudi Hartono",
      contact: "088901234567",
    },
    {
      agencyCode: "AGEN009",
      agencyName: "CV Mega Properti",
      type: "Company",
      address: "Semarang",
      pic: "Mega Syafira",
      contact: "089012345678",
    },
    {
      agencyCode: "AGEN010",
      agencyName: "PT Asri Mandiri",
      type: "Company",
      address: "Medan",
      pic: "Dian Wicaksono",
      contact: "081122334455",
    },
  ];  

const SalesAgent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(testData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [error, setError] = useState("");

  const [newItem, setNewItem] = useState({
    agencyCode: "",
    agencyName: "",
    type: "",
    address: "",
    pic: "",
    contact: "",
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
      !newItem.agencyCode ||
      !newItem.agencyName ||
      !newItem.type ||
      !newItem.address ||
      !newItem.pic ||
      !newItem.contact
    ) {
      setError("Isi semua field terlebih dahulu.");
      return;
    }

    if (items.some((item) => item.agencyCode === newItem.agencyCode)) {
      setError("Agency Code sudah ada. Harap gunakan code yang unik.");
      return;
    }

    setItems([...items, newItem]);
    setNewItem({
      agencyCode: "",
      agencyName: "",
      type: "",
      address: "",
      pic: "",
      contact: "",
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
              <th className="py-3 px-4 border">Agency Code</th>
              <th className="py-3 px-4 border">Agency Name</th>
              <th className="py-3 px-4 border">Type</th>
              <th className="py-3 px-4 border">Address</th>
              <th className="py-3 px-4 border">PIC</th>
              <th className="py-3 px-4 border">Contact</th>
              <th className="py-3 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={index}
                className="border-t text-center text-custom-blue2"
              >
                <td className="py-3 px-4">{item.agencyCode}</td>
                <td className="py-3 px-4">{item.agencyName}</td>
                <td className="py-3 px-4">{item.type}</td>
                <td className="py-3 px-4">{item.address}</td>
                <td className="py-3 px-4">{item.pic}</td>
                <td className="py-3 px-4">{item.contact}</td>
                <td className="py-3 px-4">
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
              <h2 className="text-lg">Tambah Agen Baru</h2>
              <button className="text-white" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Agency Code</label>
                  <input
                    type="text"
                    name="agencyCode"
                    value={newItem.agencyCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Contoh: AGEN001"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Agency Name</label>
                  <input
                    type="text"
                    name="agencyName"
                    value={newItem.agencyName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Nama agen/perusahaan"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Type</label>
                  <select
                    name="type"
                    value={newItem.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Pilih Type</option>
                    <option value="Company">Company</option>
                    <option value="Individual">Individual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={newItem.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Alamat lengkap"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">PIC</label>
                  <input
                    type="text"
                    name="pic"
                    value={newItem.pic}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Nama penanggung jawab"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={newItem.contact}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Nomor telepon/HP"
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

export default SalesAgent;