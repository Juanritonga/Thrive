import React from "react";

const Table = ({ columns, data, actions }) => {
  return (
    <table className="min-w-full bg-white border rounded-lg">
      <thead>
        <tr className="text-custom-blue bg-gray-200">
          {columns.map((column, index) => (
            <th key={index} className="py-3 px-4 border">
              {column.header}
            </th>
          ))}
          {actions && actions.length > 0 && (
            <th className="py-3 px-4 border">Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className="cursor-pointer border-t text-center text-custom-blue2"
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-3 px-4">
                  {typeof column.accessor === "function"
                    ? column.accessor(item)
                    : item[column.accessor]}
                </td>
              ))}
              {actions && actions.length > 0 && (
                <td className="py-3 px-4 flex justify-center gap-2">
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      className={`font-bold p-3 rounded-lg ${
                        action.buttonClass || "bg-gray-200 text-gray-400"
                      } hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400`}
                      onClick={() => action.handler(item)}
                    >
                      {action.icon ? (
                        <i className={action.icon}></i>
                      ) : (
                        action.label
                      )}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + (actions ? 1 : 0)} className="py-3 px-4 text-center">
              No data available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
