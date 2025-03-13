import { useState } from "react";

export const testData = [
  {
    entity: "CLA001",
    projectID: "PR001",
    costCode: "COS001",
    description: "Pembuatan Jalan",
    previousBudget: "Rp 10.000.000",
    chargeTo: "Sellable Area",
    method: "Manual",
    period: "2025",
  },
  {
    entity: "CLA002",
    projectID: "PR002",
    costCode: "COS002",
    description: "Renovasi Jembatan",
    previousBudget: "Rp 15.000.000",
    chargeTo: "Public Area",
    method: "Automated",
    period: "2026",
  },
  {
    entity: "CLA003",
    projectID: "PR003",
    costCode: "COS003",
    description: "Pembuatan Taman",
    previousBudget: "Rp 8.000.000",
    chargeTo: "Green Area",
    method: "Manual",
    period: "2024",
  },
  {
    entity: "CLA004",
    projectID: "PR004",
    costCode: "COS004",
    description: "Pembangunan Gedung",
    previousBudget: "Rp 20.000.000",
    chargeTo: "Infrastructure",
    method: "Automated",
    period: "2027",
  },
  {
    entity: "CLA005",
    projectID: "PR005",
    costCode: "COS005",
    description: "Perbaikan Saluran Air",
    previousBudget: "Rp 5.000.000",
    chargeTo: "Utility",
    method: "Manual",
    period: "2025",
  },
  {
    entity: "CLA006",
    projectID: "PR006",
    costCode: "COS006",
    description: "Pengaspalan Jalan",
    previousBudget: "Rp 12.000.000",
    chargeTo: "Public Road",
    method: "Manual",
    period: "2026",
  },
  {
    entity: "CLA007",
    projectID: "PR007",
    costCode: "COS007",
    description: "Pembangunan Pos Keamanan",
    previousBudget: "Rp 7.500.000",
    chargeTo: "Security",
    method: "Automated",
    period: "2024",
  },
  {
    entity: "CLA008",
    projectID: "PR008",
    costCode: "COS008",
    description: "Pemasangan Lampu Jalan",
    previousBudget: "Rp 6.000.000",
    chargeTo: "Public Area",
    method: "Manual",
    period: "2025",
  },
  {
    entity: "CLA009",
    projectID: "PR009",
    costCode: "COS009",
    description: "Pembuatan Trotoar",
    previousBudget: "Rp 9.500.000",
    chargeTo: "Walkway",
    method: "Automated",
    period: "2027",
  },
  {
    entity: "CLA010",
    projectID: "PR010",
    costCode: "COS010",
    description: "Pembangunan Area Parkir",
    previousBudget: "Rp 14.000.000",
    chargeTo: "Parking Lot",
    method: "Manual",
    period: "2026",
  },
  {
    entity: "CLA011",
    projectID: "PR011",
    costCode: "COS011",
    description: "Perbaikan Atap Gedung",
    previousBudget: "Rp 11.000.000",
    chargeTo: "Building Maintenance",
    method: "Automated",
    period: "2025",
  },
  {
    entity: "CLA012",
    projectID: "PR012",
    costCode: "COS012",
    description: "Pengecatan Jalan",
    previousBudget: "Rp 4.000.000",
    chargeTo: "Road Maintenance",
    method: "Manual",
    period: "2024",
  },
  {
    entity: "CLA013",
    projectID: "PR013",
    costCode: "COS013",
    description: "Pemasangan Pagar",
    previousBudget: "Rp 13.000.000",
    chargeTo: "Security",
    method: "Automated",
    period: "2027",
  },
  {
    entity: "CLA014",
    projectID: "PR014",
    costCode: "COS014",
    description: "Renovasi Gedung Serbaguna",
    previousBudget: "Rp 18.000.000",
    chargeTo: "Public Area",
    method: "Manual",
    period: "2026",
  },
  {
    entity: "CLA015",
    projectID: "PR015",
    costCode: "COS015",
    description: "Perbaikan Lift",
    previousBudget: "Rp 16.000.000",
    chargeTo: "Infrastructure",
    method: "Automated",
    period: "2025",
  },
];


