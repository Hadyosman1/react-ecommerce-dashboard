const SmallLoadingSpinner = () => {
  return (
    <div className="fixed z-50 flex items-center justify-center bg-slate-600/80 inset-0 ">
      <div className=" flex flex-row gap-2 ">
        <div className="w-4 h-4 rounded-full bg-sky-800 shadow shadow-white animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-sky-800 shadow shadow-white animate-bounce  [animation-delay:-.1s]"></div>
        <div className="w-4 h-4 rounded-full bg-sky-800 shadow shadow-white animate-bounce  [animation-delay:-.3s]"></div>
      </div>
    </div>
  );
};

export default SmallLoadingSpinner;
