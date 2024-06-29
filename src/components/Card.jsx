
/* eslint-disable react/prop-types */
const Card = ({
  bg,
  title,
  subTitle,
  subTitleColor,
  number,
  anchorText,
  icon,
  iconColor,
  iconBg,
  shadow
}) => {
  return (
    <div
      className={`shadow-md transition hover:-translate-y-1  ${shadow} ${bg}  p-4 rounded place-content-center`}
    >
      <p className="flex justify-between items-center flex-wrap-reverse  gap-2">
        <span className={` text-white flex-shrink-0  font-medium uppercase`}>{title}</span>
        <span className={`flex items-center gap-2 text-lg font-semibold ${subTitleColor}`}>
          {subTitle}
        </span>
      </p>
      <h5 className={`text-2xl font-bold text-white mt-3`}>{number}</h5>
      <div className="flex justify-between items-end">
        <p
          className={`text-white/80 underline cursor-pointer hover:[filter:brightness(120%)]`}
        >
          {anchorText}
        </p>
        <p className={`${iconBg} p-2 rounded hover:[filter:brightness(120%)]`}>
          <span className={` ${iconColor} text-2xl`}>{icon}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
