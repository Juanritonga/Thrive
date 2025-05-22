import { useState } from "react";

export const testData = [
  {
    paymentMethod: "Transfer Bank",
    transaction: "TRX001",
    lotno: "LT-1001",
    frequency: "Monthly",
    start: "2025-05-01",
    paymentType: "Installment",
    description: "Cicilan rumah",
    currency: "IDR",
    tax: "PPN 11%",
    paymentInterval: "1 bulan",
    amount: "10000000",
    taxAmount: "1100000",
    totalAmount: "11100000",
  },
  {
    paymentMethod: "Kartu Kredit",
    transaction: "TRX002",
    lotno: "LT-1002",
    frequency: "Quarterly",
    start: "2025-06-01",
    paymentType: "Down Payment",
    description: "Pembayaran awal",
    currency: "IDR",
    tax: "PPN 11%",
    paymentInterval: "3 bulan",
    amount: "30000000",
    taxAmount: "3300000",
    totalAmount: "33300000",
  },
  {
    paymentMethod: "Cash",
    transaction: "TRX003",
    lotno: "LT-1003",
    frequency: "One-Time",
    start: "2025-04-15",
    paymentType: "Full Payment",
    description: "Lunas langsung",
    currency: "USD",
    tax: "VAT 10%",
    paymentInterval: "-",
    amount: "7000",
    taxAmount: "700",
    totalAmount: "7700",
  },
  {
    paymentMethod: "Transfer Bank",
    transaction: "TRX004",
    lotno: "LT-1004",
    frequency: "Monthly",
    start: "2025-05-10",
    paymentType: "Installment",
    description: "Pembayaran tahap 1",
    currency: "IDR",
    tax: "PPN 11%",
    paymentInterval: "1 bulan",
    amount: "8000000",
    taxAmount: "880000",
    totalAmount: "8880000",
  },
  {
    paymentMethod: "Kartu Kredit",
    transaction: "TRX005",
    lotno: "LT-1005",
    frequency: "Monthly",
    start: "2025-06-05",
    paymentType: "Installment",
    description: "Tahap 2",
    currency: "IDR",
    tax: "PPN 11%",
    paymentInterval: "1 bulan",
    amount: "9000000",
    taxAmount: "990000",
    totalAmount: "9990000",
  },
  {
    paymentMethod: "Cash",
    transaction: "TRX006",
    lotno: "LT-1006",
    frequency: "Biannual",
    start: "2025-07-01",
    paymentType: "Installment",
    description: "Bayar tengah tahun",
    currency: "SGD",
    tax: "GST 7%",
    paymentInterval: "6 bulan",
    amount: "12000",
    taxAmount: "840",
    totalAmount: "12840",
  },
  {
    paymentMethod: "Transfer Bank",
    transaction: "TRX007",
    lotno: "LT-1007",
    frequency: "Monthly",
    start: "2025-05-20",
    paymentType: "Installment",
    description: "Angsuran rumah",
    currency: "IDR",
    tax: "PPN 11%",
    paymentInterval: "1 bulan",
    amount: "8500000",
    taxAmount: "935000",
    totalAmount: "9435000",
  },
  {
    paymentMethod: "Kartu Kredit",
    transaction: "TRX008",
    lotno: "LT-1008",
    frequency: "One-Time",
    start: "2025-04-28",
    paymentType: "Full Payment",
    description: "Lunas lunas",
    currency: "USD",
    tax: "VAT 10%",
    paymentInterval: "-",
    amount: "10000",
    taxAmount: "1000",
    totalAmount: "11000",
  },
  {
    paymentMethod: "Transfer Bank",
    transaction: "TRX009",
    lotno: "LT-1009",
    frequency: "Monthly",
    start: "2025-05-15",
    paymentType: "Installment",
    description: "Cicilan properti",
    currency: "IDR",
    tax: "PPN 11%",
    paymentInterval: "1 bulan",
    amount: "9500000",
    taxAmount: "1045000",
    totalAmount: "10545000",
  },
  {
    paymentMethod: "Cash",
    transaction: "TRX010",
    lotno: "LT-1010",
    frequency: "Quarterly",
    start: "2025-06-10",
    paymentType: "Installment",
    description: "Pembayaran triwulan",
    currency: "IDR",
    tax: "PPN 11%",
    paymentInterval: "3 bulan",
    amount: "27000000",
    taxAmount: "2970000",
    totalAmount: "29970000",
  },
];

