/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../store/slices/productsSlice";
import VerySmallSpinner from "../../atoms/VerySmallSpinner";


const AcceptDeleteProductBtn = ({ id, token }) => {
  const dispatch = useDispatch();
  const { isPending } = useSelector((state) => state.productsSlice);
  
  return (
    <button
      disabled={isPending}
      onClick={() => dispatch(deleteProduct({ id, token }))}
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

export default AcceptDeleteProductBtn;
