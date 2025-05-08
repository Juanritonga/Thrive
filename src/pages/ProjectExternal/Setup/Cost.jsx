import { useState, useEffect } from "react";

export const testData = [
  {
    costID: "COS001",
    description: "Maquette",
    gl_ac: "52180123123",
    classID: "CLA001",
    componentID: "COM001",
    costType: "Cost",
    type: "Detail",
    g: "1",
    sg: "0",
    l: "1",
    sl: "0",
    sub: "0",
    protect: "Yes",
  },
  {
    costID: "COS002",
    description: "Maquette",
    gl_ac: "52180123123",
    classID: "CLA001",
    componentID: "COM001",
    costType: "Cost",
    type: "Detail",
    g: "1",
    sg: "0",
    l: "1",
    sl: "0",
    sub: "0",
    protect: "Inactive",
  },
  {
    costID: "COS003",
    description: "Design",
    gl_ac: "52180123124",
    classID: "CLA002",
    componentID: "COM002",
    costType: "Cost",
    type: "Detail",
    g: "2",
    sg: "1",
    l: "2",
    sl: "1",
    sub: "1",
    protect: "Yes",
  },
  {
    costID: "COS004",
    description: "Prototype",
    gl_ac: "52180123125",
    classID: "CLA003",
    componentID: "COM003",
    costType: "Cost",
    type: "Detail",
    g: "3",
    sg: "2",
    l: "3",
    sl: "2",
    sub: "2",
    protect: "Inactive",
  },
  {
    costID: "COS005",
    description: "Testing",
    gl_ac: "52180123126",
    classID: "CLA004",
    componentID: "COM004",
    costType: "Cost",
    type: "Detail",
    g: "4",
    sg: "3",
    l: "4",
    sl: "3",
    sub: "3",
    protect: "Yes",
  },
  {
    costID: "COS006",
    description: "Development",
    gl_ac: "52180123127",
    classID: "CLA005",
    componentID: "COM005",
    costType: "Cost",
    type: "Detail",
    g: "5",
    sg: "4",
    l: "5",
    sl: "4",
    sub: "4",
    protect: "Inactive",
  },
  {
    costID: "COS007",
    description: "Deployment",
    gl_ac: "52180123128",
    classID: "CLA006",
    componentID: "COM006",
    costType: "Cost",
    type: "Detail",
    g: "6",
    sg: "5",
    l: "6",
    sl: "5",
    sub: "5",
    protect: "Yes",
  },
  {
    costID: "COS008",
    description: "Maintenance",
    gl_ac: "52180123129",
    classID: "CLA007",
    componentID: "COM007",
    costType: "Cost",
    type: "Detail",
    g: "7",
    sg: "6",
    l: "7",
    sl: "6",
    sub: "6",
    protect: "Inactive",
  },
  {
    costID: "COS009",
    description: "Support",
    gl_ac: "52180123130",
    classID: "CLA008",
    componentID: "COM008",
    costType: "Cost",
    type: "Detail",
    g: "8",
    sg: "7",
    l: "8",
    sl: "7",
    sub: "7",
    protect: "Yes",
  },
  {
    costID: "COS010",
    description: "Documentation",
    gl_ac: "52180123131",
    classID: "CLA009",
    componentID: "COM009",
    costType: "Cost",
    type: "Detail",
    g: "9",
    sg: "8",
    l: "9",
    sl: "8",
    sub: "8",
    protect: "Inactive",
  },
  {
    costID: "COS011",
    description: "Training",
    gl_ac: "52180123132",
    classID: "CLA010",
    componentID: "COM010",
    costType: "Cost",
    type: "Detail",
    g: "10",
    sg: "9",
    l: "10",
    sl: "9",
    sub: "9",
    protect: "Yes",
  },
  {
    costID: "COS012",
    description: "Consulting",
    gl_ac: "52180123133",
    classID: "CLA011",
    componentID: "COM011",
    costType: "Cost",
    type: "Detail",
    g: "11",
    sg: "10",
    l: "11",
    sl: "10",
    sub: "10",
    protect: "Inactive",
  },
  {
    costID: "COS013",
    description: "Analysis",
    gl_ac: "52180123134",
    classID: "CLA012",
    componentID: "COM012",
    costType: "Cost",
    type: "Detail",
    g: "12",
    sg: "11",
    l: "12",
    sl: "11",
    sub: "11",
    protect: "Yes",
  },
  {
    costID: "COS014",
    description: "Research",
    gl_ac: "52180123135",
    classID: "CLA013",
    componentID: "COM013",
    costType: "Cost",
    type: "Detail",
    g: "13",
    sg: "12",
    l: "13",
    sl: "12",
    sub: "12",
    protect: "Inactive",
  },
  {
    costID: "COS015",
    description: "Implementation",
    gl_ac: "52180123136",
    classID: "CLA014",
    componentID: "COM014",
    costType: "Cost",
    type: "Detail",
    g: "14",
    sg: "13",
    l: "14",
    sl: "13",
    sub: "13",
    protect: "Yes",
  },
];

