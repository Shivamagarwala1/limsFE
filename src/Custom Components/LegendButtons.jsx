import { useEffect, useState } from "react";
import { useGetData } from "../service/apiService";
import RiplledButton from "./RiplledButton";

export const LegendButtons = ({
  statuses,
  callBack,
  style = {},
  btnStyle = {},
}) => {
  const [buttons, setButtons] = useState([]);
  const { data, fetchData, loading } = useGetData();

  useEffect(() => {
    fetchData("/LegendColorMaster");
  }, []);

  useEffect(() => {
    if (!loading && data?.length) {
      const filteredData = statuses
        .map(({ Data, name = "", disabled = false }) => {
          const matchedItem = data.find((item) => item?.id === Data);
          return matchedItem ? { ...matchedItem, name, disabled } : null;
        })
        .filter(Boolean); // Remove null values if no match is found

      setButtons(filteredData);
    }
  }, [loading, data, statuses]);

  // console.log(buttons);
  return (
    <div style={style} className="flex flex-wrap items-center">
      {buttons.map((status, index) => (
        <RiplledButton
          btnStyle={btnStyle}
          status={status}
          callBack={callBack}
          statuses={statuses}
          index={index}
          key={index}
        />
      ))}
    </div>
  );
};
