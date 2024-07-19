import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../atoms/PasswordInput";
import SmallLoadingSpinner from "../../atoms/SmallLoadingSpinner";
import { resetPassword } from "../../store/slices/authSlice";

//-----------
import { Notyf } from "notyf";
const notyf = new Notyf();

const CahngePass = () => {
  const { isPending, confirmUser } = useSelector((state) => state.authSlice);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      return notyf.error("password not matched...!");
    }

    dispatch(
      resetPassword({
        password,
        email: confirmUser.email,
        _id: confirmUser._id,
        navigate,
      })
    );
  };

  useEffect(() => {
    if (!confirmUser._id) {
      navigate("/", { replace: true });
    }
  }, [navigate, confirmUser]);

  return (
    <>
      <img
        className="max-w-40 mx-auto rounded-md"
        src={confirmUser.avatar}
        alt="user"
      />
      <h1 className="text-center text-mainBreakColor font-semibold -mt-2">{confirmUser.firstName} {confirmUser.lastName}</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <fieldset className="space-y-1">
          <label className="font-semibold text-sky-500" htmlFor="password">
            new password
          </label>
          <PasswordInput name={"password"} id={"password"} />
        </fieldset>
        <fieldset className="space-y-1">
          <label
            className="font-semibold text-sky-500"
            htmlFor="confirmPassword"
          >
            confirm new password
          </label>
          <PasswordInput name={"confirmPassword"} id={"confirmPassword"} />
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
      {isPending && <SmallLoadingSpinner />}
    </>
  );
};

export default CahngePass;
