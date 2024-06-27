/* eslint-disable react/prop-types */

import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const DescTableTd = ({ description }) => {
  const [isDescVisible, setIsDescVisible] = useState(false);

  const handleShow = (e) => {
    setIsDescVisible(true);

    let elements = document.querySelectorAll(".absolute_desc");
    elements.forEach((element) => {
      element.classList.remove("show");
    });

    e.target.nextElementSibling.classList.add("show");
  };

  return (
    <td className="">
      <div className="relative max-w-80">
        <p className="line-clamp-4 ">{description}</p>
        <span
          onClick={handleShow}
          className="inline-block text-mainBreakColor cursor-pointer"
        >
          Read All
        </span>
        <p className={`${isDescVisible && "show"} absolute_desc `}>
          <span className="max-w-full p-3 block break-words">{description}</span>
          <span
            onClick={() => setIsDescVisible(false)}
            className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3  text-2xl bg-red-700  rounded-full"
          >
            <IoCloseCircleOutline className="cursor-pointer text-white" />
          </span>
        </p>
      </div>
    </td>
  );
};

export default DescTableTd;
