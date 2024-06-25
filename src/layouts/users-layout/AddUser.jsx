import PasswordInput from "../../atoms/PasswordInput";

import { LuImagePlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUsersRoles } from "../../store/slices/usersSlice";
import UsersPageHeader from "../../atoms/PageHeader";
import { useNavigate } from "react-router-dom";
import VerySmallSpinner from "../../atoms/VerySmallSpinner";
import RoundedLoader from "../../atoms/RoundedLoader";
import { openImageLightBox } from "../../store/slices/imageLightBoxSlice";
import checkFileSize from "../../utils/checkFileSize";

const AddUser = () => {
  const [image, setImage] = useState({});
  const [confirmPassError, setConfirmPassError] = useState("");
  const { roles, isPending } = useSelector((state) => state.usersSlice);
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roles.length) {
      dispatch(getUsersRoles({ token: user.token }));
    }
  }, [dispatch, user, roles]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myform = e.target;

    if (image.name) {
      return checkFileSize(image);
    }

    if (myform.password.value !== myform.confirmPassword.value) {
      return setConfirmPassError("password not matched");
    }

    const formData = new FormData();
    formData.append("firstName", myform.firstName.value);
    formData.append("lastName", myform.lastName.value);
    formData.append("email", myform.email.value);
    formData.append("avatar", image);
    formData.append("role", myform.role.value);
    formData.append("password", myform.password.value);

    dispatch(addUser({ formData, navigate, token: user.token }));
  };

  return (
    <section className=" text-secondarybreakColor">
      <UsersPageHeader redirectTo={"/dashboard/users"} title={"Add User"} />
      <div className="my-8">
        {!isPending ? (
          <div className="max-w-lg mx-auto  bg-white  rounded-lg shadow-md px-4 py-6 md:px-8 md:py-10 flex flex-col items-center">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4"
            >
              <div className="flex items-start flex-col justify-start">
                <label
                  htmlFor="firstName"
                  className="text-sm text-mainBreakColor mr-2"
                >
                  First Name:
                </label>
                <input
                  placeholder="John"
                  type="text"
                  required
                  id="firstName"
                  name="firstName"
                  className="w-full px-2 placeholder:text-gray-400   py-1 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-sky-400 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="flex items-start flex-col justify-start">
                <label
                  htmlFor="lastName"
                  className="text-sm text-mainBreakColor   mr-2"
                >
                  Last Name:
                </label>
                <input
                  placeholder="Doe"
                  type="text"
                  required
                  id="lastName"
                  name="lastName"
                  className="w-full px-2 placeholder:text-gray-400   py-1 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-sky-400 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="flex items-start flex-col justify-start">
                <label
                  htmlFor="email"
                  className="text-sm text-mainBreakColor  mr-2"
                >
                  Email:
                </label>
                <input
                  placeholder="example@mail.com"
                  type="email"
                  required
                  id="email"
                  autoComplete="email"
                  name="email"
                  className="w-full px-2 placeholder:text-gray-400  py-1 rounded-md border border-gray-300  focus:outline-none focus:ring-1 focus:ring-sky-400 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="relative flex items-start flex-col justify-start">
                <label
                  htmlFor="avatar"
                  className="text-sm text-mainBreakColor   mr-2"
                >
                  Avatar:
                </label>
                <div className="upload w-full relative items-center gap-2  font-semibold flex px-2 py-1 border border-gray-300 rounded-md text-sky-500/80 cursor-pointer">
                  <LuImagePlus className="text-sky-400 text-2xl " /> Upload
                  Avatar
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    accept="image/*"
                    id="avatar"
                    name="avatar"
                    className="w-full h-full rotate-180 opacity-0 cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
                {image?.name && (
                  <div
                    className={`
                  flex justify-center
                  w-full transition
                  lg:w-[initial]
                  lg:absolute left-0 
                  top-1/2 lg:-translate-x-[114%] 
                  lg:-translate-y-[40%] cursor-default
                  rounded-lg mt-4
                  lg:mt-0
                  lg:after:[content:''] 
                  lg:after:z-500
                  lg:after:absolute
                  lg:after:right-0
                  lg:after:top-1/2
                  lg:after:translate-x-full
                  lg:after:-translate-y-1/2
                  lg:after:border-[12px]
                  lg:after:border-transparent
                  lg:after:border-l-slate-500
                  `}
                  >
                    <img
                      onClick={() =>
                        dispatch(
                          openImageLightBox({
                            image: URL.createObjectURL(image),
                          })
                        )
                      }
                      className="max-h-52 cursor-pointer lg:max-w-40 lg:max-h-32 bg-slate-100 rounded border-2 border-slate-400"
                      src={URL.createObjectURL(image)}
                      alt="avatar"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-start flex-col justify-start">
                <label
                  htmlFor="role"
                  className="text-sm text-mainBreakColor   mr-2"
                >
                  Role:
                </label>
                <select
                  id="role"
                  name="role"
                  className="w-full cursor-pointer px-2 text-slate-600 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-400 sm:text-sm sm:leading-6"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm text-mainBreakColor   mr-2"
                >
                  Password:
                </label>
                <PasswordInput name="password" id="password" />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className={`text-sm text-mainBreakColor mr-2 ${
                    confirmPassError && "text-red-600"
                  } `}
                >
                  Confirm Password:
                </label>
                <PasswordInput
                  setConfirmPassError={setConfirmPassError}
                  confirmPassError={confirmPassError}
                  name="confirmPassword"
                  id="confirmPassword"
                />
                {confirmPassError && (
                  <div className="text-red-600">{confirmPassError}</div>
                )}
              </div>

              <button
                disabled={isPending}
                type="submit"
                className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-medium py-1.5 px-4 rounded-lg shadow-md"
              >
                {isPending && <VerySmallSpinner />} Submit
              </button>
            </form>
          </div>
        ) : (
          <div className="relative flex justify-center py-8 min-h-[80svh]">
            <RoundedLoader />
          </div>
        )}
      </div>
    </section>
  );
};

export default AddUser;
