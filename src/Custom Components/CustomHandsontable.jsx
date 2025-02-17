// import React, { useState, useRef } from "react";
// import { IoMdMenu } from "react-icons/io";
// import { useSelector } from "react-redux";

// const CustomHandsontable = ({ columns, rows, onEdit, name = "Table Details" }) => {
//   const [data, setData] = useState(rows);
//   const [activeCell, setActiveCell] = useState({ row: null, col: null });
//   const [hoveredRow, setHoveredRow] = useState(null);
//   const inputRef = useRef(null);
//   const activeTheme = useSelector((state) => state.theme.activeTheme);

//   // Handle cell edit
//   const handleEdit = (rowIndex, field, value) => {
//     const newData = data.map((row, i) =>
//       i === rowIndex ? { ...row, [field]: value } : row
//     );
//     setData(newData);
//     if (onEdit) onEdit(newData);
//   };

//   // Handle keyboard navigation
//   const handleKeyDown = (e, rowIndex, colIndex) => {
//     let newRow = rowIndex,
//       newCol = colIndex;
//     if (e.key === "ArrowDown") newRow = Math.min(rowIndex + 1, data.length - 1);
//     if (e.key === "ArrowUp") newRow = Math.max(rowIndex - 1, 0);
//     if (e.key === "ArrowRight") newCol = Math.min(colIndex + 1, columns.length - 1);
//     if (e.key === "ArrowLeft") newCol = Math.max(colIndex - 1, 0);
//     setActiveCell({ row: newRow, col: newCol });
//     setTimeout(() => inputRef.current?.focus(), 0);
//   };

//   return (
//     <div className="pt-0 w-full">
//       <div
//         className="w-full h-[0.10rem]"
//         style={{ background: activeTheme?.menuColor }}
//       ></div>
//       <div
//         className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
//         style={{ background: activeTheme?.blockColor }}
//       >
//         <IoMdMenu className="font-semibold text-lg" />
//         <div>{name}</div>
//       </div>

//       <div className="overflow-x-auto">
//         <div
//           className="overflow-auto max-w-full max-h-[500px] "
//           style={{ overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           <table className="border-collapse  w-full text-center">
//             <thead
//               className=""
//               style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
//             >
//               <tr>
//                 {columns.map((col, colIndex) => (
//                   <th
//                     key={colIndex}
//                     className=" text-xxs"
//                     style={{ flex: col.flex || undefined, width: col.width || "auto", minWidth: "100px" }}
//                   >
//                     {col.headerName}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row, rowIndex) => (
//                 <tr
//                   key={rowIndex}
//                   className={`cursor-pointer font-semibold`}
//                   onMouseEnter={() => setHoveredRow(rowIndex)}
//                   onMouseLeave={() => setHoveredRow(null)}
//                 >
//                   {columns.map((col, colIndex) => (
//                     <td
//                       key={colIndex}
//                       className="  text-xxs"
//                       style={{ flex: col.flex || undefined, width: col.width || "auto", minWidth: "100px" }}
//                     >
//                       {col.renderCell ? (
//                         col.renderCell({ value: row[col.field], row, rowIndex })
//                       ) : col.options ? (
//                         <select
//                           value={row[col.field] || ""}
//                           onChange={(e) => handleEdit(rowIndex, col.field, e.target.value)}
//                           onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
//                           className="w-full border-none outline-none"
//                           disabled={!col.editable}
//                         >
//                           {col.options.map((option, i) => (
//                             <option key={i} value={option}>{option}</option>
//                           ))}
//                         </select>
//                       ) : (
//                         <input
//                           ref={
//                             activeCell.row === rowIndex && activeCell.col === colIndex ? inputRef : null
//                           }
//                           type={col.type || "text"}
//                           value={row[col.field] || ""}
//                           onChange={(e) => handleEdit(rowIndex, col.field, e.target.value)}
//                           onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
//                           className={`w-full text-center border-none outline-none `}
//                         //   style={{ backgroundColor: activeCell.row === rowIndex && activeCell.col === colIndex ? activeTheme?.menuColor : "" }}
//                           onFocus={() => setActiveCell({ row: rowIndex, col: colIndex })}
//                           disabled={!col.editable}
//                         />
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomHandsontable;


import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";

const CustomHandsontable = ({
  rows,
  columns,
  loading,
  showDetails = true,
  trstyle,
  tableStyle,
  name = "Table Details",
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [isHoveredTable, setIsHoveredTable] = useState(null);

  return (
    <div className="pt-0 w-full">
      <div
        className="w-full h-[0.10rem]"
        style={{ background: activeTheme?.menuColor }}
      ></div>
      {showDetails && (
        <div
          className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
          style={{ background: activeTheme?.blockColor }}
        >
          <IoMdMenu className="font-semibold text-lg" />
          <div>{name}</div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-4 text-gray-500">Loading...</div>
      ) : (
        <div
          style={{
            ...tableStyle,
            overflowY: "auto", // Ensures vertical scrolling
            scrollbarWidth: "none", // Hides scrollbar for Firefox
            msOverflowStyle: "none", // Hides scrollbar for IE/Edge
          }}
          className="overflow-x-auto w-full"
        >
          <table className="table-auto border-collapse w-full text-xxs text-left mb-0 min-w-max">
            <thead
              style={{
                background: activeTheme?.menuColor,
                color: activeTheme?.iconColor,
              }}
            >
              <tr>
                {columns?.map((col, index) => (
                  <th
                    key={index}
                    className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs whitespace-nowrap"
                    style={{
                      width: col?.width ? `${col?.width}px` : "",
                      flex: col?.flex ? col?.flex : "",
                    }}
                  >
                    {col?.renderHeaderCell
                      ? col?.renderHeaderCell({ row: {} })
                      : col?.headerName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows?.map((row, index) => (
                <tr
                  key={row?.id}
                  className={`cursor-pointer`}
                  onMouseEnter={() => setIsHoveredTable(row?.id)}
                  onMouseLeave={() => setIsHoveredTable(null)}
                  style={{
                    ...trstyle,
                    background:
                      isHoveredTable === row?.id
                        ? activeTheme?.subMenuColor
                        : undefined,
                  }}
                >
                  {columns?.map((col, idx) => (
                    <td
                      key={idx}
                      className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor whitespace-nowrap"
                    >
                      {col?.renderCell
                        ? col?.renderCell({ row })
                        : row[col?.field]}
                    </td>
                  ))}
                </tr>
              ))}
               {rows[0]?.subTest?.map((row, index) => (
                <tr
                  key={row?.id}
                  className={`cursor-pointer`}
                  onMouseEnter={() => setIsHoveredTable(row?.id)}
                  onMouseLeave={() => setIsHoveredTable(null)}
                  style={{
                    ...trstyle,
                    background:
                      isHoveredTable === row?.id
                        ? activeTheme?.subMenuColor
                        : undefined,
                  }}
                >
                  {columns?.map((col, idx) => (
                    <td
                      key={idx}
                      className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor whitespace-nowrap"
                    >
                      {col?.renderCell
                        ? col?.renderCell({ row })
                        : row[col?.field]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomHandsontable;
