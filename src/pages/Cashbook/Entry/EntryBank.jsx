import { useParams } from "react-router-dom";

const EntryBank = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
  <form className="grid grid-cols-4 gap-4">
    {/* Baris Pertama (4 elemen) */}
    <div>
      <label className="block text-sm font-bold text-custom-blue">Cash In / Out</label>
      <select className="text-gray-400 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option>Cash In / Out</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-bold text-custom-blue">Cash Bank ID</label>
      <input
        type="text"
        className="py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <div>
      <label className="block text-sm font-bold text-custom-blue">Transaction Receipt</label>
      <select className="text-gray-400 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option>Aktif</option>
        <option>Tidak Aktif</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-bold text-custom-blue">Receipt No.</label>
      <input
        type="text"
        className="py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    {/* Baris Kedua (4 elemen) */}
    <div>
      <label className="block text-sm font-bold text-custom-blue">Receipt to</label>
      <input
        type="text"
        className="py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <div>
      <label className="block text-sm font-bold text-custom-blue">Bank Code</label>
      <select className="text-gray-400 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option>Bank Code</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-bold text-custom-blue">Currency</label>
      <select className="text-gray-400 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option>Currency</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-bold text-custom-blue">Rate</label>
      <input
        type="text"
        className="py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <div>
      <label className="block text-sm font-bold text-custom-blue">Date</label>
      <input
        type="date"
        className="text-gray-400 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    {/* Baris Ketiga (2 elemen) */}
    <div className="col-span-2">
      <label className="block text-sm font-bold text-custom-blue">Description</label>
      <textarea className="py-4 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
    </div>

    <div>
      <label className="block text-sm font-bold text-custom-blue">Reference</label>
      <input
        type="text"
        className="py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <hr className="col-span-4 border-t border-gray-300 my-4" />
  </form>
</div>

  
  );
};

export default EntryBank;
