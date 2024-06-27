import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../store/slices/modalSlice";
import AcceptDeleteUserBtn from "../layouts/users-layout/AcceptDeleteUserBtn";
import AcceptDeleteProductBtn from "../layouts/products-layout/AcceptDeleteProductBtn";
import AcceptDeleteCategoryBtn from "../layouts/categories-layout/AcceptDeleteCategoryBtn";
const MyModal = () => {
  const {
    isModalVisible,
    title,
    body,
    button,
    Info: { id, token },
  } = useSelector((state) => state.modalSlice);
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(closeModal())}
      className={`fixed inset-0 bg-gray-900/50 flex justify-center items-center z-50 transition duration-[0.6s] ${
        !isModalVisible && " scale-0 translate-y-[-120%] "
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded flex flex-col *:p-3 w-72 md:min-w-96"
      >
        <div className="flex justify-between gap-2 items-center border-b-2 bodrer-slate-700">
          <p className={` text-slate-700 font-semibold`}>{title}</p>
          <IoCloseSharp
            onClick={() => dispatch(closeModal())}
            className="cursor-pointer text-2xl text-slate-500 transition hover:text-slate-900"
          />
        </div>

        <div className=" border-b-2 bodrer-slate-700">
          <p
            className={`${
              button.includes("delete") ? " text-red-700 " : " text-slate-700 "
            } font-semibold py-2 `}
          >
            {body}
          </p>
        </div>

        <div className="flex justify-end items-center gap-1">
          <button
            onClick={() => dispatch(closeModal())}
            className="bg-slate-600 text-white px-3 py-1 rounded transition hover:bg-slate-700"
          >
            Close
          </button>
          {button === "deleteUser" && (
            <AcceptDeleteUserBtn id={id} token={token} />
          )}
          {button === "deleteProduct" && (
            <AcceptDeleteProductBtn id={id} token={token} />
          )}
          {button === "deleteCategory" && (
            <AcceptDeleteCategoryBtn id={id} token={token} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyModal;
