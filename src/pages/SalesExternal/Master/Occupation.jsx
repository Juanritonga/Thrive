import { useState } from "react";

export const testData = [
    {
      occupationCode: "OCC001",
      description: "Gali Kubur",
      companyCode: "BUMN",
      company: "Pertamina",
    },
    {
      occupationCode: "OCC002",
      description: "Software Engineer",
      companyCode: "SWP001",
      company: "Tokopedia",
    },
    {
      occupationCode: "OCC003",
      description: "Marketing Executive",
      companyCode: "FIN001",
      company: "Mandiri Sekuritas",
    },
    {
      occupationCode: "OCC004",
      description: "Project Manager",
      companyCode: "CNST001",
      company: "Wijaya Karya",
    },
    {
      occupationCode: "OCC005",
      description: "UX Designer",
      companyCode: "TECH001",
      company: "Gojek",
    },
    {
      occupationCode: "OCC006",
      description: "Data Analyst",
      companyCode: "BNK001",
      company: "Bank BCA",
    },
    {
      occupationCode: "OCC007",
      description: "Dokter Umum",
      companyCode: "HLTH001",
      company: "RS Siloam",
    },
    {
      occupationCode: "OCC008",
      description: "Guru Bahasa Inggris",
      companyCode: "EDU001",
      company: "EF Education First",
    },
    {
      occupationCode: "OCC009",
      description: "Content Creator",
      companyCode: "MKT001",
      company: "IDN Media",
    },
    {
      occupationCode: "OCC010",
      description: "Teknisi Listrik",
      companyCode: "UTIL001",
      company: "PLN",
    },
  ];

const Occupation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(testData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [error, setError] = useState("");

  const [newItem, setNewItem] = useState({
    occupationCode: "",
    description: "",
    companyCode: "",
    company: "",
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
    if (!newItem.occupationCode || !newItem.description || !newItem.companyCode || !newItem.company) {
      setError("Isi semua field terlebih dahulu.");
      return;
    }

    if (items.some((item) => item.occupationCode === newItem.occupationCode)) {
      setError("Occupation Code sudah ada. Harap gunakan code yang unik.");
      return;
    }

    setItems([...items, newItem]);
    setNewItem({
      occupationCode: "",
      description: "",
      companyCode: "",
      company: "",
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
              <th className="py-3 px-4 border">Occupation Code</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">Company Code</th>
              <th className="py-3 px-4 border">Company</th>
              <th className="py-3 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className="border-t text-center text-custom-blue2">
                <td className="py-3 px-4">{item.occupationCode}</td>
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4">{item.companyCode}</td>
                <td className="py-3 px-4">{item.company}</td>
                <td className="py-3 px-4">
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
              <h2 className="text-lg">Tambah Occupation Baru</h2>
              <button className="text-white" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-700">Occupation Code</label>
                  <input
                    type="text"
                    name="occupationCode"
                    value={newItem.occupationCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Contoh: OCC001"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={newItem.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Deskripsi occupation"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Company Code</label>
                  <input
                    type="text"
                    name="companyCode"
                    value={newItem.companyCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Kode perusahaan"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={newItem.company}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Nama perusahaan"
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

export default Occupation;