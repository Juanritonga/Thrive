const SearchBar = ({ value, onChange, placeholder = "Cari" }) => {
  return (
    <div className="relative w-full sm:w-[300px]">
      <input
        type="text"
        placeholder={placeholder}
        className="pl-6 pr-10 py-3 w-full border rounded-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <i className="fa-solid fa-magnifying-glass absolute right-2 top-1/2 transform -translate-y-1/2 text-custom-blue"></i>
    </div>
  );
};

export default SearchBar;