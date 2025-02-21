import React from 'react'

export default function CustomDynamicTable({ headers, bodyData, activeTheme }) {



  return (
    <table className="table-auto border-collapse w-full text-xxs text-left mb-2">
      <thead style={{ background: activeTheme?.menuColor, color: activeTheme?.iconColor }}>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyData.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className="border border-gray-300 px-4 py-2"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
