/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiHide } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa6";

const PasswordInput = ({ name, id, confirmPassError, setConfirmPassError }) => {
  const [isPassHidden, setIsPassHidden] = useState(true);
  return (
    <div
      className={`password-input-wrapper border border-slate-300 w-full flex items-center overflow-hidden rounded-md bg-white text-slate-700 ${
        confirmPassError && " border-red-600 "
      }`}
    >
      <input
        onFocus={
          setConfirmPassError
            ? () => setConfirmPassError("")
            : () => console.log()
        }
        onChange={
          setConfirmPassError
            ? () => setConfirmPassError("")
            : () => console.log()
        }
        name={name}
        id={id}
        placeholder="at least 8 digits"
        type={isPassHidden ? "password" : "text"}
        minLength={8}
        required
        autoComplete="current-password"
        className={`block w-full py-[4.5px] text-gray-900  sm:text-sm sm:leading-6 placeholder:text-gray-400 border-r border-r-slate-300 ${
          confirmPassError && " border-r-red-600 "
        }`}
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
