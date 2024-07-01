import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logOut } from "../store/slices/authSlice";
import { setTheme } from "../store/slices/themeSlice";

//pictures
import logo from "../assets/logo.jpg";

//  icons
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa6";
import { TbCategory2 } from "react-icons/tb";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import requestFullScreen from "../utils/requestFullScreen";

const navLinks = [
  {
    name: "Home",
    path: "/dashboard",
    icon: <IoHomeOutline />,
  },
  {
    name: "Profile",
    path: "profile",
    icon: <CgProfile />,
  },
  {
    name: "Products",
    path: "products",
    icon: <HiOutlineShoppingBag />,
  },
  {
    name: "Users",
    path: "users",
    icon: <FaUsers />,
  },
  {
    name: "categories",
    path: "categories",
    icon: <TbCategory2 />,
  },
];

const SideBar = () => {
  const [isSideBarHidden, setIsSideBarHidden] = useState(false);
  const [isIconMenuHidden, setIsMenuHidden] = useState(false);
  const { user } = useSelector((state) => state.authSlice);
  const theme = useSelector((state) => state.themeSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkIsMobile = () => {
      if (window.innerWidth <= 700) {
        setIsSideBarHidden(true);
        setIsMenuHidden(true);
      } else {
        setIsMenuHidden(false);
      }
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const handleLogOut = () => {
    dispatch(logOut({ userId: user._id, token: user.token }));
  };

  const linkStyle = `capitalize relative z-10 border border-secondarybreakColor flex gap-3 flex-nowrap items-center text-lg lg:text-xl bg-secondary-800  rounded-md py-[6px] px-1 md:px-2 md:py-1  hover:ring-2 ring-secondarybreakColor hover:bg-main hover:border-secondarybreakColor ${
    isSideBarHidden && " justify-center md:py-[6px]  tranistion "
  } font-bold show-tooltip`;

  const absoluteTooltipStyle = `absolute whitespace-nowrap top-1/2 -right-3 md:-right-[1.5rem] translate-x-[100%] -translate-y-1/2 shadow-sm shadow-current bg-secondarybreakColor text-sm text-secondary-200 rounded-sm py-2 px-3 ${
    isSideBarHidden && " transition "
  } pointer-events-none opacity-0 `;

  return (
    <>
      <aside
        className={`transition flex-shrink-0 flex flex-col  text-secondarybreakColor bg-secondary-200  p-2 lg:p-3 px-2 lg:px-3 ${
          isSideBarHidden
            ? " w-14 md:w-14 lg:w-14 lg:px-[8px] "
            : " sm:w-2/10 w-60 overflow-auto"
        }    ${isIconMenuHidden && isSideBarHidden && "overflow-x-hidden"}`}
      >
        {/* head */}
        {!isIconMenuHidden && (
          <span
            className={`flex gap-3 flex-wrap-reverse items-center text-3xl w-full  transition mt-2  ${
              isSideBarHidden ? " justify-center" : "justify-between"
            } `}
          >
            {!isSideBarHidden && (
              <span className="text-sm lg:text-lg xl:text-xl text-secondarybreakColor font-bold capitalize flex items-center">
                <img
                  className="rounded  max-w-8 object-cover aspect-square inline-block mr-2 "
                  src={logo}
                  alt="logo"
                />
                dashboard
              </span>
            )}

            <span
              className={`flex flex-1 ${
                isSideBarHidden ? "justify-center" : "justify-end"
              }`}
            >
              <TbLayoutSidebarRightExpand
                className={`flex-shrink-0 cursor-pointer  transition hover:text-mainBreakColor ${
                  isSideBarHidden && "-scale-100"
                }`}
                onClick={() => setIsSideBarHidden(!isSideBarHidden)}
              />
            </span>
          </span>
        )}
        {/* head */}

        {/* user*/}
        <div
          className={`dashboard-user relative border-b-2 border-secondarybreakColor mt-4 pb-3 font-medium flex gap-3 flex-nowrap items-center hover:[filter:brightness(110%)]  ${
            isSideBarHidden && "justify-center"
          }`}
        >
          <img
            id="side-bar-avatar"
            onClick={requestFullScreen}
            className="max-w-12 transition object-contain bg-main cursor-pointer aspect-square border-2 shadow-md shadow-secondarybreakColor rounded-full "
            src={user.avatar}
            alt={"user"}
          />
          <Link
            to={"profile"}
            className={`flex flex-col text-sm ${
              isSideBarHidden && absoluteTooltipStyle + "-translate-y-[30%]"
            }`}
          >
            <h1 className="whitespace-nowrap">
              {user.firstName + " " + user.lastName}
            </h1>
            <h2 className="lowercase first-letter:capitalize">{user.role}</h2>
          </Link>
        </div>
        {/* user*/}

        <div className="flex-1  ">
          <ul
            className={`${
              isSideBarHidden ? "my-4" : "my-6"
            } my-side-nav  space-y-3 lg:space-y-4 `}
          >
            {navLinks.map(({ name, path, icon }) => (
              <li key={name}>
                <NavLink
                  end={name.toLowerCase() === "home"}
                  className={linkStyle}
                  to={path}
                >
                  {icon}
                  <span className={isSideBarHidden ? absoluteTooltipStyle : ""}>
                    {name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="my-2">
          <span
            onClick={() =>
              dispatch(setTheme(theme === "light" ? "dark" : "light"))
            }
            className={linkStyle + ` cursor-pointer `}
          >
            {theme === "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
            <span
              className={
                isSideBarHidden ? absoluteTooltipStyle + "" : " font-semibold "
              }
            >
              {theme === "light" ? "dark" : "light"} mode
            </span>
          </span>
        </div>

        <div className="pt-2 border-t border-secondarybreakColor">
          <span
            onClick={handleLogOut}
            className={`capitalize relative z-10 bg-red-700 border flex gap-3 flex-nowrap items-center text-lg lg:text-xl rounded-md py-[6px] px-1 md:px-2 md:py-1 tranistion text-white font-bold show-tooltip cursor-pointer logout-btn  hover:bg-red-800 hover:border-gray-300 ${
              isSideBarHidden && " justify-center md:py-[6px]  "
            }`}
          >
            <RiLogoutCircleLine className="w-6 flex-shrink-0 " />
            <span
              className={
                isSideBarHidden
                  ? "absolute whitespace-nowrap top-1/2 -right-3 md:-right-[1.5rem] translate-x-[100%] -translate-y-1/2 shadow-sm text-sm rounded-sm py-2 px-3 transition pointer-events-none opacity-0  shadow-gray-600 bg-red-700 text-white"
                  : ""
              }
            >
              logout
            </span>
          </span>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
