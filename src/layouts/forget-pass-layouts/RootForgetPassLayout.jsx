import { Outlet } from "react-router-dom";

const RootForgetPassLayout = () => {
  return (
    <div className="text-mainBreakColor flex flex-col justify-center items-center min-h-[100svh] py-6">
      <div className="flex flex-col gap-5 border-2 shadow-lg shadow-mainBreakColor border-mainBreakColor bg-secondarybreakColor rounded px-4 py-7 min-w-72 max-w-[300px]">
        <Outlet />
      </div>
    </div>
  );
};

export default RootForgetPassLayout;
