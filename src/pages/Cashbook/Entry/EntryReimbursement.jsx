import { useParams } from "react-router-dom";

const EntryReimbursement = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
  <form className="grid grid-cols-4 gap-4">
    {/* Baris Pertama (4 elemen) */}
    <div>
      <label className="block text-sm font-bold text-custom-blue">Reimbursement Transaction</label>
      <select className="text-gray-400 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option>Reimbursement Transaction</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-bold text-custom-blue">Reimbursement ID</label>
      <input
        type="text"
        className="py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <div>
      <label className="block text-sm font-bold text-custom-blue">Petty Cash Account</label>
      <select className="text-gray-400 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option>Petty Cash Account</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-bold text-custom-blue">Bank Transaction</label>
      <select className="text-gray-400 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option>Bank Transaction</option>
      </select>
    </div>

    {/* Baris Kedua (4 elemen) */}
    <div>
      <label className="block text-sm font-bold text-custom-blue">Bank Code</label>
      <select className="text-gray-400 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option>Bank Code</option>
      </select>
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

    <hr className="col-span-4 border-t border-gray-300 my-4" />
  </form>
</div>

  
  );
};

export default EntryReimbursement;
