import React from "react";

const CustomDynamicTable = ({ columns, activeTheme, children }) => {
  return (
    <div style={{
      overflowY: "auto", // Ensures vertical scrolling
      scrollbarWidth: "none", // Hides scrollbar for Firefox
      msOverflowStyle: "none", // Hides scrollbar for IE/Edge
    }}>
      <table className="table-auto border-collapse w-full text-xxs text-left">
        {/* Header */}
        <thead style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs whitespace-nowrap">
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
