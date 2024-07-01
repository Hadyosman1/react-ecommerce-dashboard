import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { setTheme } from "../../store/slices/themeSlice";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const RootForgetPassLayout = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeSlice);
  return (
    <div className="text-slate-500 w-full flex flex-col justify-start items-center min-h-[100svh] px-4 py-8  overflow-y-auto">
      <div className="flex items-center justify-between w-full flex-wrap">
        <Link
          to={"/"}
          className="bg-blue-700 text-white hover:bg-blue-800 py-1 px-2 rounded flex items-center justify-center gap-2"
        >
          <FaArrowAltCircleLeft /> Back To Login
        </Link>
        <button
          onClick={() =>
            dispatch(setTheme(theme === "light" ? "dark" : "light"))
          }
          className={`self-start   text-2xl rounded-md   border-2 p-1 ${
            theme === "light"
              ? " bg-slate-700  text-sky-300 border-sky-300 "
              : " bg-gray-200 text-amber-600  border-amber-500"
          }`}
        >
          {theme === "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
        </button>
      </div>
      <div className="mt-8  flex flex-col gap-5 border-2 shadow-lg shadow-secondarybreakColor border-secondarybreakColor bg-secondary-200 rounded px-4 py-7 min-w-72 max-w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default RootForgetPassLayout;
