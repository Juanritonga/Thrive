import { Outlet } from "react-router-dom";

const MasterData = () => {

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MasterData;
