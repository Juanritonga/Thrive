const Header = () => {
    return (
      <div className="bg-custom-blue flex w-full items-center justify-between py-4 h-20 ">
        {/* Logo dan Project Select */}
        <div className="flex items-center h-full">
          {/* Logo */}
          <img src="../thrive.png" alt="Company Logo" className="h-full object-contain mr-4 ml-4" />
  
          {/* Project Select */}
          <select className="bg-white text-gray-400 p-2 rounded w-full ml-40 sm:w-60">
            <option>Project</option>
          </select>
        </div>
  
        {/* User Profile and Log Out */}
        <div className="flex items-center sm:mt-0">
          <div className="flex items-center text-black p-2 rounded mr-4">
            <div className="font-bold bg-white text-custom-blue mr-2 p-4 rounded-lg flex items-center justify-center w-12 h-12">
              S
            </div>
            <div className="min-w-0 mr-5">
              <div className="font-bold text-white text-sm truncate">Admin</div>
              <div className="text-xs text-white truncate">Admin</div>
            </div>
          </div>
  
          <i className="fa fa-sign-out bg-white text-custom-blue mr-2 p-4 rounded-lg"></i>
  
          <button className="font-bold text-white p-2 rounded hidden sm:block mr-5">
            Log Out
          </button>
        </div>
      </div>
    );
  };
  
  export default Header;
  