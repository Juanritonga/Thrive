const ModalCRUD = ({
  isOpen,
  title,
  onClose,
  onSave,
  onDelete,
  formFields,
  editMode = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-[600px]">
        <div className="flex justify-between items-center bg-blue-900 text-white px-4 py-3 rounded-t-lg">
          <h2 className="text-lg">{title}</h2>
          <button onClick={onClose} className="text-white">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave();
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {formFields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-gray-700 font-medium mb-2"
                  >
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.value || ""}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                      onChange={field.onChange}
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={field.value}
                      placeholder={field.placeholder || ""}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
                      onChange={field.onChange}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              {editMode && onDelete && (
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  onClick={onDelete}
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                {editMode ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCRUD;
