import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SmallLoadingSpinner from "../atoms/SmallLoadingSpinner";

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
      <div className=" min-h-screen flex gap-1 md:gap-3">
        <SideBar />
        <div className="flex-grow ">
          <Outlet />
        </div>
      </div>
      {isPending && <SmallLoadingSpinner />}
    </>
  );
};

export default RootLayout;
