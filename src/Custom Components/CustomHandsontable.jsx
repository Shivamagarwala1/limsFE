// // import React, { useState, useEffect, useRef } from "react";

// // const initialColumns = ["ID", "Name", "Age", "Country"];
// // const initialData = [
// //   [1, "John Doe", 25, "USA"],
// //   [2, "Alice Smith", 30, "Canada"],
// //   [3, "Bob Brown", 28, "UK"],
// // ];

// // const countries = ["USA", "Canada", "UK", "India", "Germany", "France"];

// // const CustomHandsontable = () => {
// //   const [columns, setColumns] = useState(initialColumns);
// //   const [data, setData] = useState(initialData);
// //   const [activeCell, setActiveCell] = useState({ row: null, col: null });
// //   const [editedCells, setEditedCells] = useState([]);
// //   const inputRef = useRef(null);

// //   // Handle cell edit
// //   const handleEdit = (row, col, value) => {
// //     const newData = [...data];
// //     newData[row][col] = value;
// //     setData(newData);
// //     setEditedCells([...editedCells, { row, col, value }]);
// //   };

// //   // Handle row addition
// //   const addRow = () => {
// //     setData([...data, new Array(columns.length).fill("")]);
// //   };

// //   // Handle row deletion
// //   const deleteRow = (index) => {
// //     setData(data.filter((_, i) => i !== index));
// //   };

// //   // Handle column addition
// //   const addColumn = () => {
// //     const newColumnName = `Column ${columns.length + 1}`;
// //     setColumns([...columns, newColumnName]);
// //     setData(data.map(row => [...row, ""]));
// //   };

// //   // Handle column deletion
// //   const deleteColumn = (index) => {
// //     setColumns(columns.filter((_, i) => i !== index));
// //     setData(data.map(row => row.filter((_, i) => i !== index)));
// //   };

// //   // Handle sorting
// //   const sortColumn = (colIndex) => {
// //     const sortedData = [...data].sort((a, b) => (a[colIndex] > b[colIndex] ? 1 : -1));
// //     setData(sortedData);
// //   };

// //   // Handle keyboard navigation
// //   const handleKeyDown = (e, row, col) => {
// //     let newRow = row, newCol = col;
// //     if (e.key === "ArrowDown") newRow = Math.min(row + 1, data.length - 1);
// //     if (e.key === "ArrowUp") newRow = Math.max(row - 1, 0);
// //     if (e.key === "ArrowRight") newCol = Math.min(col + 1, columns.length - 1);
// //     if (e.key === "ArrowLeft") newCol = Math.max(col - 1, 0);
// //     setActiveCell({ row: newRow, col: newCol });
// //     setTimeout(() => inputRef.current?.focus(), 0);
// //   };

