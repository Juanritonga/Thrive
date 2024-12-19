import React from "react";

const Table = ({ columns, data, actions, onRowClick }) => {
  return (
    <table className="min-w-full bg-white border rounded-lg">
      <thead>
        <tr className="text-custom-blue bg-gray-200">
          {columns.map((column, index) => (
            <th key={index} className="py-3 px-4 border">
              {column.header}
            </th>
          ))}
          {actions && actions.length > 0 && <th className="py-3 px-4 border">Action</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="cursor-pointer border-t text-center text-custom-blue2"
            onClick={() => onRowClick && onRowClick(row)}
          >
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="py-3 px-4">
                {typeof column.accessor === "function"
                  ? column.accessor(row)
                  : row[column.accessor]}
              </td>
            ))}
            {actions && actions.length > 0 && (
              <td className="py-3 px-4">
                <div className="flex justify-center space-x-2">
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      className={`font-bold p-2 rounded-lg ${action.buttonClass}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        action.handler(row);
                      }}
                    >
                      {action.icon && <i className={`${action.icon} mr-2`}></i>}
                      {action.label}
                    </button>
                  ))}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

