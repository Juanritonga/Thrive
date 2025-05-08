import { useState } from "react";

export const testData = [
  {
    id: "PR001",
    description: "Journal Memorial",
    sellableArea: "90.000 m2",
    buildingArea: "90.000 m2",
    grossArea: "90.000 m2",
    madeBy: "Jon Pantau",
    updateDate: "19-01-2024",
    status: "Active",
  },
  {
    id: "PR002",
    description: "Journal Memorial",
    sellableArea: "90.000 m2",
    buildingArea: "90.000 m2",
    grossArea: "90.000 m2",
    madeBy: "Jon Pantau",
    updateDate: "19-01-2024",
    status: "Active",
  },
  {
    id: "PR003",
    description: "Journal Memorial",
    sellableArea: "90.000 m2",
    buildingArea: "90.000 m2",
    grossArea: "90.000 m2",
    madeBy: "Jon Pantau",
    updateDate: "19-01-2024",
    status: "Active",
  },
  {
    id: "PR004",
    description: "Journal Memorial",
    sellableArea: "120.000 m2",
    buildingArea: "90.000 m2",
    grossArea: "90.000 m2",
    madeBy: "Jane Doe",
    updateDate: "20-01-2024",
    status: "Inactive",
  },
  {
    id: "PR005",
    description: "Journal Memorial",
    sellableArea: "150.000 m2",
    buildingArea: "90.000 m2",
    grossArea: "90.000 m2",
    madeBy: "John Smith",
    updateDate: "21-01-2024",
    status: "Active",
  },
  {
    id: "PR006",
    description: "Journal Memorial",
    sellableArea: "180.000 m2",
    buildingArea: "90.000 m2",
    grossArea: "90.000 m2",
    madeBy: "Alice Johnson",
    updateDate: "22-01-2024",
    status: "Active",
  },
  {
    id: "PR007",
    description: "Journal Memorial",
    sellableArea: "210.000 m2",
    buildingArea: "90.000 m2",
    grossArea: "90.000 m2",
    madeBy: "Bob Brown",
    updateDate: "23-01-2024",
    status: "Inactive",
  },
  {
    id: "PR008",
    description: "Journal Memorial",
    sellableArea: "240.000 m2",
    buildingArea: "90.000 m2",
    grossArea: "90.000 m2",
    madeBy: "Charlie Davis",
    updateDate: "24-01-2024",
    status: "Active",
  },
  {
    id: "PR009",
    description: "Journal Memorial",
    sellableArea: "270.000 m2",
    buildingArea: "90.000 m2",
    grossArea: "90.000 m2",
    madeBy: "Eve White",
    updateDate: "25-01-2024",
    status: "Active",
  },
  {
    id: "PR010",
    description: "Journal Memorial",
    sellableArea: "300.000 m2",
    buildingArea: "90.000 m2",
    grossArea: "90.000 m2",
    madeBy: "Frank Green",
    updateDate: "26-01-2024",
    status: "Inactive",
  },
];

const Phase = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(testData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [newItem, setNewItem] = useState({
    id: "",
    description: "",
    sellableArea: "",
    buildingArea: "",
    grossArea: "",
    madeBy: "",
    updateDate: new Date().toLocaleDateString("en-GB"),
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
      newItem.id &&
      newItem.description &&
      newItem.sellableArea &&
      newItem.buildingArea &&
      newItem.grossArea
    ) {
      setItems([...items, newItem]);
      setNewItem({
        id: "",
        description: "",
        sellableArea: "",
        buildingArea: "",
        grossArea: "",
        madeBy: "Default User",
        updateDate: new Date().toLocaleDateString("en-GB"),
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
              <th className="py-3 px-4 border">ID</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">Sellable Area</th>
              <th className="py-3 px-4 border">Building Area</th>
              <th className="py-3 px-4 border">Gross Area</th>
              <th className="py-3 px-4 border">Made By</th>
              <th className="py-3 px-4 border">Update Date</th>
              <th className="py-3 px-4 border">Status</th>
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
                <td className="py-3 px-4">{item.sellableArea}</td>
                <td className="py-3 px-4">{item.buildingArea}</td>
                <td className="py-3 px-4">{item.grossArea}</td>
                <td className="py-3 px-4">{item.madeBy}</td>
                <td className="py-3 px-4">{item.updateDate}</td>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Project ID</label>
                  <input
                    type="text"
                    name="id"
                    value={newItem.id}
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
                  <label className="block text-gray-700">Sellable Area</label>
                  <input
                    type="text"
                    name="sellableArea"
                    value={newItem.sellableArea}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Building Area</label>
                  <input
                    type="text"
                    name="buildingArea"
                    value={newItem.buildingArea}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Gross Area</label>
                  <input
                    type="text"
                    name="grossArea"
                    value={newItem.grossArea}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
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

export default Phase;
