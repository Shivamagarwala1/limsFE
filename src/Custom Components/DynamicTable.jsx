import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import { useGetData } from "../service/apiService";

const DynamicTable = ({
  rows,
  columns,
  loading,
  showDetails = true,
  trstyle,
  tableStyle,
  statuses = [],
  noData = "",
  rowcolor = "rowcolor",
  legendColors = false,
  name = "Table Details",
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const { data, fetchData } = useGetData();

  useEffect(() => {
    if (legendColors) {
      fetchData("/LegendColorMaster");
    }
  }, []);

  useEffect(() => {
    if (data?.length) {
      // Filter only the items that match status names from the passed statuses array
      const filteredData = data.filter((item) =>
        statuses.some((status) => status.Data === item?.id)
      );
      // setButtons(filteredData);
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
          <table className="table-auto border-collapse w-full text-xxs text-left  min-w-max">
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
            {rows?.length !== 0 ? (
              <tbody>
                {rows?.map((row, index) => (
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
              <div className="flex items-center justify-center ">{noData}</div>
            )}
          </table>
        </div>
      )}
    </div>
  );
};
export default DynamicTable;

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
  rowcolor = "rowcolor",
  legendColors = false,
  name = "Table Details",
  viewKey = "id", // Default key field
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const { data, fetchData } = useGetData();

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
        <div className="text-center py-4 text-gray-500">Loading...</div>
      ) : (
        <div
          style={{
            ...tableStyle,
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="overflow-x-auto w-full"
        >
          <table className="table-auto border-collapse w-full text-xxs text-left min-w-max">
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
                      flex: col?.flex || "",
                    }}
                  >
                    {col?.renderHeaderCell
                      ? col?.renderHeaderCell({ row: {} })
                      : col?.headerName}
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
                          : "",
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
        </div>
      )}
      <br />
      <br />
    </div>
  );
};

