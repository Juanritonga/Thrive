const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    limit, 
    onLimitChange, 
    totalItems 
  }) => {
    const startIndex = (currentPage - 1) * limit + 1;
    const endIndex = Math.min(currentPage * limit, totalItems);
  
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-gray-500">
          Showing {startIndex} to {endIndex} of {totalItems} entries
        </span>
        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lt;
          </button>
          <button
            className="px-4 py-2 border rounded-md bg-custom-blue text-white"
            disabled
          >
            {currentPage}
          </button>
          <button
            className="px-4 py-2 border rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &gt;
          </button>
          <select
            className="px-4 py-2 border rounded-md bg-custom-blue text-white"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
          >
            <option value={10}>10 Rows</option>
            <option value={20}>20 Rows</option>
            <option value={50}>50 Rows</option>
          </select>
        </div>
      </div>
    );
  };
  
  export default Pagination;
  