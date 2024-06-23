import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SmallLoadingSpinner from "../atoms/SmallLoadingSpinner";
import MyModal from "../atoms/MyModal";

const RootLayout = () => {
  const navigate = useNavigate();
  const { user, isPending } = useSelector((state) => state.authSlice);
  useEffect(() => {
    if (!user.token) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <MyModal />
      <div className="h-svh flex gap-1 md:gap-3 ">
        <SideBar />
        <div className="flex-grow overflow-x-hidden overflow-y-auto h-svh bg-secondary-800 py-8 px-2 md:px-3 ">
          <Outlet />
        </div>
      </div>
      {isPending && <SmallLoadingSpinner />}
    </>
  );
};

export default RootLayout;
