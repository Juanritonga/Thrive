import { useState } from "react";

export const testData = [
  {
    property: "Residential",
    type: "Cluster",
    block: "A",
    zone: "North",
    direction: "North-East",
    lot: "PR001",
    status: "Active",
    hold: "Unhold",
  },
  {
    property: "Residential",
    type: "Cluster",
    block: "A",
    zone: "North",
    direction: "North-East",
    lot: "PR002",
    status: "Active",
    hold: "Unhold",
  },
  {
    property: "Residential",
    type: "Cluster",
    block: "A",
    zone: "North",
    direction: "North-East",
    lot: "PR003",
    status: "Active",
    hold: "Unhold",
  },
  {
    property: "Residential",
    type: "Cluster",
    block: "A",
    zone: "North",
    direction: "North-East",
    lot: "PR004",
    status: "Active",
    hold: "Unhold",
  },
  {
    property: "Residential",
    type: "Cluster",
    block: "A",
    zone: "North",
    direction: "North-East",
    lot: "PR005",
    status: "Active",
    hold: "Unhold",
  },
  {
    property: "Residential",
    type: "Cluster",
    block: "A",
    zone: "North",
    direction: "North-East",
    lot: "PR006",
    status: "Active",
    hold: "Unhold",
  },
  {
    property: "Residential",
    type: "Cluster",
    block: "A",
    zone: "North",
    direction: "North-East",
    lot: "PR007",
    status: "Active",
    hold: "Unhold",
  },
  {
    property: "Residential",
    type: "Cluster",
    block: "A",
    zone: "North",
    direction: "North-East",
    lot: "PR008",
    status: "Active",
    hold: "Unhold",
  },
  {
    property: "Residential",
    type: "Cluster",
    block: "A",
    zone: "North",
    direction: "North-East",
    lot: "PR009",
    status: "Active",
    hold: "Unhold",
  },
  {
    property: "Residential",
    type: "Cluster",
    block: "A",
    zone: "North",
    direction: "North-East",
    lot: "PR0010",
    status: "Active",
    hold: "Unhold",
  },
];

const Booking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(testData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [newItem, setNewItem] = useState({
    property: "",
    type: "",
    block: "",
    zone: "",
    direction: "",
    lot: "",
    status: "Active",
    hold: "",
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
      newItem.property &&
      newItem.type &&
      newItem.block &&
      newItem.zone &&
      newItem.direction &&
      newItem.lot &&
      newItem.hold
    ) {
      setItems([...items, newItem]);
      setNewItem({
        property: "",
        type: "",
        block: "",
        zone: "",
        direction: "",
        lot: "",
        status: "Active",
        hold: "",
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

      <div className="overflow-auto shadow-sm mb-6">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="text-custom-blue bg-gray-200">
              <th className="py-3 px-4 border">Property Type</th>
              <th className="py-3 px-4 border">Type</th>
              <th className="py-3 px-4 border">Block</th>
              <th className="py-3 px-4 border">Zone</th>
              <th className="py-3 px-4 border">Direction</th>
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
                <td className="py-3 px-4">{item.property}</td>
                <td className="py-3 px-4">{item.type}</td>
                <td className="py-3 px-4">{item.block}</td>
                <td className="py-3 px-4">{item.zone}</td>
                <td className="py-3 px-4">{item.direction}</td>
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
                <div className="flex justify-center gap-3">
                    <button className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg flex items-center justify-center w-12 h-12">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg flex items-center justify-center w-12 h-12">
                      <i className="fas fa-calendar"></i>
                    </button>
                    <button className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg flex items-center justify-center w-12 h-12">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
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
        </div>

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
                    <label className="block text-gray-700">Property</label>
                    <input
                      type="text"
                      name="property"
                      value={newItem.property}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
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
  <label className="block text-gray-700">Block</label>
  <input
    type="text"
    name="block"
    value={newItem.block}
    onChange={handleInputChange}
    className="w-full p-2 border border-gray-300 rounded"
  />
</div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700">Zone</label>
                    <input
                      type="text"
                      name="zone"
                      value={newItem.zone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Direction</label>
                    <input
                      type="text"
                      name="direction"
                      value={newItem.direction}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Lot</label>
                    <input
                      type="text"
                      name="lot"
                      value={newItem.lot}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="block mb-1 font-bold">Status</label>
                <select
                  name="status"
                  className="border rounded-md p-2 w-full"
                  value={newItem.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Hold/Unhold</label>
                <select
                  name="hold"
                  className="border rounded-md p-2 w-full"
                  value={newItem.hold}
                  onChange={handleInputChange}
                >
                  <option value="Active">Hold</option>
                  <option value="Inactive">Unhold</option>
                </select>
              </div>
              <div className="flex justify-between gap-4 mt-6">
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

export default Booking;
