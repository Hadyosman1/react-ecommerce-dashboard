/* eslint-disable react/prop-types */
import { TbArrowBackUp } from "react-icons/tb";
import { Link } from "react-router-dom";

const UsersPageHeader = ({ title }) => {
  return (
    <div className="flex justify-between items-center flex-wrap">
      <h1 className="text-3xl font-bold py-1 text-secondarybreakColor border-b-2 border-mainBreakColor">
        {title}
      </h1>
      <Link
        to={"/dashboard/users"}
        className="flex items-center bg-blue-700/80 border px-3 py-1 rounded text-secondarybreakColor transition hover:bg-blue-900 active:scale-95 "
      >
        <TbArrowBackUp className="text-xl" />
        Back
      </Link>
    </div>
  );
};

export default UsersPageHeader;
