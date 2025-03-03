// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// const TestMappingTable = ({ allTestMappingGridData = [], headers = [], dataKeys = [],setOrderSequance }) => {
//   const activeTheme = useSelector((state) => state.theme.activeTheme);
//   const [tableData, setTableData] = useState([]);
//   const [isHoveredTable, setIsHoveredTable] = useState(null);
//   const [draggedRowIndex, setDraggedRowIndex] = useState(null);

//   useEffect(() => {
//     if (Array.isArray(allTestMappingGridData) && allTestMappingGridData.length > 0) {
//       setTableData(allTestMappingGridData);
//     }
//   }, [allTestMappingGridData]);

//   // Handles drag start
//   const handleDragStart = (index) => {
//     setDraggedRowIndex(index);
//   };

//   // Handles drag end (reset cursor)
//   const handleDragEnd = () => {
//     setDraggedRowIndex(null);
//   };

//   // Handles drag over (must prevent default)
//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   // Handles drop (reordering logic)
//   const handleDrop = (dropIndex) => {
//     if (draggedRowIndex === null) return;

//     const updatedTableData = [...tableData];
//     const movedRow = updatedTableData.splice(draggedRowIndex, 1)[0]; // Remove dragged row
//     updatedTableData.splice(dropIndex, 0, movedRow); // Insert at new position

//     setTableData(updatedTableData);
//     setDraggedRowIndex(null);
//   };

//   return (
//     <table className="table-auto border-collapse w-full text-xs text-left mb-2">
//       <thead
//         style={{
//           background: activeTheme?.menuColor,
//           color: activeTheme?.iconColor,
//         }}
//       >
//         <tr>
//           <th className="border-b font-semibold border-gray-300 px-4 h-4">#</th>
//           {headers.map((header, index) => (
//             <th key={index} className="border-b font-semibold border-gray-300 px-4 h-4">
//               {header}
//             </th>
//           ))}
//         </tr>
//       </thead>

//       <tbody>
//         {tableData.length > 0 ? (
//           tableData.map((data, index) => (
//             <tr
//               key={data.itemId}
//               className={`cursor-pointer ${isHoveredTable === index
//                 ? ""
//                 : index % 2 === 0
//                   ? "bg-gray-100"
//                   : "bg-white"
//                 }`}
//               onMouseEnter={() => setIsHoveredTable(index)}
//               onMouseLeave={() => setIsHoveredTable(null)}
//               style={{
//                 cursor: draggedRowIndex === index ? "grabbing" : "default",
//                 background:
//                   isHoveredTable === index
//                     ? activeTheme?.subMenuColor
//                     : "",
//               }}
//               draggable={true}
//               onDragStart={() => handleDragStart(index)}
//               onDragEnd={handleDragEnd}
//               onDragOver={handleDragOver}
//               onDrop={() => handleDrop(index)}
//             >
//               <td className="border-b px-4 h-5 text-xs font-semibold">{index + 1}</td>
//               {dataKeys.map((key, keyIndex) => (
//                 <td key={keyIndex} className="border-b px-4 h-5 text-xs font-semibold">
//                   {data[key]}
//                 </td>
//               ))}
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan={headers.length + 1} className="text-center py-2 text-gray-500">
//               No Data Available
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// };

// export default TestMappingTable;

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// const TestMappingTable = ({ allTestMappingGridData = [], headers = [], dataKeys = [], setOrderSequance }) => {
//   const activeTheme = useSelector((state) => state.theme.activeTheme);
//   const [tableData, setTableData] = useState([]);
//   const [isHoveredTable, setIsHoveredTable] = useState(null);
//   const [draggedRowIndex, setDraggedRowIndex] = useState(null);

//   useEffect(() => {
//     if (Array.isArray(allTestMappingGridData) && allTestMappingGridData.length > 0) {
//       setTableData(allTestMappingGridData);
//       updateSequence(allTestMappingGridData); // Initialize sequence on first render
//     }
//   }, [allTestMappingGridData]);

//   // Function to update sequence array
//   const updateSequence = (data) => {
//     const sequence = data.map((item) => item.itemId); // Change key if needed
//     setOrderSequance(sequence);
//   };

//   // Handles drag start
//   const handleDragStart = (index) => {
//     setDraggedRowIndex(index);
//   };

//   // Handles drag end (reset cursor)
//   const handleDragEnd = () => {
//     setDraggedRowIndex(null);
//   };

//   // Handles drag over (must prevent default)
//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   // Handles drop (reordering logic)
//   const handleDrop = (dropIndex) => {
//     if (draggedRowIndex === null) return;

//     const updatedTableData = [...tableData];
//     const movedRow = updatedTableData.splice(draggedRowIndex, 1)[0]; // Remove dragged row
//     updatedTableData.splice(dropIndex, 0, movedRow); // Insert at new position

//     setTableData(updatedTableData);
//     updateSequence(updatedTableData); // Update sequence after reordering
//     setDraggedRowIndex(null);
//   };

