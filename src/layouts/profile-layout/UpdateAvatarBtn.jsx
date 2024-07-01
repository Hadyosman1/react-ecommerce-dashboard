/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import VerySmallSpinner from "../../atoms/VerySmallSpinner";
import { updateUser } from "../../store/slices/usersSlice";

const UpdateAvatarBtn = ({ id, token, data }) => {
  const { isPending } = useSelector((state) => state.usersSlice);
  const dispatch = useDispatch();
  const formData = new FormData();
  formData.append("avatar", data);
  return (
    <button
      disabled={isPending}
      onClick={() => dispatch(updateUser({ id, token, formData,status:"currentUser" }))}
      className="
      flex items-center
      justify-center gap-2
      px-2 py-1 rounded 
      transition text-white
      bg-sky-600 hover:bg-sky-700
      "
    >
      {isPending && <VerySmallSpinner />} Update
    </button>
  );
};

export default UpdateAvatarBtn;
