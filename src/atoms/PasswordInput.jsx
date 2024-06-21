import { useState } from "react";
import { BiHide } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa6";

const PasswordInput = ({ name, id }) => {
  const [isPassHidden, setIsPassHidden] = useState(true);
  return (
    <div className="password-input-wrapper flex items-center overflow-hidden rounded-md bg-white text-slate-700">
      <input
        name={name}
        id={id}
        placeholder="at least 8 digits"
        type={isPassHidden ? "password" : "text"}
        minLength={8}
        required
        autoComplete="current-password"
        className="block w-full py-1.5 text-gray-900  sm:text-sm sm:leading-6 placeholder:text-gray-400 border-r border-r-slate-300"
      />
      <span
        onClick={() => setIsPassHidden(!isPassHidden)}
        className="text-lg text-slate-600 px-2 cursor-pointer"
      >
        {isPassHidden ? <FaRegEye /> : <BiHide />}
      </span>
    </div>
  );
};

export default PasswordInput;
