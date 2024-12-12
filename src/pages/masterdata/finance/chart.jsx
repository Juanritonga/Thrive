import axios from "axios";
import { useState, useEffect } from "react";

const Chart = () => {
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  const indexOfLastItem = currentPage * limit;
  const indexOfFirstItem = indexOfLastItem - limit;

  useEffect(() => {
    const fetchCharts = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authorization token is missing.");
        }

        const response = await axios.get(
          "https://thrive-be.app-dev.altru.id/api/v1/finance/acc",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: currentPage,
              limit: limit,
            },
          }
        );

        if (response.data.success) {
          setCharts(response.data.data.items);
          setTotalPages(response.data.data.total_pages || 1);
        } else {
          throw new Error(
            response.data.message || "Unexpected response format."
          );
        }
      } catch (err) {
        console.error("Error:", err.response || err.message);
        setError(
          err.response?.data?.message ||
            err.message ||
            "An unexpected error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, [currentPage, limit]);

  const filteredData = charts.filter((chart) =>
    Object.values(chart)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-custom-blue border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

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
      </div>
      <div className="overflow-auto shadow-sm mb-6">
        {filteredData.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="text-custom-blue bg-gray-200">
                <th className="py-3 px-4 border">Acc. ID</th>
                <th className="py-3 px-4 border">Nama Acc.</th>
                <th className="py-3 px-4 border">Kelas</th>
                <th className="py-3 px-4 border">Kode</th>
                <th className="py-3 px-4 border">Dibuat Oleh</th>
                <th className="py-3 px-4 border">Tanggal Update</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
  {filteredData.map((chart) => (
    <tr
      key={chart.id}
      className="cursor-pointer border-t text-center text-custom-blue2"
    >
      <td className="py-3 px-4">{chart.acc_id}</td>
      <td className="py-3 px-4">{chart.name}</td>
      <td className="py-3 px-4">{chart.class_name}</td>
      <td className="py-3 px-4">{chart.class_code}</td>
      <td className="py-3 px-4">{chart.created_by}</td>
      <td className="py-3 px-4">
        {new Date(chart.updated_at)
          .toLocaleDateString("en-GB")
          .replace(/\//g, "-")}
      </td>
      <td className="py-3 px-4">
        <span
          className={`inline-flex items-center justify-center px-8 py-2 rounded-full font-bold ${
            chart.status.toLowerCase() === "active"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {chart.status}
        </span>
      </td>
      <td className="py-3 px-4">
        <button className="font-bold bg-gray-200 text-gray-400 p-4 rounded-lg w-12 h-12">
          <i className="fas fa-edit"></i>
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        )}
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <span className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, charts.length)} of {charts.length} entries
        </span>
        <div className="flex items-center gap-4 ml-auto">
          {" "}
          <div className="flex items-center space-x-3">
            <button
              className="px-4 py-2 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
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
            ))}
            <button
              className="px-4 py-2 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <select
              className="px-4 py-2 border rounded-md text-white bg-custom-blue"
              value={limit}
              onChange={(e) =>
                setCurrentPage(1) || setLimit(Number(e.target.value))
              }
            >
              <option value={10}>10 Baris</option>
              <option value={20}>20 Baris</option>
              <option value={50}>50 Baris</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
