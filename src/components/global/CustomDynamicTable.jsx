import React, { useRef } from "react";

const CustomDynamicTable = ({ columns, activeTheme, children, height = '300px' }) => {

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

  return (
    <div
      ref={tableRef}
      onMouseDown={handleMouseDown} // Enables click and drag scrolling
      style={{
        overflowY: "auto",
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        whiteSpace: "nowrap",
        cursor: "grab", // Shows a grab cursor
        maxHeight: height
      }}

      className=" overflow-y-auto mb-2"
    >
      <table className="table-auto border-collapse w-full text-xxs text-left">
        {/* Header */}
        <thead
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
          }}
        >
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs whitespace-nowrap"
              >
                <div className="flex gap-1">
                  <div>{col}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body will be injected as children */}
        {children}
      </table>
    </div>
  );
};

export default CustomDynamicTable;