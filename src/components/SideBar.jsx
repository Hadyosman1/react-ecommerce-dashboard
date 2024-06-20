import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "../store/slices/authSlice";

//pictures
import logo from "../assets/logo.jpg";

//  icons
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa6";
import { TbCategory2 } from "react-icons/tb";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { LuArrowLeftSquare } from "react-icons/lu";

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
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkIsMobile = () => {
      if (window.innerWidth <= 640) {
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

  const linkStyle = `capitalize relative z-10 border border-secondarybreakColor flex gap-2 flex-nowrap items-center lg:text-xl bg-secondary-800  rounded-md px-2 py-1 tranistion hover:bg-main hover:border-mainBreakColor ${
    isSideBarHidden && "justify-center"
  } font-bold show-tooltip`;

  const absoluteTooltipStyle =
    "absolute whitespace-nowrap top-1/2 -right-3 md:-right-[1.5rem] translate-x-[100%] -translate-y-1/2 shadow-sm shadow-current bg-secondarybreakColor text-sm text-mainBreakColor rounded-sm py-2 px-3 transition pointer-events-none opacity-0 ";

  return (
    <>
      <aside
        className={`transition flex flex-col text-secondarybreakColor bg-secondary-200 min-h-screen sm:w-2/10 lg:w-1/6 p-2 lg:p-3  ${
          isSideBarHidden ? "w-16 md:w-16 lg:w-16" : "overflow-y-auto"
        }`}
      >
        {/* head */}
        {!isMenuHidden && (
          <span
            className={`flex gap-2 flex-wrap-reverse items-center text-xl md:text-3xl w-full  transition mt-2  ${
              isSideBarHidden ? " justify-center" : "justify-between"
            } `}
          >
            {!isSideBarHidden && (
              <span className="text-sm lg:text-lg xl:text-xl text-mainBreakColor font-bold capitalize flex items-center">
                <img
                  className="rounded  max-w-8 object-cover aspect-square inline-block mx-1 "
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
              <LuArrowLeftSquare
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
          className={`dashboard-user relative border-b-2 border-secondarybreakColor pt-6 pb-3 font-medium flex gap-2 flex-nowrap items-center ${
            isSideBarHidden && "justify-center"
          }`}
        >
          <img
            className="max-w-10 cursor-pointer border-2 shadow-md shadow-secondarybreakColor rounded-full "
            src={user.avatar}
            alt={"user"}
          />
          <div
            className={`flex flex-col text-sm ${
              isSideBarHidden && absoluteTooltipStyle + "-translate-y-[30%]"
            }`}
          >
            <h1 className="whitespace-nowrap">
              @{user.firstName + " " + user.lastName}
            </h1>
            <h2 className="lowercase first-letter:capitalize">{user.role}</h2>
          </div>
        </div>
        {/* user*/}

        <ul
          className={`${
            isSideBarHidden ? "my-4" : "my-6"
          } my-side-nav flex-1 space-y-2 lg:space-y-3 `}
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
        <div className="pt-3 border-t border-secondarybreakColor">
          <span
            onClick={handleLogOut}
            className={
              linkStyle +
              " cursor-pointer logout-btn bg-red-700  hover:bg-red-900 hover:border-gray-200"
            }
          >
            <RiLogoutCircleLine className="w-6 flex-shrink-0 " />
            <span
              className={
                isSideBarHidden
                  ? absoluteTooltipStyle +
                    " shadow-gray-600 " +
                    " bg-red-700 text-white"
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
