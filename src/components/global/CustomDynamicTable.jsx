import React, { useEffect, useRef, useState } from "react";

const CustomDynamicTable = ({ columns, activeTheme, children, height }) => {

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
    <div
      ref={tableRef}
      onMouseDown={handleMouseDown} // Enables click and drag scrolling
      // style={{
      //   overflowY: "auto",
      //   overflowX: "auto",
      //   scrollbarWidth: "none",
      //   msOverflowStyle: "none",
      //   whiteSpace: "nowrap",
      //   cursor: "grab", // Shows a grab cursor
      //   maxHeight: height
      // }}



      style={{
        overflowY: "auto",
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        whiteSpace: "nowrap",
        cursor: "grab",
        // height: "300px",
        maxHeight: maxHeight, // Dynamically adjusted height
        //height: height === undefined ? maxHeight : height,
      }}
      className={`overflow-y-auto mb-2`}
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
    </div >
  );
};

export default CustomDynamicTable;