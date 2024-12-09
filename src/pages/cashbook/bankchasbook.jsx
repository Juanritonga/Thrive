import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Bank = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  const [newItem, setNewItem] = useState({
    id: "",
    bank_id: "",
    bank: "",
    entity: "",
    account_number: "",
    created_by: "Default User",
    updated_at: new Date().toLocaleString(),
    status: "Active",
  });

useEffect(() => {
  const fetchItems = async () => {
    const token = sessionStorage.getItem("authToken"); 
    try {
      const response = await fetch("https://thrive-be.app-dev.altru.id/api/v1/banks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",  
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData); 
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };
  

  fetchItems();
}, []);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const paginatedItems = items
    .filter(item => item.bank.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div className="px-6 py-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search bank"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        />
      </div>

      <div className="px-6 py-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Bank</th>
              <th className="py-2 px-4 text-left">Entity</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4">{item.bank}</td>
                  <td className="py-2 px-4">{item.entity}</td>
                  <td className="py-2 px-4">{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-2 px-4 text-center">No matching banks found</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          {items.length > itemsPerPage && (
            Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, index) => (
              <button
                key={index}
                className={`py-2 px-4 mx-2 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => handlePagination(index + 1)}
              >
                {index + 1}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Bank;
