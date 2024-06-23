import { useNavigate, useParams } from "react-router-dom";
import UsersPageHeader from "../../atoms/UsersPageHeader";
import { useDispatch, useSelector } from "react-redux";
import { LuImagePlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import VerySmallSpinner from "../../atoms/VerySmallSpinner";
import { Notyf } from "notyf";
import {
  getSingleUser,
  getUsersRoles,
  updateUser,
} from "../../store/slices/usersSlice";
import RoundedLoader from "../../atoms/RoundedLoader";
const notyf = new Notyf();

const EditUser = () => {
  const { roles, isPending, singleUser } = useSelector(
    (state) => state.usersSlice
  );
  const { user } = useSelector((state) => state.authSlice);
  const { id } = useParams();
  const [formInputsData, setFormInputsData] = useState(singleUser);
  const [uploadedImage, setUploadedImage] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roles.length) {
      dispatch(getUsersRoles({ token: user.token }));
    }
  }, [dispatch, user, roles]);

  useEffect(() => {
    dispatch(getSingleUser({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    setFormInputsData(singleUser);
  }, [singleUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (uploadedImage?.name) {
      const size = uploadedImage.size / 1024 / 100;

      if (size.toFixed() >= 31) {
        return notyf.error("image must be less than 3 MB..!");
      }
    }

    const formData = new FormData();
    formData.append("firstName", formInputsData.firstName);
    formData.append("lastName", formInputsData.lastName);
    formData.append("role", formInputsData.role);
    if (uploadedImage?.name) {
      formData.append("avatar", uploadedImage);
    }

    dispatch(updateUser({ id, formData, token: user.token, navigate }));
  };

  return (
    <section className="text-secondarybreakColor">
      <UsersPageHeader title={"Edit User"} />
      {!isPending ? (
        <div className="max-w-lg mx-auto my-8  bg-white dark:bg-gray-800 rounded-lg shadow-md px-4 py-6 md:px-8 md:py-10 flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="firstName"
                className="text-sm text-mainBreakColor  dark:text-gray-200 mr-2"
              >
                First Name:
              </label>
              <input
                onChange={(e) =>
                  setFormInputsData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                value={formInputsData.firstName}
                placeholder="John"
                type="text"
                required
                id="firstName"
                name="firstName"
                className="w-full px-2 placeholder:text-gray-400  dark:text-gray-200 dark:bg-gray-900 py-1 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-sky-400 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="lastName"
                className="text-sm text-mainBreakColor  dark:text-gray-200 mr-2"
              >
                Last Name:
              </label>
              <input
                onChange={(e) =>
                  setFormInputsData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                value={formInputsData.lastName}
                placeholder="Doe"
                type="text"
                required
                id="lastName"
                name="lastName"
                className="w-full px-2 placeholder:text-gray-400  dark:text-gray-200 dark:bg-gray-900 py-1 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-sky-400 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="email"
                className="text-sm text-sky-800  dark:text-gray-200 mr-2"
              >
                Email:
              </label>
              <input
                readOnly
                value={formInputsData.email}
                placeholder="example@mail.com"
                type="email"
                required
                id="email"
                autoComplete="email"
                name="email"
                className="w-full opacity-70 pointer-events-none px-2 placeholder:text-gray-400  dark:text-gray-200 dark:bg-gray-900 py-1 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-sky-400 sm:text-sm sm:leading-6"
              />
              <span className="text-sm bg-orange-800 p-1 px-2 mt-1 rounded font-semibold">
                {"You Can't Change E-mail"}
              </span>
            </div>

            <div className="relative flex items-start flex-col justify-start">
              <label
                htmlFor="avatar"
                className="text-sm text-mainBreakColor  dark:text-gray-200 mr-2"
              >
                Avatar:
              </label>
              <div className="upload w-full relative items-center gap-2  font-semibold flex px-2 py-1 border border-gray-300 rounded-md text-sky-500/80 cursor-pointer">
                <LuImagePlus className="text-sky-400 text-2xl " /> Upload Avatar
                <input
                  onChange={(e) => {
                    setUploadedImage(e.target.files[0]);
                    setFormInputsData((prev) => ({ ...prev, avatar: "" }));
                  }}
                  type="file"
                  accept="image/*"
                  id="avatar"
                  name="avatar"
                  className="w-full h-full rotate-180 opacity-0 cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              {(formInputsData.avatar || uploadedImage?.name) && (
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
                    className="max-h-52 lg:max-w-40 lg:max-h-32 bg-slate-100 rounded border-2 border-slate-400"
                    src={
                      uploadedImage.name
                        ? URL.createObjectURL(uploadedImage)
                        : formInputsData.avatar
                    }
                    alt="avatar"
                  />
                </div>
              )}
            </div>

            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="role"
                className="text-sm text-mainBreakColor  dark:text-gray-200 mr-2"
              >
                Role:
              </label>
              <select
                onChange={(e) =>
                  setFormInputsData((prev) => ({
                    ...prev,
                    role: e.target.value,
                  }))
                }
                value={formInputsData.role}
                id="role"
                name="role"
                className="w-full cursor-pointer px-2 text-slate-600  dark:text-gray-200 dark:bg-gray-900 py-1 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-sky-400 sm:text-sm sm:leading-6"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
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
    </section>
  );
};

export default EditUser;
