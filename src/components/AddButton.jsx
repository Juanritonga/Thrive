const AddButton = ({ onClick, label = "+ Tambah Baru", className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-custom-blue text-white py-2 px-4 rounded-md ${className}`}
    >
      {label}
    </button>
  );
};

export default AddButton;
