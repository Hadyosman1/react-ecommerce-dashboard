/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import VerySmallSpinner from "../../atoms/VerySmallSpinner";
import { deleteCategory } from "../../store/slices/categoriesSlice";

const AcceptDeleteCategoryBtn = ({ id, token }) => {
  const { isPending } = useSelector((state) => state.categoriesSlice);
  const dispatch = useDispatch();
  return (
    <button
      disabled={isPending}
      onClick={() => dispatch(deleteCategory({ id, token }))}
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

export default AcceptDeleteCategoryBtn;
