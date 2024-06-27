import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../atoms/PageHeader";
import MyInput from "../../atoms/MyInput";
import VerySmallSpinner from "../../atoms/VerySmallSpinner";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../store/slices/categoriesSlice";
import { useEffect, useState } from "react";

const EditCategory = () => {
  const { id } = useParams();
  const { categories, isPending } = useSelector(
    (state) => state.categoriesSlice
  );
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = categories.find((cat) => cat._id === id);
  const [formInputsData, setFormInputsData] = useState(category);

  useEffect(() => {
    if (!category) {
      navigate("/dashboard/categories");
    }
  }, [category, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateCategory({
        id,
        data: { name: formInputsData.name },
        navigate,
        token: user.token,
      })
    );
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        redirectTo={"/dashboard/categories"}
        title={"Edit Category"}
      />
      <div className="py-8">
        <div className="max-w-lg mx-auto  bg-white  rounded-lg shadow-md px-4 py-6 md:p-8 flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <div className="flex items-start flex-col justify-start gap-2">
              <label
                htmlFor="category"
                className="text text-mainBreakColor  mr-2"
              >
                Category:
              </label>
              <MyInput
                onChange={(e) =>
                  setFormInputsData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                value={formInputsData?.name}
                type="text"
                id="category"
                required={true}
                name="category"
                placeholder={"Electronic"}
              />
            </div>

            <button
              disabled={isPending}
              type="submit"
              className="flex items-center mt-3 justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-medium py-1.5 px-4 rounded-lg shadow-md"
            >
              {isPending && <VerySmallSpinner />} Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditCategory;
