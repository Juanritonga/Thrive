import { useState } from "react";

export const testData = [
    {
      generationCode: "GEN001",
      startYear: "1950",
      endYear: "1970",
      description: "Baby Boomer",
    },
    {
      generationCode: "GEN002",
      startYear: "1971",
      endYear: "1980",
      description: "Early Generation X",
    },
    {
      generationCode: "GEN003",
      startYear: "1981",
      endYear: "1989",
      description: "Late Generation X",
    },
    {
      generationCode: "GEN004",
      startYear: "1990",
      endYear: "1994",
      description: "Early Millennials",
    },
    {
      generationCode: "GEN005",
      startYear: "1995",
      endYear: "1999",
      description: "Core Millennials",
    },
    {
      generationCode: "GEN006",
      startYear: "2000",
      endYear: "2004",
      description: "Gen Z - Early",
    },
    {
      generationCode: "GEN007",
      startYear: "2005",
      endYear: "2009",
      description: "Gen Z - Core",
    },
    {
      generationCode: "GEN008",
      startYear: "2010",
      endYear: "2014",
      description: "Gen Alpha - Early",
    },
    {
      generationCode: "GEN009",
      startYear: "2015",
      endYear: "2019",
      description: "Gen Alpha - Core",
    },
    {
      generationCode: "GEN010",
      startYear: "2020",
      endYear: "2025",
      description: "Gen Alpha - New Wave",
    },
  ];

const Generation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(testData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [error, setError] = useState("");

  const [newItem, setNewItem] = useState({
    generationCode: "",
    startYear: "",
    endYear: "",
    description: "",
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
    if (!newItem.generationCode || !newItem.startYear || !newItem.endYear || !newItem.description) {
      setError("Isi semua field terlebih dahulu.");
      return;
    }

    if (items.some((item) => item.generationCode === newItem.generationCode)) {
      setError("Generation Code sudah ada. Harap gunakan code yang unik.");
      return;
    }

    setItems([...items, newItem]);
    setNewItem({
      generationCode: "",
      startYear: "",
      endYear: "",
      description: "",
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
              <th className="py-3 px-4 border">Generation Code</th>
              <th className="py-3 px-4 border">Start Year</th>
              <th className="py-3 px-4 border">End Year</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className="border-t text-center text-custom-blue2">
                <td className="py-3 px-4">{item.generationCode}</td>
                <td className="py-3 px-4">{item.startYear}</td>
                <td className="py-3 px-4">{item.endYear}</td>
                <td className="py-3 px-4">{item.description}</td>
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
              <h2 className="text-lg">Tambah Generasi Baru</h2>
              <button className="text-white" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-700">Generation Code</label>
                  <input
                    type="text"
                    name="generationCode"
                    value={newItem.generationCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Contoh: GEN001"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Start Year</label>
                  <input
                    type="text"
                    name="startYear"
                    value={newItem.startYear}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Tahun mulai"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">End Year</label>
                  <input
                    type="text"
                    name="endYear"
                    value={newItem.endYear}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Tahun akhir"
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
                    placeholder="Deskripsi generasi"
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

export default Generation;