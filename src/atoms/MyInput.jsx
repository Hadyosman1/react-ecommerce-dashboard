/* eslint-disable react/prop-types */

const MyInput = ({
  type,
  name,
  id,
  placeholder,
  autoComplete,
  required,
  max,
}) => {
  return (
    <input
      max={max}
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required || false}
      className="
      w-full px-2 
    placeholder:text-gray-400 
      py-1 rounded-md border
    border-gray-300
      focus:outline-none focus:ring-1
      focus:ring-sky-400 
      sm:text-sm sm:leading-6
      "
    />
  );
};

export default MyInput;
