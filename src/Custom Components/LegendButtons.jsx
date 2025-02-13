import { useEffect, useState } from "react";
import { useGetData } from "../service/apiService";

export const LegendButtons = ({ statuses, callBack }) => {
  const [buttons, setButtons] = useState([]);
  const { data, fetchData, loading } = useGetData();

  useEffect(() => {
    fetchData("/LegendColorMaster");
  }, []);

  useEffect(() => {
    if (!loading && data?.length) {
      // Filter only the items that match status names
      const filteredData = data.filter((item) =>
        statuses.includes(item.contantName)
      );
      setButtons(filteredData);
    }
  }, [loading, data, statuses]);

  return (
    <div className="flex flex-wrap items-center">
      {buttons.map((status, index) => (
        <div
          key={index}
          className="relative flex-1 gap-1 m-2 flex justify-center items-center text-xs cursor-pointer"
          onClick={() => callBack?.(status)} // Pass status data to the callback
        >
          <div
            style={{ backgroundColor: status?.colourCode }}
            className="w-6 h-6 rounded-full"
          ></div>
          {status?.contantName}
        </div>
      ))}
    </div>
  );
};