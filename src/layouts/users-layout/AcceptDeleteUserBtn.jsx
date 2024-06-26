/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../store/slices/usersSlice";
import VerySmallSpinner from "../../atoms/VerySmallSpinner";
import { useNavigate } from "react-router-dom";

const AcceptDeleteUserBtn = ({ id, token, status }) => {
  const dispatch = useDispatch();
  const { isPending } = useSelector((state) => state.usersSlice);
  const navigate = useNavigate();

  return (
    <button
      disabled={isPending}
      onClick={() => dispatch(deleteUser({ id, token, status, navigate }))}
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