//   return (
//     <table className="table-auto border-collapse w-full text-xs text-left mb-2">
//       <thead
//         style={{
//           background: activeTheme?.menuColor,
//           color: activeTheme?.iconColor,
//         }}
//       >
//         <tr>
//           <th className="border-b font-semibold border-gray-300 px-4 h-4">#</th>
//           {headers.map((header, index) => (
//             <th key={index} className="border-b font-semibold border-gray-300 px-4 h-4">
//               {header}
//             </th>
//           ))}
//         </tr>
//       </thead>

//       <tbody>
//         {tableData.length > 0 ? (
//           tableData.map((data, index) => (
//             <tr
//               key={data.itemId}
//               className={`cursor-pointer ${isHoveredTable === index
//                 ? ""
//                 : index % 2 === 0
//                   ? "bg-gray-100"
//                   : "bg-white"
//                 }`}
//               onMouseEnter={() => setIsHoveredTable(index)}
//               onMouseLeave={() => setIsHoveredTable(null)}
//               style={{
//                 cursor: draggedRowIndex === index ? "grabbing" : "default",
//                 background:
//                   isHoveredTable === index
//                     ? activeTheme?.subMenuColor
//                     : "",
//               }}
//               draggable={true}
//               onDragStart={() => handleDragStart(index)}
//               onDragEnd={handleDragEnd}
//               onDragOver={handleDragOver}
//               onDrop={() => handleDrop(index)}
//             >
//               <td className="border-b px-4 h-5 text-xs font-semibold">{index + 1}</td>
//               {dataKeys.map((key, keyIndex) => (
//                 <td key={keyIndex} className="border-b px-4 h-5 text-xs font-semibold">
//                   {data[key]}
//                 </td>
//               ))}
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan={headers.length + 1} className="text-center py-2 text-gray-500">
//               No Data Available
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// };

// export default TestMappingTable;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const TestMappingTable = ({
  allTestMappingGridData = [],
  headers = [],
  dataKeys = [],
  setOrderSequance,
  OrderTypeValue,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [tableData, setTableData] = useState([]);
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [draggedRowIndex, setDraggedRowIndex] = useState(null);

  useEffect(() => {
    if (
      Array.isArray(allTestMappingGridData) &&
      allTestMappingGridData.length > 0
    ) {
      setTableData(allTestMappingGridData);
      updateSequence(allTestMappingGridData); // Initialize sequence on first render
    }
  }, [allTestMappingGridData]);

  // Function to update sequence array
  const updateSequence = (data) => {
    if (OrderTypeValue === "Department") {
      const sequence = data.map((item, index) => ({
        id: item.id, // Mapping itemId to id
        order: index, // Assigning order based on position
      })); // Change key if needed
      setOrderSequance(sequence);
    } else {
      const sequence = data.map((item, index) => ({
        id: item.itemId, // Mapping itemId to id
        order: index, // Assigning order based on position
      }));
      setOrderSequance(sequence);
    }
  };

  // Handles drag start
  const handleDragStart = (index) => {
    setDraggedRowIndex(index);
  };

  // Handles drag end (reset cursor)
  const handleDragEnd = () => {
    setDraggedRowIndex(null);
  };

  // Handles drag over (must prevent default)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handles drop (reordering logic)
  const handleDrop = (dropIndex) => {
    if (draggedRowIndex === null) return;

    const updatedTableData = [...tableData];
    const movedRow = updatedTableData.splice(draggedRowIndex, 1)[0]; // Remove dragged row
    updatedTableData.splice(dropIndex, 0, movedRow); // Insert at new position

    setTableData(updatedTableData);
    updateSequence(updatedTableData); // Update sequence after reordering
    setDraggedRowIndex(null);
  };

  return (
    <table className="table-auto border-collapse w-full text-xs text-left mb-2">
      <thead
        style={{
          background: activeTheme?.menuColor,
          color: activeTheme?.iconColor,
        }}
      >
        <tr>
          <th className="border-b font-semibold border-gray-300 px-4 h-4">#</th>
          {headers.map((header, index) => (
            <th
              key={index}
              className="border-b font-semibold border-gray-300 px-4 h-4"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {tableData.length > 0 ? (
          tableData.map((data, index) => (
            <tr
              key={OrderTypeValue === "Department" ? data.id : data.itemId}
              className={`cursor-pointer ${
                isHoveredTable === index
                  ? ""
                  : index % 2 === 0
                  ? "bg-gray-100"
                  : "bg-white"
              }`}
              onMouseEnter={() => setIsHoveredTable(index)}
              onMouseLeave={() => setIsHoveredTable(null)}
              style={{
                cursor: draggedRowIndex === index ? "grabbing" : "default",
                background:
                  isHoveredTable === index ? activeTheme?.subMenuColor : "",
              }}
              draggable={true}
              onDragStart={() => handleDragStart(index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
            >
              <td className="border-b px-4 h-5 text-xs font-semibold">
                {index + 1}
              </td>
              {dataKeys.map((key, keyIndex) => (
                <td
                  key={keyIndex}
                  className="border-b px-4 h-5 text-xs font-semibold"
                >
                  {data[key]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={headers.length + 1}
              className="text-center py-2 text-gray-500"
            >
              No Data Available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TestMappingTable;
