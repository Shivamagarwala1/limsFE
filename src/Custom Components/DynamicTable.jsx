import React, { useEffect, useRef, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import { useGetData } from "../service/apiService";
import "./DynamicTable.css";
// const DynamicTable = ({
//   rows,
//   columns,
//   loading,
//   showDetails = true,
//   trstyle,
//   tableStyle,
//   statuses = [],
//   noData = "",
//   rowcolor = "rowcolor",
//   legendColors = false,
//   name = "Table Details",
//   showHr = true,
// }) => {
//   const activeTheme = useSelector((state) => state.theme.activeTheme);
//   const [isHoveredTable, setIsHoveredTable] = useState(null);
//   const { data, fetchData } = useGetData();

//   useEffect(() => {
//     if (legendColors) {
//       fetchData("/LegendColorMaster");
//     }
//   }, []);

//   useEffect(() => {
//     if (data?.length) {
//       // Filter only the items that match status names from the passed statuses array
//       const filteredData = data.filter((item) =>
//         statuses.some((status) => status.Data === item?.id)
//       );
//       // setButtons(filteredData);
//     }
//   }, [loading, data, statuses]);

//   return (
//     <div className="pt-0 w-full">
//       {showHr && (
//         <div
//           className="w-full h-[0.10rem]"
//           style={{ background: activeTheme?.menuColor }}
//         ></div>
//       )}
//       {showDetails && (
//         <div
//           className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
//           style={{ background: activeTheme?.blockColor }}
//         >
//           <IoMdMenu className="font-semibold text-lg" />
//           <div>{name}</div>
//         </div>
//       )}

//       {loading ? (
//         <div className="text-center py-4 text-gray-500">Loading...</div>
//       ) : (
//         <div style={{position:"fixed"}}>
//           <div
//             style={{
//               ...tableStyle,
//               overflowY: "auto", // Ensures vertical scrolling
//               scrollbarWidth: "none", // Hides scrollbar for Firefox
//               msOverflowStyle: "none", // Hides scrollbar for IE/Edge
//             }}
//             className="overflow-x-auto w-full"
//           >
//             <table className="table-auto border-collapse w-full text-xxs text-left  min-w-max">
//               <thead
//                 style={{
//                   background: activeTheme?.menuColor,
//                   color: activeTheme?.iconColor,
//                 }}
//               >
//                 <tr>
//                   {columns?.map((col, index) => (
//                     <th
//                       key={index}
//                       className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs whitespace-nowrap"
//                       style={{
//                         width: col?.width ? `${col?.width}px` : "",
//                         flex: col?.flex ? col?.flex : "",
//                       }}
//                     >
//                       <div className="flex gap-1 items-center">
//                         {(col?.headerName === "Sample Coll." ||
//                           col?.headerName === "Sample Rec.") && (
//                           <input type="checkbox" name="" id="" />
//                         )}

//                         {col?.renderHeaderCell
//                           ? col?.renderHeaderCell({ row: {} })
//                           : col?.headerName}
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               {rows?.length !== 0 ? (
//                 <tbody>
//                   {rows?.map((row, index) => (
//                     <tr
//                       key={row?.id}
//                       className={`cursor-pointer ${
//                         isHoveredTable === row?.id
//                           ? ""
//                           : index % 2 === 0
//                           ? "bg-gray-100"
//                           : "bg-white"
//                       }`}
//                       onMouseEnter={() => setIsHoveredTable(row?.id)}
//                       onMouseLeave={() => setIsHoveredTable(null)}
//                       style={{
//                         ...trstyle,
//                         background:
//                           isHoveredTable === row?.id
//                             ? activeTheme?.subMenuColor
//                             : "",
//                       }}
//                     >
//                       {columns?.map((col, idx) => (
//                         <td
//                           key={idx}
//                           className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor whitespace-nowrap"
//                         >
//                           {col?.renderCell
//                             ? col?.renderCell({ row })
//                             : row[col?.field]}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               ) : (
//                 <div className="flex items-center justify-center ">
//                   {noData}
//                 </div>
//               )}
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default DynamicTable;

const DynamicTable = ({
  rows,
  columns,
  loading,
  showDetails = true,
  trstyle,
  height,
  tableStyle,
  statuses = [],
  noData = "",
  rowcolor = "rowcolor",
  legendColors = false,
  name = "Table Details",
  showHr = true,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const { data, fetchData } = useGetData();

  useEffect(() => {
    if (legendColors) {
      fetchData("/LegendColorMaster");
    }
  }, []);

  const tableRef = useRef(null);

  const handleMouseDown = (event) => {
    const table = tableRef.current;
    if (!table) return;

    let startX = event.pageX;
    let scrollLeft = table.scrollLeft;

    const handleMouseMove = (e) => {
      table.scrollLeft = scrollLeft - (e.pageX - startX);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const [maxHeight, setMaxHeight] = useState("auto");
  // const tableRef = useRef(null);

  useEffect(() => {
    const updateMaxHeight = () => {
      const windowHeight = window.innerHeight;
      const offsetTop = tableRef.current?.getBoundingClientRect().top || 0;
      const calculatedHeight = windowHeight - offsetTop - 20; // Subtract some padding
      setMaxHeight(`${calculatedHeight}px`);
    };

    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);

    return () => window.removeEventListener("resize", updateMaxHeight);
  }, []);

  return (
    <div className="pt-0 w-full">
      {showHr && (
        <div
          className="w-full h-[0.10rem]"
          style={{ background: activeTheme?.menuColor }}
        ></div>
      )}

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
        <Loader columns={columns} />
      ) : (
        <div className="w-full">
          {/* Wrapper to make only table rows scrollable */}
          <div
            ref={tableRef}
            onMouseDown={handleMouseDown}
            style={{
              ...tableStyle,
              height: height === undefined ? maxHeight : height, // Adjust scrollable height
              overflowY: "auto",
              position: "relative",
              scrollbarWidth: "none",
            }}
            className="w-full"
          >
            <table className="table-auto border-collapse w-full text-xxs text-left">
              {/* Sticky Header */}
              <thead
                className="sticky top-0 z-10 bg-white shadow"
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
                        width: col?.width ? `${col?.width}px` : "auto",
                      }}
                    >
                      <div className="flex gap-1 items-center">
                        {(col?.headerName === "Sample Coll." ||
                          col?.headerName === "Sample Rec.") && (
                          <input type="checkbox" />
                        )}
                        {col?.renderHeaderCell
                          ? col?.renderHeaderCell({ row: {} })
                          : col?.headerName}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body - Scrolls while header remains fixed */}
              <tbody>
                {rows?.length !== 0 ? (
                  rows?.map((row, index) => (
                    <tr
                      key={row?.id}
                      className={`cursor-pointer ${
                        isHoveredTable === row?.id
                          ? ""
                          : index % 2 === 0
                          ? "bg-gray-100"
                          : "bg-white"
                      }`}
                      onMouseEnter={() => setIsHoveredTable(row?.id)}
                      onMouseLeave={() => setIsHoveredTable(null)}
                      style={{
                        ...trstyle,
                        background:
                          isHoveredTable === row?.id
                            ? activeTheme?.subMenuColor
                            : "",
                      }}
                    >
                      {columns?.map((col, idx) => (
                        <td
                          key={idx}
                          className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor whitespace-nowrap"
                          style={{
                            width: col?.width ? `${col?.width}px` : "auto",
                          }}
                        >
                          {col?.renderCell
                            ? col?.renderCell({ row })
                            : row[col?.field]}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="text-center py-4 text-gray-500"
                    >
                      {noData || "No records found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <br />
            <br />
            <br />
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;

// const DynamicTable = ({
//   rows,
//   columns,
//   loading,
//   showDetails = true,
//   trstyle,
//   tableStyle,
//   statuses = [],
//   noData = "",
//   rowcolor = "rowcolor",
//   legendColors = false,
//   name = "Table Details",
//   showHr = true,
// }) => {
//   const activeTheme = useSelector((state) => state.theme.activeTheme);
//   const [isHoveredTable, setIsHoveredTable] = useState(null);
//   const { data, fetchData } = useGetData();

//   useEffect(() => {
//     if (legendColors) {
//       fetchData("/LegendColorMaster");
//     }
//   }, []);

//   const [tableHeight, setTableHeight] = useState("65vh");

//   useEffect(() => {
//     const updateTableHeight = () => {
//       let width = window.innerWidth;
//       let height = window.innerHeight;

//       // Base height at 1000px width & 800px height
//       let baseWidth = 1000;
//       let baseHeight = 800;

//       // Calculate additional height based on screen size
//       let extraHeight =
//         ((width - baseWidth) / 50) * 3 + ((height - baseHeight) / 50) * 2;

//       // Compute final height
//       let newHeight = 65 + extraHeight;

//       // Restrict height between 50vh and 90vh
//       newHeight = Math.max(62, Math.min(newHeight, 70));
//       console.log(extraHeight, " ", newHeight);
//       setTableHeight(`${newHeight}vh`);
//     };

//     updateTableHeight();
//     window.addEventListener("resize", updateTableHeight);
//     return () => window.removeEventListener("resize", updateTableHeight);
//   }, []);

//   return (
//     <div className="pt-0 w-full">
//       {showHr && (
//         <div
//           className="w-full h-[0.10rem]"
//           style={{ background: activeTheme?.menuColor }}
//         ></div>
//       )}

//       {showDetails && (
//         <div
//           className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
//           style={{ background: activeTheme?.blockColor }}
//         >
//           <IoMdMenu className="font-semibold text-lg" />
//           <div>{name}</div>
//         </div>
//       )}

//       {loading ? (
//         <div className="text-center py-4 text-gray-500">Loading...</div>
//       ) : (
//         <div className="w-full">
//           {/* Wrapper to make only table rows scrollable */}
//           <div
//             style={{
//               ...tableStyle,
//               maxHeight: "65rem",
//               overflowY: "auto",
//               position: "relative",
//               scrollbarWidth: "none",
//             }}
//             className="w-full"
//           >
//             <table className="table-auto border-collapse w-full text-xxs text-left">
//               {/* Sticky Header */}
//               <thead
//                 className="sticky top-0 z-10 bg-white shadow"
//                 style={{
//                   background: activeTheme?.menuColor,
//                   color: activeTheme?.iconColor,
//                 }}
//               >
//                 <tr>
//                   {columns?.map((col, index) => (
//                     <th
//                       key={index}
//                       className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs whitespace-nowrap"
//                       style={{
//                         width: col?.width ? `${col?.width}px` : "auto",
//                       }}
//                     >
//                       <div className="flex gap-1 items-center">
//                         {(col?.headerName === "Sample Coll." ||
//                           col?.headerName === "Sample Rec.") && (
//                           <input type="checkbox" />
//                         )}
//                         {col?.renderHeaderCell
//                           ? col?.renderHeaderCell({ row: {} })
//                           : col?.headerName}
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>

//               {/* Table Body - Scrolls while header remains fixed */}
//               <tbody>
//                 {rows?.length !== 0 ? (
//                   rows?.map((row, index) => (
//                     <tr
//                       key={row?.id}
//                       className={`cursor-pointer ${
//                         isHoveredTable === row?.id
//                           ? ""
//                           : index % 2 === 0
//                           ? "bg-gray-100"
//                           : "bg-white"
//                       }`}
//                       onMouseEnter={() => setIsHoveredTable(row?.id)}
//                       onMouseLeave={() => setIsHoveredTable(null)}
//                       style={{
//                         ...trstyle,
//                         background:
//                           isHoveredTable === row?.id
//                             ? activeTheme?.subMenuColor
//                             : "",
//                       }}
//                     >
//                       {columns?.map((col, idx) => (
//                         <td
//                           key={idx}
//                           className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor whitespace-nowrap"
//                           style={{
//                             width: col?.width ? `${col?.width}px` : "auto",
//                           }}
//                         >
//                           {col?.renderCell
//                             ? col?.renderCell({ row })
//                             : row[col?.field]}
//                         </td>
//                       ))}
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={columns.length}
//                       className="text-center py-4 text-gray-500"
//                     >
//                       {noData || "No records found"}
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//             {/* <br />
//             <br />
//             <br /> */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DynamicTable;

export const TableHeader = ({ title }) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  return (
    <div
      className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
      style={{ background: activeTheme?.blockColor }}
    >
      <IoMdMenu className="font-semibold text-lg" />
      <div>{title}</div>
    </div>
  );
};

export const UpdatedDynamicTable = ({
  rows,
  columns,
  loading,
  showDetails = true,
  trstyle,
  tableStyle,
  statuses = [],
  noData = "",
  height,
  rowcolor = "",
  legendColors = false,
  name = "Table Details",
  extraRow = [],
  viewKey = "id", // Default key field
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const { data, fetchData } = useGetData();

  const tableRef = useRef(null);

  const handleMouseDown = (event) => {
    const table = tableRef.current;
    if (!table) return;

    let startX = event.pageX;
    let scrollLeft = table.scrollLeft;

    const handleMouseMove = (e) => {
      table.scrollLeft = scrollLeft - (e.pageX - startX);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const [maxHeight, setMaxHeight] = useState("auto");
  // const tableRef = useRef(null);

  useEffect(() => {
    const updateMaxHeight = () => {
      const windowHeight = window.innerHeight;
      const offsetTop = tableRef.current?.getBoundingClientRect().top || 0;
      const calculatedHeight = windowHeight - offsetTop - 20; // Subtract some padding
      setMaxHeight(`${calculatedHeight}px`);
    };

    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);

    return () => window.removeEventListener("resize", updateMaxHeight);
  }, []);

  useEffect(() => {
    if (legendColors) {
      fetchData("/LegendColorMaster");
    }
  }, []);

  useEffect(() => {
    if (data?.length) {
      const filteredData = data.filter((item) =>
        statuses.some((status) => status.Data === item?.id)
      );
      // setButtons(filteredData); // Uncomment if needed
    }
  }, [loading, data, statuses]);

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
        <Loader columns={columns} />
      ) : (
        <div
          ref={tableRef}
          onMouseDown={handleMouseDown}
          style={{
            ...tableStyle,
            overflowY: "auto",
            position: "relative",
            scrollbarWidth: "none",
            height: height === undefined ? maxHeight : height,
          }}
          className="overflow-x-auto w-full"
        >
          <table className="table-auto border-collapse w-full text-xxs text-left min-w-max">
            {/* <thead
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
                      flex: col?.flex || "",
                    }}
                  >
                    {col?.renderHeaderCell
                      ? col?.renderHeaderCell({ row: {} })
                      : col?.headerName}
                  </th>
                ))}
              </tr>
            </thead> */}

            {/* Sticky Header */}
            <thead
              className="sticky top-0 z-10 bg-white shadow"
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
                      width: col?.width ? `${col?.width}px` : "auto",
                    }}
                  >
                    <div className="flex gap-1 items-center">
                      {(col?.headerName === "Sample Coll." ||
                        col?.headerName === "Sample Rec.") && (
                        <input type="checkbox" />
                      )}
                      {col?.renderHeaderCell
                        ? col?.renderHeaderCell({ row: {} })
                        : col?.headerName}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {rows?.length !== 0 ? (
              <tbody>
                {rows?.map((row, index) => (
                  <tr
                    key={row?.[viewKey] || index} // Ensure a valid key
                    className={`cursor-pointer ${
                      isHoveredTable === row?.[viewKey]
                        ? ""
                        : index % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                    onMouseEnter={() => setIsHoveredTable(row?.[viewKey])}
                    onMouseLeave={() => setIsHoveredTable(null)}
                    style={{
                      ...trstyle,
                      background:
                        isHoveredTable === row?.[viewKey]
                          ? activeTheme?.subMenuColor
                          : row?.rowcolor || "",
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
                {extraRow?.map((row, index) => (
                  <tr
                    key={row?.[viewKey] || index} // Ensure a valid key
                    className={`cursor-pointer ${
                      isHoveredTable === row?.[viewKey]
                        ? ""
                        : index % 2 === 0
                        ? "bg-gray-100"
                        : "bg-white"
                    }`}
                    onMouseEnter={() => setIsHoveredTable(row?.[viewKey])}
                    onMouseLeave={() => setIsHoveredTable(null)}
                    style={{
                      ...trstyle,
                      background:
                        isHoveredTable === row?.[viewKey]
                          ? activeTheme?.subMenuColor
                          : "yellow",
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
            ) : (
              <tbody>
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    {noData}
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      )}
      <br />
      <br />
    </div>
  );
};

export const StyledHr = ({ style = {} }) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  return (
    <>
      <div
        className="w-full h-[0.10rem]"
        style={{ ...style, background: activeTheme?.menuColor }}
      ></div>
    </>
  );
};

const Loader = ({ columns }) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  return (
    <div
      style={{
        maxHeight: "70vh",
        overflowY: "auto",
        position: "relative",
        scrollbarWidth: "none",
      }}
      className="border border-gray-300 rounded-md"
    >
      <table className="table-auto border-collapse w-full text-left">
        <thead
          className="sticky top-0 z-10 bg-white shadow"
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
                  width: col?.width ? `${col?.width}px` : "auto",
                }}
              >
                <div className="flex gap-1 items-center">
                  {(col?.headerName === "Sample Coll." ||
                    col?.headerName === "Sample Rec.") && (
                    <input type="checkbox" />
                  )}
                  {col?.renderHeaderCell
                    ? col?.renderHeaderCell({ row: {} })
                    : col?.headerName}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(50)].map((_, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              {columns?.map((_, idx) => (
                <td key={idx} className="border-b px-4 h-5">
                  <div className="skeleton h-3 w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
