import { Outlet } from "react-router-dom";

const MasterDataInternal = () => {

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MasterDataInternal;
