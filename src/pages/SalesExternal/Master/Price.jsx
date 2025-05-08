import { useState } from "react";

export const testData = [
    {
      propertyCode: "PROP001",
      lotType: "Cash Bertahap 12x",
      lotNumber: "A01",
      landArea: "120 m2",
      buildArea: "90 m2",
      status: "Active",
    },
    {
      propertyCode: "PROP002",
      lotType: "Cash Keras",
      lotNumber: "A02",
      landArea: "100 m2",
      buildArea: "80 m2",
      status: "Sold",
    },
    {
      propertyCode: "PROP003",
      lotType: "KPR Bank",
      lotNumber: "B01",
      landArea: "150 m2",
      buildArea: "110 m2",
      status: "Active",
    },
    {
      propertyCode: "PROP004",
      lotType: "Cash Bertahap 6x",
      lotNumber: "B02",
      landArea: "90 m2",
      buildArea: "70 m2",
      status: "Reserved",
    },
    {
      propertyCode: "PROP005",
      lotType: "Cash Bertahap 24x",
      lotNumber: "C01",
      landArea: "160 m2",
      buildArea: "120 m2",
      status: "Active",
    },
    {
      propertyCode: "PROP006",
      lotType: "KPR Developer",
      lotNumber: "C02",
      landArea: "140 m2",
      buildArea: "100 m2",
      status: "Sold",
    },
    {
      propertyCode: "PROP007",
      lotType: "Bayar 50% di Muka",
      lotNumber: "D01",
      landArea: "110 m2",
      buildArea: "85 m2",
      status: "Inactive",
    },
    {
      propertyCode: "PROP008",
      lotType: "Cash Bertahap 36x",
      lotNumber: "D02",
      landArea: "180 m2",
      buildArea: "130 m2",
      status: "Active",
    },
    {
      propertyCode: "PROP009",
      lotType: "Promo Ramadhan",
      lotNumber: "E01",
      landArea: "200 m2",
      buildArea: "150 m2",
      status: "Reserved",
    },
    {
      propertyCode: "PROP010",
      lotType: "Cash Bertahap 18x",
      lotNumber: "E02",
      landArea: "130 m2",
      buildArea: "95 m2",
      status: "Active",
    },
  ];

const Price = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(testData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [newItem, setNewItem] = useState({
    propertyCode: "",
    lotType: "",
    lotNumber: "",
    landArea: "",
    buildArea: "",
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
      newItem.propertyCode &&
      newItem.lotType &&
      newItem.lotNumber &&
      newItem.landArea &&
      newItem.buildArea
    ) {
      setItems([...items, newItem]);
      setNewItem({
        propertyCode: "",
        lotType: "",
        lotNumber: "",
        landArea: "",
        buildArea: "",
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
              <th className="py-3 px-4 border">Property Code</th>
              <th className="py-3 px-4 border">Lot Type</th>
              <th className="py-3 px-4 border">Lot No.</th>
              <th className="py-3 px-4 border">Land Area</th>
              <th className="py-3 px-4 border">Build Area</th>
              <th className="py-3 px-4 border">Status</th>
              <th className="py-3 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={index}
                className="border-t text-center text-custom-blue2"
              >
                <td className="py-3 px-4">{item.propertyCode}</td>
                <td className="py-3 px-4">{item.lotType}</td>
                <td className="py-3 px-4">{item.lotNumber}</td>
                <td className="py-3 px-4">{item.landArea}</td>
                <td className="py-3 px-4">{item.buildArea}</td>
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
                    <label className="block text-gray-700">Property Code</label>
                    <input
                      type="text"
                      name="propertyCode"
                      value={newItem.propertyCode}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Lot Number</label>
                    <input
                      type="text"
                      name="lotNumber"
                      value={newItem.lotNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Build Area</label>
                    <input
                      type="text"
                      name="buildArea"
                      value={newItem.buildArea}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g. 10%"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Lot Type</label>
                    <input
                      type="text"
                      name="lotType"
                      value={newItem.lotType}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Land Area</label>
                    <input
                      type="text"
                      name="landArea"
                      value={newItem.landArea}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="e.g. 12"
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

export default Price;