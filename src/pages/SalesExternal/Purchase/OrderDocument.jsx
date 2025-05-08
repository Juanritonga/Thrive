import { useState } from "react";

export const testData = [
  {
    buyer: "John Doe",
    lotno: "LT001",
    reserveAmount: "150000000",
    reserveDate: "2025-04-01",
    reservedBy: "Agent A",
    reserveTransaction: "TX1001",
    status: "Active",
    customer: "John Doe",
    id: "ID001",
    salutation: "Mr.",
    address: "Jl. Merdeka No.10, Jakarta",
    phone: "081234567890",
    email: "john@example.com",
    birth: "1985-06-15",
    nationality: "Indonesia",
    religion: "Islam",
    gender: "Male",
    company: "ABC Corp",
    position: "Manager",
    mailing: "PO Box 123, Jakarta",
    npwp: "01.234.567.8-999.000",
    remark: "Interested in promo",
    payment: "Cash",
    interest: "High",
    tax: "10%",
  },
  {
    buyer: "Jane Smith",
    lotno: "LT002",
    reserveAmount: "175000000",
    reserveDate: "2025-04-05",
    reservedBy: "Agent B",
    reserveTransaction: "TX1002",
    status: "Pending",
    customer: "Jane Smith",
    id: "ID002",
    salutation: "Mrs.",
    address: "Jl. Sudirman No.20, Bandung",
    phone: "081298765432",
    email: "jane@example.com",
    birth: "1990-08-21",
    nationality: "Indonesia",
    religion: "Kristen",
    gender: "Female",
    company: "XYZ Ltd",
    position: "Director",
    mailing: "Jl. Asia Afrika, Bandung",
    npwp: "02.345.678.9-111.000",
    remark: "Request discount",
    payment: "KPR",
    interest: "Medium",
    tax: "10%",
  },
  {
    buyer: "Andi Pratama",
    lotno: "LT003",
    reserveAmount: "200000000",
    reserveDate: "2025-04-10",
    reservedBy: "Agent A",
    reserveTransaction: "TX1003",
    status: "Confirmed",
    customer: "Andi Pratama",
    id: "ID003",
    salutation: "Mr.",
    address: "Jl. Gajah Mada No.5, Surabaya",
    phone: "082112345678",
    email: "andi@example.com",
    birth: "1988-11-30",
    nationality: "Indonesia",
    religion: "Hindu",
    gender: "Male",
    company: "Maju Terus",
    position: "Supervisor",
    mailing: "Jl. Basuki Rahmat, Surabaya",
    npwp: "03.456.789.0-222.000",
    remark: "Family plan",
    payment: "Installment",
    interest: "High",
    tax: "5%",
  },
  {
    buyer: "Budi Santoso",
    lotno: "LT004",
    reserveAmount: "160000000",
    reserveDate: "2025-04-03",
    reservedBy: "Agent C",
    reserveTransaction: "TX1004",
    status: "Cancelled",
    customer: "Budi Santoso",
    id: "ID004",
    salutation: "Mr.",
    address: "Jl. Ahmad Yani No.12, Medan",
    phone: "081356789012",
    email: "budi@example.com",
    birth: "1982-05-05",
    nationality: "Indonesia",
    religion: "Buddha",
    gender: "Male",
    company: "PT Sukses",
    position: "Staff",
    mailing: "Jl. Brigjen Katamso, Medan",
    npwp: "04.567.890.1-333.000",
    remark: "Reconsidering",
    payment: "Cash",
    interest: "Low",
    tax: "0%",
  },
  {
    buyer: "Siti Aminah",
    lotno: "LT005",
    reserveAmount: "180000000",
    reserveDate: "2025-04-12",
    reservedBy: "Agent D",
    reserveTransaction: "TX1005",
    status: "Active",
    customer: "Siti Aminah",
    id: "ID005",
    salutation: "Mrs.",
    address: "Jl. Pemuda No.8, Semarang",
    phone: "085643210987",
    email: "siti@example.com",
    birth: "1992-03-18",
    nationality: "Indonesia",
    religion: "Islam",
    gender: "Female",
    company: "PT Makmur",
    position: "HR",
    mailing: "Jl. Majapahit, Semarang",
    npwp: "05.678.901.2-444.000",
    remark: "Need more info",
    payment: "Cash",
    interest: "Medium",
    tax: "10%",
  },
  {
    buyer: "Kevin Lee",
    lotno: "LT006",
    reserveAmount: "210000000",
    reserveDate: "2025-04-15",
    reservedBy: "Agent B",
    reserveTransaction: "TX1006",
    status: "Active",
    customer: "Kevin Lee",
    id: "ID006",
    salutation: "Mr.",
    address: "Jl. Hayam Wuruk No.10, Jakarta",
    phone: "087898765432",
    email: "kevin@example.com",
    birth: "1987-09-25",
    nationality: "Indonesia",
    religion: "Konghucu",
    gender: "Male",
    company: "Lee Group",
    position: "CEO",
    mailing: "Jakarta Pusat",
    npwp: "06.789.012.3-555.000",
    remark: "Urgent deal",
    payment: "Cash",
    interest: "High",
    tax: "15%",
  },
  {
    buyer: "Lina Marlina",
    lotno: "LT007",
    reserveAmount: "170000000",
    reserveDate: "2025-04-18",
    reservedBy: "Agent A",
    reserveTransaction: "TX1007",
    status: "Pending",
    customer: "Lina Marlina",
    id: "ID007",
    salutation: "Ms.",
    address: "Jl. Diponegoro No.3, Bogor",
    phone: "081245678901",
    email: "lina@example.com",
    birth: "1995-07-10",
    nationality: "Indonesia",
    religion: "Kristen",
    gender: "Female",
    company: "Creative Co",
    position: "Designer",
    mailing: "Jl. Suryakencana, Bogor",
    npwp: "07.890.123.4-666.000",
    remark: "Waiting spouse approval",
    payment: "Installment",
    interest: "Medium",
    tax: "5%",
  },
  {
    buyer: "Rudi Hartono",
    lotno: "LT008",
    reserveAmount: "220000000",
    reserveDate: "2025-04-20",
    reservedBy: "Agent C",
    reserveTransaction: "TX1008",
    status: "Confirmed",
    customer: "Rudi Hartono",
    id: "ID008",
    salutation: "Mr.",
    address: "Jl. Veteran No.11, Makassar",
    phone: "085612345678",
    email: "rudi@example.com",
    birth: "1980-01-11",
    nationality: "Indonesia",
    religion: "Islam",
    gender: "Male",
    company: "Hartono Group",
    position: "Owner",
    mailing: "Makassar Barat",
    npwp: "08.901.234.5-777.000",
    remark: "Deal closed",
    payment: "Cash",
    interest: "High",
    tax: "10%",
  },
  {
    buyer: "Dewi Kumalasari",
    lotno: "LT009",
    reserveAmount: "190000000",
    reserveDate: "2025-04-22",
    reservedBy: "Agent D",
    reserveTransaction: "TX1009",
    status: "Active",
    customer: "Dewi Kumalasari",
    id: "ID009",
    salutation: "Mrs.",
    address: "Jl. Raden Inten No.9, Bekasi",
    phone: "081376543210",
    email: "dewi@example.com",
    birth: "1993-12-05",
    nationality: "Indonesia",
    religion: "Islam",
    gender: "Female",
    company: "PT Sejahtera",
    position: "Marketing",
    mailing: "Bekasi Timur",
    npwp: "09.012.345.6-888.000",
    remark: "Promo request",
    payment: "KPR",
    interest: "Medium",
    tax: "10%",
  },
  {
    buyer: "Agus Salim",
    lotno: "LT010",
    reserveAmount: "155000000",
    reserveDate: "2025-04-25",
    reservedBy: "Agent B",
    reserveTransaction: "TX1010",
    status: "Cancelled",
    customer: "Agus Salim",
    id: "ID010",
    salutation: "Mr.",
    address: "Jl. Kalibata No.6, Jakarta",
    phone: "085698743210",
    email: "agus@example.com",
    birth: "1984-02-22",
    nationality: "Indonesia",
    religion: "Islam",
    gender: "Male",
    company: "Salim & Co",
    position: "Consultant",
    mailing: "Jl. Pasar Minggu, Jakarta",
    npwp: "10.123.456.7-999.000",
    remark: "Switching plan",
    payment: "Installment",
    interest: "Low",
    tax: "5%",
  },
];