const Cost = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(testData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [componentIDs, setComponentIDs] = useState([]);
  const [classIDs, setClassIDs] = useState([]);

  useEffect(() => {
    const uniqueComponentIDs = [...new Set(testData.map((item) => item.componentID))];
    const uniqueClassIDs = [...new Set(testData.map((item) => item.classID))];
    setComponentIDs(uniqueComponentIDs);
    setClassIDs(uniqueClassIDs);
  }, []);

  const [newItem, setNewItem] = useState({
    id: "",
    description: "",
    gl_ac: "",
    classID: "",
    componentID: "",
    costType: "",
    type: "",
    g: "",
    sg: "",
    l: "",
    sl: "",
    sub: "",
    protect: "Yes",
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
      newItem.gl_ac &&
      newItem.classID &&
      newItem.componentID
    ) {
      setItems([...items, newItem]);
      setNewItem({
        id: "",
        description: "",
        gl_ac: "",
        classID: "",
        componentID: "",
        costType: "",
        type: "",
        g: "",
        sg: "",
        l: "",
        sl: "",
        sub: "",
        protect: "Yes",
      });
      handleCloseModal();
    } else {
      alert("Isi semua field terlebih dahulu.");
    }
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container bg-white p-8 mx-auto my-4 rounded-lg w-15/16">
      {/* Bagian Search dan Tombol Tambah Baru */}
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

      {/* Tabel */}
      <div className="overflow-auto shadow-sm mb-6">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="text-custom-blue bg-gray-200">
              <th className="py-3 px-4 border">Class ID</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">GL A/C</th>
              <th className="py-3 px-4 border">Class ID</th>
              <th className="py-3 px-4 border">Component ID</th>
              <th className="py-3 px-4 border">Cost Type</th>
              <th className="py-3 px-4 border">Type</th>
              <th className="py-3 px-4 border">G</th>
              <th className="py-3 px-4 border">SG</th>
              <th className="py-3 px-4 border">L</th>
              <th className="py-3 px-4 border">SL</th>
              <th className="py-3 px-4 border">Sub</th>
              <th className="py-3 px-4 border">Protect</th>
              <th className="py-3 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr
                key={item.costID}
                className="border-t text-center text-custom-blue2"
              >
                <td className="py-3 px-4">{item.costID}</td>
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4">{item.gl_ac}</td>
                <td className="py-3 px-4">{item.classID}</td>
                <td className="py-3 px-4">{item.componentID}</td>
                <td className="py-3 px-4">{item.costType}</td>
                <td className="py-3 px-4">{item.type}</td>
                <td className="py-3 px-4">{item.g}</td>
                <td className="py-3 px-4">{item.sg}</td>
                <td className="py-3 px-4">{item.l}</td>
                <td className="py-3 px-4">{item.sl}</td>
                <td className="py-3 px-4">{item.sub}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-6 py-1 rounded-full font-bold w-max ${
                      item.protect === "Yes"
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-600"
                    }`}
                  >
                    {item.protect}
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
                  <label className="block text-gray-700">Cost ID</label>
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
                  <label className="block text-gray-700">GL A/C</label>
                  <input
                    type="text"
                    name="gl_ac"
                    value={newItem.gl_ac}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Class ID</label>
                  <select
                    name="classID"
                    value={newItem.classID}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Pilih Class ID</option>
                    {classIDs.map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Component ID</label>
                  <select
                    name="componentID"
                    value={newItem.componentID}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Pilih Component ID</option>
                    {componentIDs.map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Cost Type</label>
                  <input
                    type="text"
                    name="costType"
                    value={newItem.costType}
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
                  <label className="block text-gray-700">G</label>
                  <input
                    type="text"
                    name="g"
                    value={newItem.g}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">SG</label>
                  <input
                    type="text"
                    name="sg"
                    value={newItem.sg}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">L</label>
                  <input
                    type="text"
                    name="l"
                    value={newItem.sl}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">SL</label>
                  <input
                    type="text"
                    name="sl"
                    value={newItem.sl}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Sub</label>
                  <input
                    type="text"
                    name="sub"
                    value={newItem.sub}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Protect</label>
                  <select
                    name="protect"
                    value={newItem.protect}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="Yes">Yes</option>
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

export default Cost;