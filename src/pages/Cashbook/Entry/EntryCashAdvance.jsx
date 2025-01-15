import { useParams } from "react-router-dom";
import { useState } from "react";

const EntryCA = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState();
  const [newItem, setNewItem] = useState({
    id: "",
    advanceTransaction: "",
    referenceNo: "",
    staffID: "",
    receiptNo: "",
    madeBy: "",
    updateDate: new Date().toLocaleDateString("en-GB"),
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddItem = () => {
    if (newItem.id && newItem.description && newItem.prefix && newItem.format) {
      setItems([...items, newItem]);
      setNewItem({
        id: "",
        advanceTransaction: "",
        referenceNo: "",
        staffID: "",
        receiptNo: "",
        madeBy: "",
        updateDate: new Date().toLocaleDateString("en-GB"),
      });
      handleCloseModal();
    } else {
      alert("Isi semua field terlebih dahulu.");
    }
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <button
          className="bg-custom-blue text-white px-4 py-2 rounded-lg w-full sm:w-auto flex items-center justify-center space-x-2 ml-auto"
          onClick={handleOpenModal}
        >
          <i className="fa-solid fa-check text-white"></i>
          <span>Approval</span>
        </button>
      </div>

      <form className="grid grid-cols-4 gap-4">
        {/* Baris Pertama (4 elemen) */}
        <div>
          <label className="block text-sm font-bold text-custom-blue2">
            Cash Advance ID
          </label>
          <input
            type="text"
            className="py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-custom-blue2">
            Advance Transaction
          </label>
          <select className="text-gray-400 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>Advance Transaction</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-custom-blue2">
            Receipt No.
          </label>
          <input
            type="text"
            className="py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-custom-blue2">
            Receipt to
          </label>
          <input
            type="text"
            className="py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Baris Kedua (4 elemen) */}
        <div>
          <label className="block text-sm font-bold text-custom-blue2">
            Bank Code
          </label>
          <select className="text-gray-400 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>Bank Code</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-custom-blue2">
            Currency
          </label>
          <select className="text-gray-400 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>Currency</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-custom-blue2">
            Rate
          </label>
          <input
            type="text"
            className="py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-custom-blue2">
            Date
          </label>
          <input
            type="date"
            className="text-gray-400 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Baris Ketiga (2 elemen) */}
        <div className="col-span-2">
          {" "}
          {/* Membuat textarea lebar dua kali kolom */}
          <label className="block text-sm font-bold text-custom-blue2">
            Description
          </label>
          <textarea className="py-4 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>

        <div>
          <label className="block text-sm font-bold text-custom-blue2">
            Reference
          </label>
          <input
            type="text"
            className="py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </form>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-[35%] mx-auto ">
            <div className="flex justify-between items-center bg-custom-blue text-white p-4 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg">Approval</h2>
              </div>
              <button className="text-white" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-custom-blue2">
                    Advance No.
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-custom-blue2">
                    Bank In No.
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-custom-blue2">
                    Description
                  </label>
                  <textarea
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    rows="3"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-custom-blue2">
                    Date
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder="Tanggal"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <i className="fas fa-calendar-alt text-gray-400"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-custom-blue2">
                    Amount
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <button
                  className="w-1/2 py-2 bg-red-500 text-white rounded hover:bg-red-500"
                  onClick={handleCloseModal}
                >
                  Reject
                </button>

                <button
                  className="w-1/2 py-2 bg-blue-700 text-white rounded hover:bg-blue-500"
                  onClick={handleAddItem}
                >
                  Approve
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryCA;
