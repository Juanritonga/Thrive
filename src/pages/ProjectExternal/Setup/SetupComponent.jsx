import { useState } from "react";

export const testData = [
  {
    componentID: "COM001",
    description: "Journal Memorial",
    invoiceAccount: "11.1010001.999",
    stockAccount: "11.1010001.999",
    accumulatedAccount: "11.1010001.999",
    hppAccount: "11.1010001.999",
    madeBy: "Jon Pantau",
    updateDate: "19-01-2024",
  },
  {
    componentID: "COM002",
    description: "Journal Adjustment",
    invoiceAccount: "11.1010002.998",
    stockAccount: "11.1010002.998",
    accumulatedAccount: "11.1010002.998",
    hppAccount: "11.1010002.998",
    madeBy: "Jane Doe",
    updateDate: "20-01-2024",
  },
  {
    componentID: "COM003",
    description: "Journal Posting",
    invoiceAccount: "11.1010003.997",
    stockAccount: "11.1010003.997",
    accumulatedAccount: "11.1010003.997",
    hppAccount: "11.1010003.997",
    madeBy: "Jon Pantau",
    updateDate: "21-01-2024",
  },
  {
    componentID: "COM004",
    description: "Journal Correction",
    invoiceAccount: "11.1010004.996",
    stockAccount: "11.1010004.996",
    accumulatedAccount: "11.1010004.996",
    hppAccount: "11.1010004.996",
    madeBy: "Alice Smith",
    updateDate: "22-01-2024",
  },
  {
    componentID: "COM005",
    description: "Journal Reversal",
    invoiceAccount: "11.1010005.995",
    stockAccount: "11.1010005.995",
    accumulatedAccount: "11.1010005.995",
    hppAccount: "11.1010005.995",
    madeBy: "Jane Doe",
    updateDate: "23-01-2024",
  },
  {
    componentID: "COM006",
    description: "Journal Memorial",
    invoiceAccount: "11.1010006.994",
    stockAccount: "11.1010006.994",
    accumulatedAccount: "11.1010006.994",
    hppAccount: "11.1010006.994",
    madeBy: "Jon Pantau",
    updateDate: "24-01-2024",
  },
  {
    componentID: "COM007",
    description: "Journal Adjustment",
    invoiceAccount: "11.1010007.993",
    stockAccount: "11.1010007.993",
    accumulatedAccount: "11.1010007.993",
    hppAccount: "11.1010007.993",
    madeBy: "Alice Smith",
    updateDate: "25-01-2024",
  },
  {
    componentID: "COM008",
    description: "Journal Posting",
    invoiceAccount: "11.1010008.992",
    stockAccount: "11.1010008.992",
    accumulatedAccount: "11.1010008.992",
    hppAccount: "11.1010008.992",
    madeBy: "Jane Doe",
    updateDate: "26-01-2024",
  },
  {
    componentID: "COM009",
    description: "Journal Correction",
    invoiceAccount: "11.1010009.991",
    stockAccount: "11.1010009.991",
    accumulatedAccount: "11.1010009.991",
    hppAccount: "11.1010009.991",
    madeBy: "Jon Pantau",
    updateDate: "27-01-2024",
  },
  {
    componentID: "COM010",
    description: "Journal Reversal",
    invoiceAccount: "11.1010010.990",
    stockAccount: "11.1010010.990",
    accumulatedAccount: "11.1010010.990",
    hppAccount: "11.1010010.990",
    madeBy: "Alice Smith",
    updateDate: "28-01-2024",
  },
  {
    componentID: "COM011",
    description: "Journal Memorial",
    invoiceAccount: "11.1010011.989",
    stockAccount: "11.1010011.989",
    accumulatedAccount: "11.1010011.989",
    hppAccount: "11.1010011.989",
    madeBy: "Jane Doe",
    updateDate: "29-01-2024",
  },
  {
    componentID: "COM012",
    description: "Journal Adjustment",
    invoiceAccount: "11.1010012.988",
    stockAccount: "11.1010012.988",
    accumulatedAccount: "11.1010012.988",
    hppAccount: "11.1010012.988",
    madeBy: "Jon Pantau",
    updateDate: "30-01-2024",
  },
  {
    componentID: "COM013",
    description: "Journal Posting",
    invoiceAccount: "11.1010013.987",
    stockAccount: "11.1010013.987",
    accumulatedAccount: "11.1010013.987",
    hppAccount: "11.1010013.987",
    madeBy: "Alice Smith",
    updateDate: "31-01-2024",
  },
  {
    componentID: "COM014",
    description: "Journal Correction",
    invoiceAccount: "11.1010014.986",
    stockAccount: "11.1010014.986",
    accumulatedAccount: "11.1010014.986",
    hppAccount: "11.1010014.986",
    madeBy: "Jane Doe",
    updateDate: "01-02-2024",
  },
  {
    componentID: "COM015",
    description: "Journal Reversal",
    invoiceAccount: "11.1010015.985",
    stockAccount: "11.1010015.985",
    accumulatedAccount: "11.1010015.985",
    hppAccount: "11.1010015.985",
    madeBy: "Jon Pantau",
    updateDate: "02-02-2024",
  },
];

const SetupComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(testData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [newItem, setNewItem] = useState({
    componentID: "",
    description: "",
    invoiceAccount: "",
    stockAccount: "",
    accumulatedAccount: "",
    hppAccount: "",
    madeBy: "Default User",
    updateDate: new Date().toLocaleDateString("en-GB"),
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
      newItem.componentID &&
      newItem.description &&
      newItem.invoiceAccount &&
      newItem.stockAccount &&
      newItem.accumulatedAccount &&
      newItem.hppAccount
    ) {
      setItems([...items, newItem]);
      setNewItem({
        componentID: "",
        description: "",
        invoiceAccount: "",
        stockAccount: "",
        accumulatedAccount: "",
        hppAccount: "",
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
              <th className="py-3 px-4 border">Component ID</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">Inv. Account</th>
              <th className="py-3 px-4 border">Stock Account</th>
              <th className="py-3 px-4 border">Accum. Account</th>
              <th className="py-3 px-4 border">HPP Account</th>
              <th className="py-3 px-4 border">Made By</th>
              <th className="py-3 px-4 border">Update Date</th>
              <th className="py-3 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={index}
                className="border-t text-center text-custom-blue2"
              >
                <td className="py-3 px-4">{item.componentID}</td>
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4">{item.invoiceAccount}</td>
                <td className="py-3 px-4">{item.stockAccount}</td>
                <td className="py-3 px-4">{item.accumulatedAccount}</td>
                <td className="py-3 px-4">{item.hppAccount}</td>
                <td className="py-3 px-4">{item.madeBy}</td>
                <td className="py-3 px-4">{item.updateDate}</td>
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

      {/* Pagination */}
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

      {/* Modal Tambah Baru */}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Component ID</label>
                  <input
                    type="text"
                    name="componentID"
                    value={newItem.componentID}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
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
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Invoice Account</label>
                  <input
                    type="text"
                    name="invoiceAccount"
                    value={newItem.invoiceAccount}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Stock Account</label>
                  <input
                    type="text"
                    name="stockAccount"
                    value={newItem.stockAccount}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Accumulated Account</label>
                  <input
                    type="text"
                    name="accumulatedAccount"
                    value={newItem.accumulatedAccount}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">HPP Account</label>
                  <input
                    type="text"
                    name="hppAccount"
                    value={newItem.hppAccount}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
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

export default SetupComponent;