const Entry = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(testData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [newItem, setNewItem] = useState({
    classID: "",
    description: "",
    costType: "",
    costAllocation: "",
    chargeType: "",
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
      newItem.classID &&
      newItem.description &&
      newItem.costType &&
      newItem.costAllocation &&
      newItem.chargeType
    ) {
      setItems([...items, newItem]);
      setNewItem({
        classID: "",
        description: "",
        costType: "",
        costAllocation: "",
        chargeType: "",
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
              <th className="py-3 px-4 border">Entity </th>
              <th className="py-3 px-4 border">Project ID</th>
              <th className="py-3 px-4 border">Cost Code</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">Previous Budget</th>
              <th className="py-3 px-4 border">Charged To</th>
              <th className="py-3 px-4 border">Method</th>
              <th className="py-3 px-4 border">Period</th>
              <th className="py-3 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={index}
                className="border-t text-center text-custom-blue2"
              >
                <td className="py-3 px-4">{item.entity}</td>
                <td className="py-3 px-4">{item.projectID}</td>
                <td className="py-3 px-4">{item.costCode}</td>
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4">{item.previousBudget}</td>
                <td className="py-3 px-4">{item.chargeTo}</td>
                <td className="py-3 px-4">{item.method}</td>
                <td className="py-3 px-4">{item.period}</td>
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
    <div className="bg-white rounded-lg w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
        <h2 className="text-lg">Tambah Baru</h2>
        <button className="text-white" onClick={handleCloseModal}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="p-6 overflow-y-auto flex-grow">
        <div className="grid grid-cols-2 gap-4">
          {/* Project */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-bold">Project</label>
          </div>
          <div>
            <label className="block text-gray-700">Entity</label>
            <select
              name="entity"
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Pilih Entity</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Project ID</label>
            <select
              name="projectID"
              value={newItem.projectID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Pilih Project</option>
              {testData.map((item) => (
                <option key={item.projectID} value={item.projectID}>
                  {item.projectID}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Phase ID</label>
            <select
              name="phaseID"
              value={newItem.phaseID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Pilih Phase ID</option>
              {testData.map((item) => (
                <option key={item.costCode} value={item.costCode}>
                  {item.costCode}
                </option>
              ))}
            </select>
          </div>

          {/* Phase */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-bold">Phase</label>
          </div>
          <div>
            <label className="block text-gray-700">Phase ID</label>
            <select
              name="phaseID"
              value={newItem.phaseID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Pilih Phase ID</option>
              {testData.map((item) => (
                <option key={item.costCode} value={item.costCode}>
                  {item.costCode}
                </option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-bold">Budget</label>
          </div>
          <div>
            <label className="block text-gray-700">Cost ID</label>
            <select
              name="costID"
              value={newItem.costID}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Pilih Cost ID</option>
              {testData.map((item) => (
                <option key={item.costCode} value={item.costCode}>
                  {item.costCode}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Budget</label>
            <select
              name="budget"
              value={newItem.budget}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Pilih Budget</option>
              {testData.map((item) => (
                <option key={item.costCode} value={item.costCode}>
                  {item.costCode}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Previous Budget</label>
            <input
              type="text"
              name="previousBudget"
              value={newItem.previousBudget}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Charged To */}
          <div>
            <label className="block text-gray-700">Charged To</label>
            <select
              name="chargeTo"
              value={newItem.chargeTo}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Pilih Charged To</option>
              {testData.map((item) => (
                <option key={item.chargeTo} value={item.chargeTo}>
                  {item.chargeTo}
                </option>
              ))}
            </select>
          </div>

          {/* Period */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-bold">Period</label>
          </div>
          <div>
            <label className="block text-gray-700">Method</label>
            <input
              type="text"
              name="method"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Period</label>
            <input
              type="text"
              name="period"
              value={newItem.period}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Budget</label>
            <input
              type="text"
              name="budget"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Increment / Decrement</label>
            <input
              type="text"
              name="incrementDecrement"
              value={newItem.incrementDecrement}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-between gap-4 p-6 bg-gray-100">
        <button className="w-1/2 py-2 bg-red-400 text-white rounded hover:bg-red-500" onClick={handleCloseModal}>
          Batal
        </button>
        <button className="w-1/2 py-2 bg-blue-400 text-white rounded hover:bg-blue-500" onClick={handleAddItem}>
          Simpan
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Entry;