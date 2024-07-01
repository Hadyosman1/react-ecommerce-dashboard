import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../store/slices/modalSlice";
import AcceptDeleteUserBtn from "../layouts/users-layout/AcceptDeleteUserBtn";
import AcceptDeleteProductBtn from "../layouts/products-layout/AcceptDeleteProductBtn";
import AcceptDeleteCategoryBtn from "../layouts/categories-layout/AcceptDeleteCategoryBtn";
import { LuImagePlus } from "react-icons/lu";
import { useState } from "react";
import UpdateAvatarBtn from "../layouts/profile-layout/UpdateAvatarBtn";

const MyModal = () => {
  const {
    isModalVisible,
    title,
    body,
    button,
    Info: { id, token },
    status,
  } = useSelector((state) => state.modalSlice);
  const [uploadedImage, setUploadedImage] = useState({});
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        setUploadedImage({});
        dispatch(closeModal());
      }}
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
            onClick={() => {
              setUploadedImage({});
              dispatch(closeModal());
            }}
            className="cursor-pointer text-2xl text-slate-500 transition hover:text-slate-900"
          />
        </div>

        <div className=" border-b-2 bodrer-slate-700">
          <div
            className={`${
              button.includes("delete") ? " text-red-700 " : " text-slate-700 "
            } font-semibold py-2 `}
          >
            {body === "fileInput" ? (
              <div className="relative flex items-start flex-col justify-start">
                <label
                  htmlFor="avatar"
                  className="text-sm text-mainBreakColor mr-2"
                >
                  Avatar:
                </label>
                <div className="upload w-full relative items-center gap-2  font-semibold flex px-2 py-1 border border-gray-300 rounded-md text-sky-500/80 cursor-pointer">
                  <LuImagePlus className="text-sky-400 text-2xl " /> Upload
                  Avatar
                  <input
                    onChange={(e) => {
                      setUploadedImage(e.target.files[0]);
                    }}
                    type="file"
                    accept="image/*"
                    id="avatar"
                    name="avatar"
                    className="w-full h-full rotate-180 opacity-0 cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
                {uploadedImage?.name && (
                  <div
                    className={`
                    flex justify-center
                    w-full transition
                    rounded-lg mt-4
                    `}
                  >
                    <img
                      className=" max-h-52 bg-slate-100 rounded border-2 border-slate-400"
                      src={URL.createObjectURL(uploadedImage)}
                      alt="avatar"
                    />
                  </div>
                )}
              </div>
            ) : (
              body
            )}
          </div>
        </div>

        <div className="flex justify-end items-center gap-1">
          <button
            onClick={() => {
              dispatch(closeModal());
              setUploadedImage({});
            }}
            className="bg-slate-600 text-white px-3 py-1 rounded transition hover:bg-slate-700"
          >
            Close
          </button>
          {button === "deleteUser" && (
            <AcceptDeleteUserBtn id={id} token={token} status={status} />
          )}
          {button === "deleteProduct" && (
            <AcceptDeleteProductBtn id={id} token={token} />
          )}
          {button === "deleteCategory" && (
            <AcceptDeleteCategoryBtn id={id} token={token} />
          )}
          {button === "UpdataAvatar" && (
            <UpdateAvatarBtn id={id} token={token} data={uploadedImage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyModal;
