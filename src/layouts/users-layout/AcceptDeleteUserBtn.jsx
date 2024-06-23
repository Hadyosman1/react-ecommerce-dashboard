/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../store/slices/usersSlice";
import VerySmallSpinner from "../../atoms/VerySmallSpinner";

const AcceptDeleteUserBtn = ({ id, token }) => {
  const dispatch = useDispatch();
  const { isPending } = useSelector((state) => state.usersSlice);

  return (
    <button
      disabled={isPending}
      onClick={() => dispatch(deleteUser({ id, token }))}
      className="
      flex items-center
      justify-center gap-2
      px-2 py-1 rounded 
      transition text-white
    bg-red-500 hover:bg-red-700
      "
    >
      {isPending && <VerySmallSpinner />} Delete
    </button>
  );
};

export default AcceptDeleteUserBtn;
