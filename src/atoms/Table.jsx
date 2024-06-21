/* eslint-disable react/prop-types */
const Table = ({ tHeadItems, tBodyItems }) => {
  return (
    <>
      <div className="max-w-full overflow-x-auto">
        <table className="border-collapse align-middle shadow-md shadow-slate-600 text-center w-full bg-secondarybreakColor border-b- border-slate-600  ">
          <thead className="bg-mainBreakColor text-secondarybreakColor">
            <tr className="border-b-2 border-slate-600 *:p-2 ">
              {tHeadItems.map((item) => (
                <th key={item} className="">
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="even:*:bg-gray-300 text-main font-semibold">
            {tBodyItems.map((user) => (
              <tr
                key={user._id}
                className="border-b border-slate-600 *:px-2 *:py-1.5"
              >
                <td className="">{user.firstName}</td>
                <td className="">{user.lastName}</td>
                <td className="">{user.email}</td>
                <td className="flex justify-center items-center">
                  <img
                    className="max-w-20 aspect-square object-contain "
                    src={user.avatar}
                    alt=""
                  />
                </td>
                <td className="">{user.role}</td>
                <td className="">
                  <div className="flex gap-1 items-center justify-center">
                    <button className="border min-w-[60px] border-slate-400 px-2 py-1 rounded bg-sky-700 text-white hover:bg-sky-800">
                      Edit
                    </button>
                    <button className="border min-w-[60px] border-slate-400 px-2 py-1 rounded bg-red-700 text-white hover:bg-red-800">
                     Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
