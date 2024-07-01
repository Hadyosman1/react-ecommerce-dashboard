import { useDispatch, useSelector } from "react-redux";
import MyInput from "../../atoms/MyInput";
import PageHeader from "../../atoms/PageHeader";
import { useEffect, useState } from "react";
import { getCategories } from "../../store/slices/categoriesSlice";
import { LuImagePlus } from "react-icons/lu";
import { openImageLightBox } from "../../store/slices/imageLightBoxSlice";
import VerySmallSpinner from "../../atoms/VerySmallSpinner";
import checkFileSize from "../../utils/checkFileSize";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../store/slices/productsSlice";
import RoundedLoader from "../../atoms/RoundedLoader";

const AddProduct = () => {
  const [image, setImage] = useState({});
  const [warningMessage, setWarningMessage] = useState("");

  const { categories, isPending } = useSelector(
    (state) => state.categoriesSlice
  );

  const { isPending: isProductsPending } = useSelector(
    (state) => state.productsSlice
  );

  const { user } = useSelector((state) => state.authSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkFileSize(image) && image.name) {
      return false;
    }

    const myForm = e.target;
    const formData = new FormData();
    formData.append("title", myForm.title.value);
    formData.append("description", myForm.description.value);
    formData.append("category", myForm.category.value);
    formData.append("price", myForm.price.value);
    formData.append("rating.rate", myForm.rate.value);
    formData.append("rating.count", myForm.count.value);

    if (image.name) {
      formData.append("image", image);
    }

    dispatch(addProduct({ formData, navigate, token: user.token }));
  };

  return (
    <section className="flex flex-col gap-6">
      <PageHeader redirectTo={"/dashboard/products"} title={"Add Product"} />

      <div className="py-8">
        {!isProductsPending ? (
          <div className="max-w-lg mx-auto  bg-white  rounded-lg shadow-md px-4 py-6 md:p-8 flex flex-col items-center">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-3"
            >
              <div className="flex items-start flex-col justify-start gap-2">
                <label
                  htmlFor="title"
                  className="text text-mainBreakColor  mr-2"
                >
                  Title:
                </label>
                <MyInput
                  readOnly={true}
                  type="text"
                  id="title"
                  required={true}
                  name="title"
                  placeholder={
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                  }
                />
              </div>

              <div className="flex items-start flex-col justify-start gap-2">
                <label
                  htmlFor="description"
                  className="text text-mainBreakColor  mr-2"
                >
                  Description:
                </label>
                <textarea
                  className="w-full max-h-36 min-h-20 p-2 rounded border border-slate-300 focus:ring-1  focus:outline-none focus:ring-mainBreakColor placeholder:italic"
                  id="description"
                  required={true}
                  name="description"
                  placeholder={
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                  }
                />
              </div>

              <div className="flex items-start flex-col justify-start gap-2">
                <label
                  htmlFor="category"
                  className=" text-mainBreakColor  mr-2"
                >
                  Category:
                </label>
                {!isPending ? (
                  <select
                    className="w-full text-mainBreakColor p-1.5 rounded border border-slate-300 focus:ring-1  focus:outline-none focus:ring-mainBreakColor"
                    name="category"
                    id="category"
                  >
                    {categories.map((category) => (
                      <option value={category.name} key={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <VerySmallSpinner color={"mainBreakColor"} />
                )}
              </div>

              <div className="relative flex items-start flex-col justify-start gap-2">
                <label
                  htmlFor="image"
                  className="text text-mainBreakColor  mr-2"
                >
                  Image:
                </label>
                <div className="upload w-full relative items-center gap-2  font-semibold flex px-2 py-1.5 border border-gray-300 rounded-md text-sky-500/80 cursor-pointer">
                  <LuImagePlus className="text-sky-400 text-2xl " /> Upload
                  Image
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    accept="image/*"
                    id="image"
                    name="image"
                    className="w-full h-full rotate-180 opacity-0 cursor-pointer  absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
                {image?.name && (
                  <div
                    className={`
                  flex justify-center
                  w-full transition
                  lg:w-[initial]
                  lg:absolute left-0 
                  top-1/2 lg:-translate-x-[114%] 
                  lg:-translate-y-[40%] cursor-default
                  rounded-lg mt-4
                  lg:mt-0
                  lg:after:[content:''] 
                  lg:after:z-500
                  lg:after:absolute
                  lg:after:right-0
                  lg:after:top-1/2
                  lg:after:translate-x-full
                  lg:after:-translate-y-1/2
                  lg:after:border-[12px]
                  lg:after:border-transparent
                  lg:after:border-l-slate-500
                  `}
                  >
                    <img
                      onClick={() =>
                        dispatch(
                          openImageLightBox({
                            image: URL.createObjectURL(image),
                          })
                        )
                      }
                      className="max-h-52 cursor-pointer lg:max-w-40 lg:max-h-32 bg-slate-100 rounded border-2 border-slate-400"
                      src={URL.createObjectURL(image)}
                      alt="avatar"
                    />
                  </div>
                )}
              </div>

              <div className=" flex items-start flex-col justify-start gap-2">
                <label
                  htmlFor="price"
                  className="text text-mainBreakColor  mr-2"
                >
                  Price:
                </label>
                <MyInput
                  id="price"
                  placeholder="123 $"
                  type={"number"}
                  name="price"
                  required={true}
                />
              </div>

              <div className=" flex items-start flex-col justify-start gap-2">
                <label
                  htmlFor="rate"
                  className="text text-mainBreakColor  mr-2"
                >
                  Rate:
                </label>
                <MyInput
                  onChange={(e) => {
                    if (+e.target.value > 10) {
                      setWarningMessage(
                        "you cant set number greater than 10...👌"
                      );
                      e.target.value = 10;
                    } else {
                      setWarningMessage("");
                    }
                  }}
                  id="rate"
                  placeholder="initial rate from 10"
                  type={"number"}
                  name="rate"
                  required={true}
                  max={"10"}
                />
                {warningMessage && (
                  <span className="text-red-600">{warningMessage}</span>
                )}
              </div>

              <div className=" flex items-start flex-col justify-start gap-2">
                <label
                  htmlFor="count"
                  className="text text-mainBreakColor  mr-2"
                >
                  Count:
                </label>
                <MyInput
                  id="count"
                  placeholder="5 | 50 | 100 for example"
                  type={"number"}
                  name="count"
                  required={true}
                />
              </div>

              <button
                disabled={isPending}
                type="submit"
                className="flex items-center mt-4 justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-medium py-1.5 px-4 rounded-lg shadow-md"
              >
                {isPending && <VerySmallSpinner />} Submit
              </button>
            </form>
          </div>
        ) : (
          <div className="relative flex justify-center py-8 min-h-[80svh]">
            <RoundedLoader />
          </div>
        )}
      </div>
    </section>
  );
};

export default AddProduct;
