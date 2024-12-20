import { Outlet, useLocation, Link } from "react-router-dom";

const CashBook = () => {

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default CashBook;
