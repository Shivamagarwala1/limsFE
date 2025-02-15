import React, { useState, useRef } from "react";
import { IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";

const CustomHandsontable = ({ columns, rows, onEdit, name = "Table Details" }) => {
  const [data, setData] = useState(rows);
  const [activeCell, setActiveCell] = useState({ row: null, col: null });
  const [hoveredRow, setHoveredRow] = useState(null);
  const inputRef = useRef(null);
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  // Handle cell edit
  const handleEdit = (rowIndex, field, value) => {
    const newData = data.map((row, i) =>
      i === rowIndex ? { ...row, [field]: value } : row
    );
    setData(newData);
    if (onEdit) onEdit(newData);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, rowIndex, colIndex) => {
    let newRow = rowIndex,
      newCol = colIndex;
    if (e.key === "ArrowDown") newRow = Math.min(rowIndex + 1, data.length - 1);
    if (e.key === "ArrowUp") newRow = Math.max(rowIndex - 1, 0);
    if (e.key === "ArrowRight") newCol = Math.min(colIndex + 1, columns.length - 1);
    if (e.key === "ArrowLeft") newCol = Math.max(colIndex - 1, 0);
    setActiveCell({ row: newRow, col: newCol });
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className="pt-0 w-full">
      <div
        className="w-full h-[0.10rem]"
        style={{ background: activeTheme?.menuColor }}
      ></div>
      <div
        className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-4 font-bold border-b-2 text-textColor"
        style={{ background: activeTheme?.blockColor }}
      >
        <IoMdMenu className="font-semibold text-lg" />
        <div>{name}</div>
      </div>

      <div className="overflow-x-auto">
        <div
          className="overflow-auto max-w-full max-h-[500px] "
          style={{ overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <table className="border-collapse  w-full text-center">
            <thead
              className=""
              style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
            >
              <tr>
                {columns.map((col, colIndex) => (
                  <th
                    key={colIndex}
                    className=" text-xxs"
                    style={{ flex: col.flex || undefined, width: col.width || "auto", minWidth: "100px" }}
                  >
                    {col.headerName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`cursor-pointer font-semibold`}
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="  text-xxs"
                      style={{ flex: col.flex || undefined, width: col.width || "auto", minWidth: "100px" }}
                    >
                      {col.renderCell ? (
                        col.renderCell({ value: row[col.field], row, rowIndex })
                      ) : col.options ? (
                        <select
                          value={row[col.field] || ""}
                          onChange={(e) => handleEdit(rowIndex, col.field, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                          className="w-full border-none outline-none"
                          disabled={!col.editable}
                        >
                          {col.options.map((option, i) => (
                            <option key={i} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          ref={
                            activeCell.row === rowIndex && activeCell.col === colIndex ? inputRef : null
                          }
                          type={col.type || "text"}
                          value={row[col.field] || ""}
                          onChange={(e) => handleEdit(rowIndex, col.field, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                          className={`w-full text-center border-none outline-none `}
                        //   style={{ backgroundColor: activeCell.row === rowIndex && activeCell.col === colIndex ? activeTheme?.menuColor : "" }}
                          onFocus={() => setActiveCell({ row: rowIndex, col: colIndex })}
                          disabled={!col.editable}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomHandsontable;
