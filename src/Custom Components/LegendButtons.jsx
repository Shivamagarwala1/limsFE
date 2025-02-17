import { useEffect, useState } from "react";
import { useGetData } from "../service/apiService";
import { useSelector } from "react-redux";

export const LegendButtons = ({ statuses, callBack }) => {
  const [buttons, setButtons] = useState([]);
  const { data, fetchData, loading } = useGetData();
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  useEffect(() => {
    fetchData("/LegendColorMaster");
  }, []);

  useEffect(() => {
    if (!loading && data?.length) {
      // Filter only the items that match status names from the passed statuses array
      const filteredData = data.filter((item) =>
        statuses.some((status) => status.Data === item?.id)
      );
      setButtons(filteredData);
    }
  }, [loading, data, statuses]);

  return (
    <div className="flex flex-wrap items-center">
      {buttons.map((status, index) => (
        <div
          key={index}
          // style={{display:"flex",alignItems:"center",}}
          className="relative flex-1 flex justify-center items-center"
        >
          <button
            type="button"
            onClick={() => {
              const matchedStatus = statuses?.find(s => s?.Data === status?.id);
              matchedStatus?.CallBack();
              // callBack?.(status);
            }}
            className="overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-[100px] rounded-md flex justify-center items-center cursor-pointer mb-1"
            style={{
              backgroundColor: status?.colourCode || "#ccc",
              color: activeTheme?.iconColor || "#000",
              ...status?.style,
            }}
          >
            {status?.contantName || "Unknown"}
          </button>
        </div>
      ))}
    </div>
  );
};
