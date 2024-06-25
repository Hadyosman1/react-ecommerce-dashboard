import { useDispatch, useSelector } from "react-redux";
import Table from "../../atoms/Table";
import { useEffect } from "react";
import { getUsers } from "../../store/slices/usersSlice";
import RoundedLoader from "../../atoms/RoundedLoader";
import { Link } from "react-router-dom";

//icons
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineAttachEmail } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { FaRegAddressCard } from "react-icons/fa";
import { FaGears, FaRegTrashCan } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import { LuFolderEdit } from "react-icons/lu";
import { openModal } from "../../store/slices/modalSlice";
import { openImageLightBox } from "../../store/slices/imageLightBoxSlice";

const tableHeader = [
  { name: "User Name", icon: <MdOutlineDriveFileRenameOutline /> },
  { name: "Email", icon: <MdOutlineAttachEmail /> },
  { name: "Avatar", icon: <RxAvatar /> },
  { name: "Role", icon: <FaRegAddressCard /> },
  { name: "Controllers", icon: <FaGears /> },
];

const UsersRoot = () => {
  const { users, isPending } = useSelector((state) => state.usersSlice);
  const { user: CurrentUser } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers({ token: CurrentUser.token }));
    }
  }, [dispatch, CurrentUser, users]);

  return (
    <>
      <section className="flex flex-col gap-6 ">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold  py-1 text-secondarybreakColor border-b-2 border-mainBreakColor">
            Users
          </h1>
          <Link
            to="add_user"
            className="flex items-center gap-1 bg-green-800 border px-3 py-1 rounded text-secondarybreakColor transition hover:bg-green-900 active:scale-95 "
          >
            <IoAddCircleOutline className="text-xl" /> Add User
          </Link>
        </div>

        {!isPending ? (
          <Table tHeadItems={tableHeader}>
            {users.map((user) => {
              if (user._id === CurrentUser._id) {
                return;
              }

              return (
                <tr
                  key={user._id}
                  className="border-b border-slate-400 *:px-1 *:py-2  *:md:px-2 *:md:py-3 "
                >
                  <td className="">
                    {user.firstName} {user.lastName}
                  </td>
                  <td>
                    <p>{user.email}</p>
                  </td>
                  <td className="flex justify-center items-center">
                    <img
                      onClick={() =>
                        dispatch(openImageLightBox({ image: user.avatar }))
                      }
                      className="cursor-pointer max-w-16 sm:max-w-20 md:max-w-32 aspect-square object-contain "
                      src={user.avatar}
                      alt="user"
                    />
                  </td>
                  <td
                    className={`font-bold ${
                      (user.role === "MANAGER" || user.role === "ADMIN") &&
                      "text-mainBreakColor"
                    }`}
                  >
                    {user.role}
                  </td>
                  <td className="">
                    <div className="flex gap-1 flex-col  mx-auto max-w-20 md:max-w-32">
                      <Link
                        to={`edit/${user._id}`}
                        className="active:scale-95 shadow shadow-slate-400 flex flex-grow gap-1 items-center justify-center border border-slate-400 px-2 py-1 rounded bg-sky-600 text-white hover:bg-sky-700"
                      >
                        <span>
                          <LuFolderEdit />
                        </span>
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          dispatch(
                            openModal({
                              button: "deleteUser",
                              Info: { id: user._id, token: user.token },
                              title: "Are You Sure ?",
                              body: "If You deleted This User You Can't Undo This Action...🤔",
                            })
                          )
                        }
                        className="active:scale-95 shadow shadow-slate-400 flex  gap-1 items-center justify-center border  border-slate-400 px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        <span>
                          <FaRegTrashCan />
                        </span>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </Table>
        ) : (
          <div className="relative flex justify-center py-8 min-h-[80svh]">
            <RoundedLoader />
          </div>
        )}
      </section>
    </>
  );
};

export default UsersRoot;
