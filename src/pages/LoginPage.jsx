import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../store/slices/authSlice";
import SmallLoadingSpinner from "../atoms/SmallLoadingSpinner";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user, isPending } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.token) {
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
      <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto w-9/12 aspect-video object-cover object-top rounded-2xl"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-mainBreakColor">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-secondarybreakColor"
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
                  className="block text-sm font-medium leading-6 text-secondarybreakColor"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  placeholder="at least 8 digits"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  minLength={8}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainBreakColor sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-mainBreakColor px-3 py-1.5 text-sm font-semibold leading-6 text-secondarybreakColor shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainBreakColor"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      {isPending && <SmallLoadingSpinner />}
    </>
  );
};

export default LoginPage;
