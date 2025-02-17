import React, { useState } from "react";
import { useSelector } from "react-redux";

export function PopupTable({
  rows,
  columns,
  loading,
  showDetails = true,
  trstyle,
  name = "Table Details",
}) {
    const activeTheme = useSelector((state) => state.theme.activeTheme);
    const [isHoveredTable, setIsHoveredTable] = useState(null);
  return (
    <div 
    style={{
      scrollbarWidth: "none", // Keeps it slim (Firefox)
      scrollbarColor: "#4a90e2 #f1f1f1", // Blue thumb, light gray track
    }} className="overflow-x-auto w-full custom-scrollbar">
      <table className="table-auto border-collapse w-full text-xxs text-left min-w-max">
        <thead
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
          }}
        >
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs whitespace-nowrap"
                style={{
                  width: col.width ? `${col.width}px` : "",
                  flex: col.flex ? col.flex : "",
                }}
              >
                {col.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.id}
              className={`cursor-pointer ${
                isHoveredTable === row.id
                  ? ""
                  : index % 2 === 0
                  ? "bg-white"
                  : "bg-white"
              }`}
              onMouseEnter={() => setIsHoveredTable(row.id)}
              onMouseLeave={() => setIsHoveredTable(null)}
              style={{
                ...trstyle,
                height:"45px",
                background:
                  isHoveredTable === row.id
                    ? activeTheme?.subMenuColor
                    : undefined,
              }}
            >
              {columns.map((col, idx) => (
                <td
                  key={idx}
                  className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor whitespace-nowrap"
                >
                  {col.renderCell ? col.renderCell({ row }) : row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