const Hold = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(testData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [newItem, setNewItem] = useState({
    buyer: "",
    lotno: "",
    reserveAmount: "",
    reserveDate: "",
    reservedBy: "",
    reserveTransaction: "",
    status: "Active",
    customer: "",
    id: "",
    salutation: "",
    address: "",
    phone: "",
    email: "",
    birth: "",
    nationality: "",
    religion: "",
    gender: "",
    company: "",
    position: "",
    mailing: "",
    npwp: "",
    remark: "",
    payment: "",
    interest: "",
    tax: "",
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
              <th className="py-3 px-4 border">Buyer Name</th>
              <th className="py-3 px-4 border">Lot No.</th>
              <th className="py-3 px-4 border">Reserve Amount</th>
              <th className="py-3 px-4 border">Reserve Date</th>
              <th className="py-3 px-4 border">Reserved By</th>
              <th className="py-3 px-4 border">Lot No.</th>
              <th className="py-3 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={index}
                className="border-t text-center text-custom-blue2"
              >
                <td className="py-3 px-4">{item.buyer}</td>
                <td className="py-3 px-4">{item.lotno}</td>
                <td className="py-3 px-4">{item.reserveAmount}</td>
                <td className="py-3 px-4">{item.reserveDate}</td>
                <td className="py-3 px-4">{item.reservedBy}</td>
                <td className="py-3 px-4">{item.lotno}</td>
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

export default Hold;
