import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SmallLoadingSpinner from "../atoms/SmallLoadingSpinner";
import MyModal from "../atoms/MyModal";
import ImageLightBox from "../atoms/ImageLightBox";

const RootLayout = () => {
  const navigate = useNavigate();
  const { user, isPending } = useSelector((state) => state.authSlice);
  useEffect(() => {
    if (!Object.keys(user).length) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <ImageLightBox />
      <MyModal />
      <div className="h-svh flex md:gap-1 ">
        <SideBar />
        <div className="flex-grow overflow-x-hidden overflow-y-auto min-h-svh bg-secondary-800 py-8 px-2 md:px-3 ">
          <Outlet />
        </div>
      </div>
      {isPending && <SmallLoadingSpinner />}
    </>
  );
};

export default RootLayout;