const Hold = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(testData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [newItem, setNewItem] = useState({
    paymentMethod: "",
    transaction: "",
    lotno: "",
    frequency: "",
    start: "0",
    paymentType: "",
    description: "",
    currency: "",
    tax: "",
    paymentInterval: "",
    amount: "",
    taxAmount: "",
    totalAmount: "",
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
      newItem.paymentMethod &&
      newItem.transaction &&
      newItem.lotno &&
      newItem.frequency &&
      newItem.start !== "" && // karena "0" dianggap falsy, pakai cek eksplisit
      newItem.paymentType &&
      newItem.description &&
      newItem.currency &&
      newItem.tax &&
      newItem.paymentInterval &&
      newItem.amount &&
      newItem.taxAmount &&
      newItem.totalAmount
    ) {
      setItems([...items, newItem]);
      setNewItem({
        paymentMethod: "",
        transaction: "",
        lotno: "",
        frequency: "",
        start: "0",
        paymentType: "",
        description: "",
        currency: "",
        tax: "",
        paymentInterval: "",
        amount: "",
        taxAmount: "",
        totalAmount: "",
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
              <th className="py-3 px-4 border">Payment Method</th>
              <th className="py-3 px-4 border">Transaction Type</th>
              <th className="py-3 px-4 border">Lot No.</th>
              <th className="py-3 px-4 border">Frequency</th>
              <th className="py-3 px-4 border">Start Date</th>
              <th className="py-3 px-4 border">Mode Type</th>
              <th className="py-3 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={index}
                className="border-t text-center text-custom-blue2"
              >
                <td className="py-3 px-4">{item.paymentMethod}</td>
                <td className="py-3 px-4">{item.transaction}</td>
                <td className="py-3 px-4">{item.lotno}</td>
                <td className="py-3 px-4">{item.frequency}</td>
                <td className="py-3 px-4">{item.start}</td>
                <td className="py-3 px-4">{item.lotno}</td>
                <td className="py-3 px-4 flex justify-center">
                  <div className="flex gap-2">
                    <button className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg flex items-center justify-center w-12 h-12">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg flex items-center justify-center w-12 h-12">
                      <i className="fas fa-calendar"></i>
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
            <div className="flex justify-between items-center bg-custom-blue text-white p-4 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg">Schedule Billing</h2>
              </div>
              <button className="text-white" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-300">
                  BILLING
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-custom-blue2 font-bold">
                        Payment Method
                      </label>
                      <select
                        name="status"
                        className="border rounded-md p-2 w-full"
                        value={newItem.status}
                        onChange={handleInputChange}
                      >
                        <option value="Property">Payment 1</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-custom-blue2 font-bold">
                        Lot No.
                      </label>
                      <select
                        name="status"
                        className="border rounded-md p-2 w-full"
                        value={newItem.status}
                        onChange={handleInputChange}
                      >
                        <option value="Block">LOT 1</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-custom-blue2 font-bold">
                        Start Date
                      </label>
                      <input
                        type="text"
                        name="packageCode"
                        value={newItem.packageCode}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-custom-blue2 font-bold">
                        Tax Code
                      </label>
                      <select
                        name="status"
                        className="border rounded-md p-2 w-full"
                        value={newItem.status}
                        onChange={handleInputChange}
                      >
                        <option value="Block">Tax</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-custom-blue2 font-bold">
                        Description
                      </label>
                      <input
                        type="text"
                        name="packageCode"
                        value={newItem.packageCode}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-custom-blue2 font-bold">
                        Amount
                      </label>
                      <input
                        type="text"
                        name="packageCode"
                        value={newItem.packageCode}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-custom-blue2 font-bold">
                        Transaction Type
                      </label>
                      <select
                        name="status"
                        className="border rounded-md p-2 w-full text-gray-900"
                        value={newItem.status}
                        onChange={handleInputChange}
                      >
                        <option
                          value=""
                          disabled
                          hidden
                          className="text-gray-400"
                        >
                          Type
                        </option>
                        <option value="Type A">Type A</option>
                        <option value="Type B">Type B</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-custom-blue2 font-bold">
                        Frequency
                      </label>
                      <select
                        name="status"
                        className="border rounded-md p-2 w-full"
                        value={newItem.status}
                        onChange={handleInputChange}
                      >
                        <option value="Zone">Frequency 1</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-custom-blue2 font-bold">
                        Payment Type
                      </label>
                      <select
                        name="status"
                        className="border rounded-md p-2 w-full"
                        value={newItem.status}
                        onChange={handleInputChange}
                      >
                        <option value="Lot">Transfer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-custom-blue2 font-bold">
                        Currency
                      </label>
                      <select
                        name="status"
                        className="border rounded-md p-2 w-full"
                        value={newItem.status}
                        onChange={handleInputChange}
                      >
                        <option value="Lot">Currency</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-custom-blue2 font-bold">
                        Payment Interval
                      </label>
                      <select
                        name="status"
                        className="border rounded-md p-2 w-full"
                        value={newItem.status}
                        onChange={handleInputChange}
                      >
                        <option value="Lot">Interval</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-custom-blue2 font-bold">
                        Tax Amount
                      </label>
                      <input
                        type="text"
                        name="packageCode"
                        value={newItem.packageCode}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-custom-blue2 font-bold">
                    Total Amount
                  </label>
                  <input
                    type="text"
                    name="packageCode"
                    value={newItem.packageCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex justify-between gap-4 mt-6">
                  <button
                    className="w-1/2 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                    onClick={handleCloseModal}
                  >
                    Delete
                  </button>

                  <button
                    className="w-1/2 py-2 bg-custom-blue2 text-white rounded hover:bg-custom-blue"
                    onClick={handleAddItem}
                  >
                    SP
                  </button>
                  <button
                    className="w-1/2 py-2 bg-custom-blue2 text-white rounded hover:bg-custom-blue"
                    onClick={handleAddItem}
                  >
                    Billing Detail
                  </button>
                  <button
                    className="w-1/2 py-2 bg-custom-blue2 text-white rounded hover:bg-custom-blue"
                    onClick={handleAddItem}
                  >
                    Posting
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
