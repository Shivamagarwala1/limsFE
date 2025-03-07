import { useEffect, useState } from "react";
import { useGetData } from "../service/apiService";
import RiplledButton from "./RiplledButton";

export const LegendButtons = ({ statuses, callBack }) => {
  const [buttons, setButtons] = useState([]);
  const { data, fetchData, loading } = useGetData();

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
        <RiplledButton status={status} statuses={statuses} index={index} key={index} />
      ))}
    </div>
  );
};
