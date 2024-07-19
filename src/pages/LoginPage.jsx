import { Link, redirect, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../store/slices/authSlice";
import SmallLoadingSpinner from "../atoms/SmallLoadingSpinner";
import PasswordInput from "../atoms/PasswordInput";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { setTheme } from "../store/slices/themeSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user, isPending } = useSelector((state) => state.authSlice);
  const theme = useSelector((state) => state.themeSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = e.target;
    const password = myForm.password.value;
    const email = myForm.email.value;

    dispatch(logIn({ password, email }));
  };

  return (
    <>
      <div className="flex gap-4 min-h-screen flex-1 flex-col justify-center items-center px-6 py-8 lg:px-8 overflow-y-auto ">
        <button
          onClick={() =>
            dispatch(setTheme(theme === "light" ? "dark" : "light"))
          }
          className={`self-start ml-auto  text-2xl rounded-md   border-2 p-1 ${
            theme === "light"
              ? " bg-slate-700  text-sky-300 border-sky-300 "
              : " bg-gray-200 text-amber-600  border-amber-500"
          }`}
        >
          {theme === "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
        </button>
        <div className="bg-gray-200/80 py-8 px-5 rounded-md shadow shadow-sky-600">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto w-9/12 aspect-video object-cover object-top rounded-2xl"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-sky-600">
              Sign in to your account
            </h2>
          </div>

          <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-sky-500"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    placeholder="example@email.com"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainBreakColor sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-sky-500"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <PasswordInput id={"password"} name={"password"} />
                </div>
                <Link
                  to="forget_password"
                  className="float-end mt-1 mb-3 inline-block  text-sky-500"
                >
                  Forgot Password ?
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  className="
                flex w-full justify-center 
                rounded-md bg-sky-600 px-3
                py-1.5 text-sm font-semibold 
                leading-6 text-white
                shadow-sm hover:opacity-80 focus-visible:outline
                focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-mainBreakColor
                "
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isPending && <SmallLoadingSpinner />}
    </>
  );
};
export default LoginPage;

export const loginLoader = async () => {
  if (localStorage.getItem("user")) {
    return redirect("/dashboard");
  }
  return null;
};
