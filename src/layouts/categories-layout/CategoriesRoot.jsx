import { useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "../../store/slices/categoriesSlice";
import Table from "../../atoms/Table";
import RoundedLoader from "../../atoms/RoundedLoader";

// -------------- icons  ---------------
import { BiCategory } from "react-icons/bi";
import { FaGears, FaRegTrashCan } from "react-icons/fa6";
import { LuFolderEdit } from "react-icons/lu";
import { openModal } from "../../store/slices/modalSlice";

const tableHeader = [
  { name: "Category", icon: <BiCategory /> },
  { name: "Controllers", icon: <FaGears /> },
];

const CategoriesRoot = () => {
  const { categories, isPending } = useSelector(
    (state) => state.categoriesSlice
  );

  const { user } = useSelector((state) => state.authSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold  py-1 text-secondarybreakColor border-b-2 border-mainBreakColor">
          Categories
        </h1>
        <Link
          to="add_category"
          className="flex items-center gap-1 bg-green-800 border px-3 py-1 rounded text-slate-200 transition hover:bg-green-900 active:scale-95 "
        >
          <IoAddCircleOutline className="text-xl" /> Add Category
        </Link>
      </div>

      {!isPending ? (
        <div className="w-[300px] sm:w-96 md:w-[500px]  mx-auto">
          <Table tHeadItems={tableHeader}>
            {categories.map((cat) => (
              <tr className="*:py-6 px-4" key={cat._id}>
                <td>{cat.name}</td>
                <td className="">
                  <div className="flex gap-1 flex-wrap items-center justify-center mx-auto max-w-20 md:max-w-32">
                    <Link
                      to={`edit/${cat._id}`}
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
                            button: "deleteCategory",
                            Info: { id: cat._id, token: user.token },
                            title: "Are You Sure ?",
                            body: `
                            If You Deleted This Category You Can't Undo This Action...🤔 
                            `,
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
        </div>
      ) : (
        <div className="relative flex justify-center py-8 min-h-[80svh]">
          <RoundedLoader />
        </div>
      )}
    </section>
  );
};

export default CategoriesRoot;
