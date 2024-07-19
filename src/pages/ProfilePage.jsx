/* eslint-disable react-hooks/exhaustive-deps */
import MyInput from "../atoms/MyInput";
import PasswordInput from "../atoms/PasswordInput";
import { useDispatch, useSelector } from "react-redux";

//icons
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit, FaKey } from "react-icons/fa";
import { useEffect, useState } from "react";
import requestFullScreen from "../utils/requestFullScreen";
import { openModal } from "../store/slices/modalSlice";
import RoundedLoader from "../atoms/RoundedLoader";
import { updateUser } from "../store/slices/usersSlice";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.authSlice);
  const { isPending } = useSelector((state) => state.usersSlice);
  const [userInputsData, setUserInputsData] = useState(user);
  const [canEditInfo, setCanEditInfo] = useState(false);
  const [isPasswordFieldsHidden, setIsPasswordFieldsHidden] = useState(true);
  const [confirmPassError, setConfirmPassError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setUserInputsData(user);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = e.target;
    console.log(myForm.oldPass?.value);

    if (
      myForm.confirmPass?.value !== myForm.newPass?.value &&
      !isPasswordFieldsHidden
    ) {
      return setConfirmPassError("Passwords don't match...!");
    }

    const formData = new FormData();
    formData.append("firstName", userInputsData.firstName);
    formData.append("lastName", userInputsData.lastName);

    if (!isPasswordFieldsHidden) {
      formData.append("oldPassword", myForm.oldPass.value);
      formData.append("password", myForm.newPass.value);
    }

    dispatch(updateUser({ id: user._id, status: "currentUser", formData }));
  };

  const handleEditAvatar = () => {
    dispatch(
      openModal({
        isModalVisible: true,
        title: "Update Your Avatar",
        body: "fileInput",
        button: "UpdataAvatar",
        Info: { id: user._id, token: user.token },
      })
    );
  };

  return (
    <>
      <h1 className="w-full text-3xl text-secondarybreakColor font-bold mb-5">
        Profile
      </h1>

      <section className="flex justify-center items-start flex-wrap gap-6 *:rounded *:shadow *:shadow-mainBreakColor">
        <div className="rounded overflow-hidden  self-start flex-grow-[1]">
          <div className="flex flex-col gap-3 p-4 items-center  bg-secondary-200 ">
            <>
              <div className="profile_avatar_div max-w-80 relative  ">
                <img
                  onClick={requestFullScreen}
                  className="w-full h-full object-contain rounded-md shadow cursor-pointer"
                  src={user.avatar}
                  alt={user.firstName}
                />
                <span
                  onClick={handleEditAvatar}
                  className="
                absolute_edit_btn right-2
                absolute p-1.5 rounded-full
                text-mainBreakColor text-2xl
                bg-slate-200 cursor-pointer
                opacity-80 hover:opacity-100
                hover:bg-slate-300 hover:shadow-md  
                bottom-2 transition 
                "
                >
                  <MdOutlineModeEditOutline />
                </span>
              </div>
              <h2 className="text-xl text-secondarybreakColor font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <h3 className="text-lg -mt-2 text-secondarybreakColor font-medium">
                {user.email}
              </h3>
            </>
          </div>
          <button
            onClick={() =>
              dispatch(
                openModal({
                  isModalVisible: true,
                  title: "Are You Sure ...?",
                  body: "If You deleted Your Account You Can't Undo This Action...🤔",
                  button: "deleteUser",
                  Info: { id: user._id, token: user.token },
                  status: "currentUser",
                })
              )
            }
            className="
            flex items-center justify-center
            gap-1 capitalize py-2 w-full
            border-t border-mainBreakColor
            text-white bg-red-700 hover:bg-red-800
            "
          >
            <FaTrashCan /> delete account
          </button>
        </div>

        {/* form */}
        <div className="flex-grow-[6] bg-secondary-200 p-3 sm:p-5 ">
          {!isPending ? (
            <>
              <div className="mb-4 flex gap-4 justify-between items-center flex-wrap">
                <div>
                  <h2 className="text-secondarybreakColor text-2xl font-semibold capitalize">
                    Profile
                  </h2>
                  <h3 className="text-secondarybreakColor capitalize text-lg">
                    user information
                  </h3>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setCanEditInfo((prev) => {
                        if (prev) {
                          setUserInputsData((prev) => ({ ...prev, ...user }));
                          setIsPasswordFieldsHidden(true);
                        }
                        return !prev;
                      });
                    }}
                    className="px-4 py-1 rounded text-white transition bg-sky-700 hover:bg-sky-800 flex items-center justify-center gap-1"
                  >
                    {!canEditInfo ? (
                      <>
                        <FaEdit />
                        Edit
                      </>
                    ) : (
                      <>Revert</>
                    )}
                  </button>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="py-3 px-3 sm:py-8 sm:px-6 border border-mainBreakColor bg-secondary-800 rounded shadow flex flex-col gap-3"
              >
                <fieldset className="flex flex-col gap-1 items-start">
                  <label
                    htmlFor="firstName"
                    className="text-secondarybreakColor"
                  >
                    First Name:
                  </label>
                  <MyInput
                    onChange={(e) =>
                      setUserInputsData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    readOnly={!canEditInfo}
                    value={userInputsData.firstName}
                    type="text"
                    id="firstName"
                    required={true}
                    name="firstName"
                    placeholder={"Jon"}
                  />
                </fieldset>

                <fieldset className="flex flex-col gap-1 items-start">
                  <label
                    htmlFor="lastName"
                    className="text-secondarybreakColor"
                  >
                    Last Name:
                  </label>
                  <MyInput
                    onChange={(e) =>
                      setUserInputsData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    readOnly={!canEditInfo}
                    value={userInputsData.lastName}
                    type="text"
                    id="lastName"
                    required={true}
                    name="lastName"
                    placeholder={"Doe"}
                  />
                </fieldset>

                <fieldset className="flex flex-col gap-1 items-start">
                  <label htmlFor="email" className="text-secondarybreakColor">
                    First Name:
                  </label>
                  <MyInput
                    readOnly={true}
                    defaultValue={user.email}
                    type="email"
                    id="email"
                    required={true}
                    name="email"
                  />
                  <span className="text-sm bg-orange-800 text-white p-1 px-2 mt-1 rounded font-semibold w-fit">
                    {"You Can't Change E-mail"}
                  </span>
                </fieldset>

                {canEditInfo && (
                  <button
                    onClick={() =>
                      setIsPasswordFieldsHidden(!isPasswordFieldsHidden)
                    }
                    type="button"
                    className="ml-auto px-2.5 py-1 rounded text-white transition bg-sky-700 hover:bg-sky-800 flex items-center justify-center gap-1"
                  >
                    {isPasswordFieldsHidden ? (
                      <>
                        <FaKey /> Change Password
                      </>
                    ) : (
                      <>Revert Password</>
                    )}
                  </button>
                )}

                {!isPasswordFieldsHidden && canEditInfo && (
                  <>
                    <fieldset className="flex flex-col gap-1 items-start">
                      <label
                        htmlFor="oldPass"
                        className="text-secondarybreakColor "
                      >
                        Old Password:
                      </label>
                      <PasswordInput id={"oldPass"} name={"oldPass"} />
                    </fieldset>

                    <fieldset className="flex flex-col gap-1 items-start">
                      <label
                        htmlFor="newPass"
                        className="text-secondarybreakColor "
                      >
                        New Password:
                      </label>
                      <PasswordInput id={"newPass"} name={"newPass"} />
                    </fieldset>

                    <fieldset className="flex flex-col gap-1 items-start">
                      <label
                        htmlFor="confirmPass"
                        className="text-secondarybreakColor "
                      >
                        Confirm New Password:
                      </label>
                      <PasswordInput
                        confirmPassError={confirmPassError}
                        setConfirmPassError={setConfirmPassError}
                        id={"confirmPass"}
                        name={"confirmPass"}
                      />
                      <span className="text-red-600">{confirmPassError}</span>
                    </fieldset>
                  </>
                )}

                {canEditInfo && (
                  <button
                    type="submit"
                    className="mt-4 px-2.5 py-1 rounded text-white transition bg-sky-700 hover:bg-sky-800 flex items-center justify-center gap-1"
                  >
                    submit
                  </button>
                )}
              </form>
            </>
          ) : (
            <div className="relative flex justify-center py-8 min-h-[80svh]">
              <RoundedLoader />
            </div>
          )}
        </div>
        {/* form */}
      </section>
    </>
  );
};

export default ProfilePage;
