import { useDispatch, useSelector } from "react-redux";
import { closeImageLightBox } from "../store/slices/imageLightBoxSlice";
import { IoCloseSharp } from "react-icons/io5";

const ImageLightBox = () => {
  const { isImageLightBoxVisible, image } = useSelector(
    (state) => state.imageLightBoxSlice
  );
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(closeImageLightBox())}
      className={`fixed w-full h-full py-16 bg-black/65 flex justify-center items-center z-50 transition duration-[0.6s] overflow-y-auto  ${
        !isImageLightBoxVisible && "opacity-0 translate-x-[120%]"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[300px] sm:w-[60vw] md:w-[42vw] lg:w-[38vw] max-w-lg flex flex-col justify-center gap-2 py-6 "
      >
        <div className="flex justify-end">
          <IoCloseSharp
            className="cursor-pointer text-3xl text-white hover:text-slate-300"
            onClick={() => dispatch(closeImageLightBox())}
          />
        </div>
        <img
          className="w-full rounded-md bg-white object-contain max-h-[350px]"
          src={image}
          alt={image}
        />
      </div>
    </div>
  );
};

export default ImageLightBox;