// //   return (
// //     <div className="p-4 overflow-x-auto">
// //       <div className="mb-2 space-x-2">
// //         <button onClick={addRow} className="px-3 py-1 bg-blue-500 text-white rounded">Add Row</button>
// //         <button onClick={addColumn} className="px-3 py-1 bg-green-500 text-white rounded">Add Column</button>
// //       </div>
// //       <div className="overflow-auto max-w-full max-h-[500px]">
// //         <table className="border-collapse border  w-full text-center">
// //           <thead>
// //             <tr className="">
// //               {columns.map((col, colIndex) => (
// //                 <th key={colIndex} className="border  px-2 py-1">
// //                   {col} 
// //                   <button onClick={() => sortColumn(colIndex)} className="ml-2 text-xs">🔼</button>
// //                   <button onClick={() => deleteColumn(colIndex)} className="ml-1 text-xs">❌</button>
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {data.map((row, rowIndex) => (
// //               <tr key={rowIndex}>
// //                 {row.map((cell, colIndex) => (
// //                   <td key={colIndex} className="border  p-1">
// //                     {columns[colIndex] === "Country" ? (
// //                       <select
// //                         value={cell}
// //                         onChange={(e) => handleEdit(rowIndex, colIndex, e.target.value)}
// //                         onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
// //                         className="w-full border-none outline-none"
// //                       >
// //                         {countries.map((country, i) => (
// //                           <option key={i} value={country}>{country}</option>
// //                         ))}
// //                       </select>
// //                     ) : (
// //                       <input
// //                         ref={activeCell.row === rowIndex && activeCell.col === colIndex ? inputRef : null}
// //                         type="text"
// //                         value={cell}
// //                         onChange={(e) => handleEdit(rowIndex, colIndex, e.target.value)}
// //                         onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
// //                         className={`w-full text-center border-none outline-none ${activeCell.row === rowIndex && activeCell.col === colIndex ? "bg-yellow-200" : ""}`}
// //                         onFocus={() => setActiveCell({ row: rowIndex, col: colIndex })}
// //                       />
// //                     )}
// //                   </td>
// //                 ))}
// //                 <td>
// //                   <button onClick={() => deleteRow(rowIndex)} className="text-red-500 text-xs">❌</button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CustomHandsontable;
// import React, { useState, useRef } from "react";
// import { IoMdMenu } from "react-icons/io";
// import { useSelector } from "react-redux";

// const CustomHandsontable = ({ columns, rows, onEdit }) => {
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
//     let newRow = rowIndex;
//     let newCol = colIndex;
//     if (e.key === "ArrowDown") newRow = Math.min(rowIndex + 1, data.length - 1);
//     if (e.key === "ArrowUp") newRow = Math.max(rowIndex - 1, 0);
//     if (e.key === "ArrowRight") newCol = Math.min(colIndex + 1, columns.length - 1);
//     if (e.key === "ArrowLeft") newCol = Math.max(colIndex - 1, 0);
//     if (e.key === "Enter") {
//       setActiveCell({ row: rowIndex, col: colIndex });
//       setTimeout(() => inputRef.current?.focus(), 0);
//     }
//     if (e.key === "Escape") {
//       setActiveCell({ row: null, col: null });
//     }
//     setActiveCell({ row: newRow, col: newCol });
//     setTimeout(() => inputRef.current?.focus(), 0);
//   };

//   return (
//     <div className="pt-0 w-full">
//         {/* Add Header */}
//       <div className="overflow-x-auto">
//         <div className="overflow-auto max-w-full max-h-[500px] border  rounded-md" style={{ overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
//           <table className="border-collapse border  w-full text-center">
//             <thead className="" style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
//               <tr>
//                 {columns.map((col, colIndex) => (
//                   <th key={colIndex} className="border  px-2 py-1" style={{ flex: col.flex || undefined, width: col.width || "auto", minWidth: "100px" }}>
//                     {col.headerName}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row, rowIndex) => (
//                 <tr key={rowIndex} className={`cursor-pointer ${hoveredRow === rowIndex ? "" : rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}`} onMouseEnter={() => setHoveredRow(rowIndex)} onMouseLeave={() => setHoveredRow(null)}>
//                   {columns.map((col, colIndex) => (
//                     <td key={colIndex} className="border  p-1" style={{ flex: col.flex || undefined, width: col.width || "auto", minWidth: "100px" }}>
//                       {col.renderCell ? (
//                         col.renderCell({ value: row[col.field], row, rowIndex })
//                       ) : col.options ? (
//                         <select value={row[col.field] || ""} onChange={(e) => handleEdit(rowIndex, col.field, e.target.value)} onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)} className="w-full border-none outline-none">
//                           {col.options.map((option, i) => (
//                             <option key={i} value={option}>{option}</option>
//                           ))}
//                         </select>
//                       ) : (
//                         <input style={{height:"30px"}}
//                           ref={activeCell.row === rowIndex && activeCell.col === colIndex ? inputRef : null}
//                           type={col.type || "text"}
//                           value={row[col.field] || ""}
//                           onChange={(e) => handleEdit(rowIndex, col.field, e.target.value)}
//                           onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
//                           className={`w-full text-center border-none outline-none ${activeCell.row === rowIndex && activeCell.col === colIndex ? "bg-yellow-200" : ""}`}
//                           onFocus={() => setActiveCell({ row: rowIndex, col: colIndex })}
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

