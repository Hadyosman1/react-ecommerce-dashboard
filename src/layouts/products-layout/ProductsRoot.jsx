import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../store/slices/productsSlice";
import RoundedLoader from "../../atoms/RoundedLoader";
import Table from "../../atoms/Table";

// icons
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaGears, FaRegTrashCan } from "react-icons/fa6";
import { LuFolderEdit, LuSubtitles } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { IoImagesOutline } from "react-icons/io5";
import { BiDollar } from "react-icons/bi";
import { RiStarHalfFill } from "react-icons/ri";
import { RiNumbersLine } from "react-icons/ri";
import { openImageLightBox } from "../../store/slices/imageLightBoxSlice";
import DescTableTd from "./DescTableTd";
import { openModal } from "../../store/slices/modalSlice";

const tableHeader = [
  { name: "Title", icon: <LuSubtitles /> },
  { name: "Description", icon: <MdOutlineDriveFileRenameOutline /> },
  { name: "Category", icon: <BiCategory /> },
  { name: "Image", icon: <IoImagesOutline /> },
  { name: "Price", icon: <BiDollar /> },
  { name: "Rate", icon: <RiStarHalfFill /> },
  { name: "Count", icon: <RiNumbersLine /> },
  { name: "Controllers", icon: <FaGears /> },
];

const ProductsRoot = () => {
  const { products, isPending } = useSelector((state) => state.productsSlice);
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold  py-1 text-secondarybreakColor border-b-2 border-mainBreakColor">
          Products
        </h1>
        <Link
          to="add_product"
          className="flex items-center gap-1 bg-green-800 border px-3 py-1 rounded text-slate-200 transition hover:bg-green-900 active:scale-95 "
        >
          <IoAddCircleOutline className="text-xl" /> Add Product
        </Link>
      </div>

      {!isPending ? (
        <Table tHeadItems={tableHeader}>
          {products.toReversed().map((pro) => (
            <tr
              key={pro._id}
              className="border-b border-slate-400 *:px-1 *:py-2  *:md:px-2 *:md:py-3 "
            >
              <td className="">{pro.title}</td>
              <DescTableTd description={pro.description} />
              <td className="whitespace-nowrap">{pro.category}</td>
              <td>
                <div className="flex justify-center items-center">
                  <img
                    onClick={() =>
                      dispatch(openImageLightBox({ image: pro.image }))
                    }
                    className="cursor-pointer max-w-16 sm:max-w-20 md:max-w-32 aspect-square object-contain "
                    src={pro.image}
                    alt="user"
                  />
                </div>
              </td>
              <td className={`font-bold text-emerald-700 text-xl`}>
                {pro.price}$
              </td>
              <td className="">{pro.rating.rate}</td>
              <td className="">{pro.rating.count}</td>

              <td className="">
                <div className="flex gap-1 flex-wrap items-center justify-center mx-auto max-w-20 md:max-w-32">
                  <Link
                    to={`edit/${pro._id}`}
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
                          button: "deleteProduct",
                          Info: { id: pro._id, token: user.token },
                          title: "Are You Sure ?",
                          body: "If You deleted This product You Can't Undo This Action...🤔",
                        })
                      )
                    }
                    className="active:scale-95 shadow shadow-slate-400 flex flex-grow gap-1 items-center justify-center border border-slate-400 px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    <span>
                      <FaRegTrashCan />
                    </span>
                    Delete
                  </button>
                </div>
              </td>
              
            </tr>
          ))}
        </Table>
      ) : (
        <div className="relative flex justify-center py-8 min-h-[80svh]">
          <RoundedLoader />
        </div>
      )}
    </section>
  );
};

export default ProductsRoot;
