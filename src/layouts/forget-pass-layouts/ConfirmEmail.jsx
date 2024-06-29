import { useDispatch, useSelector } from "react-redux";
import pic from "../../assets/forgetPass.jpg";
import { getUserByEmail } from "../../store/slices/authSlice";
import SmallLoadingSpinner from "../../atoms/SmallLoadingSpinner";
import { useNavigate } from "react-router-dom";

const ConfirmEmail = () => {
  const { isPending } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    dispatch(getUserByEmail({ email, navigate }));
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-sky-600">
        Forget Password
      </h1>
      <img
        className="max-w-64 rounded-lg object-cover bg-slate-500"
        src={pic}
        alt="forget pass"
      />
      <div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <fieldset className="space-y-1">
            <label className="font-semibold text-sky-600" htmlFor="email">
              E-mail
            </label>
            <input
              name="email"
              id="email"
              placeholder="example@mail.com"
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-md border border-mainBreakColor py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainBreakColor sm:text-sm sm:leading-6"
            />
          </fieldset>
          <button
            type="submit"
            className="
              flex w-full justify-center rounded-md 
              bg-sky-700 px-3 py-1.5 text-sm
              font-semibold leading-6 text-white
              shadow-sm hover:opacity-80
              focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-sky-800
              "
          >
            Confrim
          </button>
        </form>
      </div>
      {isPending && <SmallLoadingSpinner />}
    </>
  );
};

export default ConfirmEmail;
