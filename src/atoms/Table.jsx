/* eslint-disable react/prop-types */

const Table = ({ tHeadItems, children }) => {
  return (
    <div className="flex overflow-x-scroll ">
      <table
        className=" 
          border-collapse 
          align-middle text-center 
          flex-grow bg-secondarybreakColor 
          border-slate-400
          "
      >
        <thead className="bg-mainBreakColor text-secondarybreakColor">
          <tr className=" border-b-2 border-slate-400 *:border *:border-slate-300 *:p-1.5 *:md:p-2 ">
            {tHeadItems.map((item) => (
              <th key={item.name}>
                <p className="flex gap-1 items-center justify-center text-ellipsis whitespace-nowrap">
                  <span className="text-lg md:text-2xl">{item.icon}</span>
                  {item.name}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="even:*:bg-gray-300 text-main font-semibold">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
