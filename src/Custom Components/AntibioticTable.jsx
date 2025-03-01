import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TableHeader } from "./DynamicTable";
import { useGetData } from "../service/apiService";

const AntibioticTable = ({ data, item }) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [updatedAntibioticData, setUpdatedAntibioticData] = useState([]);
  const getAntibioticData = useGetData();
  console.log(updatedAntibioticData, " ", item, " ");
  // Handle Select Input Change
  useEffect(() => {
    getAntibioticData?.fetchData(
      `/organismAntibioticTagMaster/OrganismAntibioticeTagging?OrganismId=${item.organismId}`
    );
  }, []);

  // Initialize the data with interpretation and mic
  useEffect(() => {
    if (getAntibioticData?.data?.data) {
      const enrichedData = getAntibioticData.data.data.map((item) => ({
        ...item,
        interpretation: item.interpretation || "", // Default to empty
        mic: item.mic || "", // Default to empty
      }));
      setUpdatedAntibioticData(enrichedData);
    }
  }, [getAntibioticData]);

  // Handle Select Input Change (Interpretation)
  const handleSelectChange = (e, row) => {
    const value = e.target.value;
    setUpdatedAntibioticData((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, interpretation: value || "" } : item
      )
    );
  };

  // Handle Mic Input Change
  const handleMicChange = (e, row) => {
    const value = e.target.value;
    setUpdatedAntibioticData((prev) =>
      prev.map((item) =>
        item.id === row.id ? { ...item, mic: value || "" } : item
      )
    );
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className="w-full h-[0.10rem]"
        style={{ background: activeTheme?.menuColor }}
      ></div>
      <TableHeader title={item?.organismAntibiotic} />
      <table className="table-auto border-collapse w-full text-xxs text-left mb-2">
        <thead
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
          }}
        >
          <tr>
            {[
              { field: "antibiotic", headerName: "Antibiotic" },
              { field: "Interpretation", headerName: "Interpretation" },
              { field: "Mic", headerName: "Mic" },
            ].map((col, index) => (
              <th
                key={index}
                className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
              >
                {col.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getAntibioticData?.data?.data?.map((row, index) => (
            <Row
              key={index}
              row={row}
              index={index}
              handleMicChange={handleMicChange}
              handleSelectChange={handleSelectChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AntibioticTable;

const Row = ({ row, index, handleMicChange, handleSelectChange }) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [mic, setMic] = useState(row?.mic || "");
  const [isHoveredTable, setIsHoveredTable] = useState(null);
  const [interpretation, setInterpretation] = useState(
    row?.interpretation || ""
  );

  // Handle local mic change
  const handleLocalMicChange = (e) => {
    setMic(e.target.value);
    handleMicChange(e, row);
  };

  // Handle local interpretation change
  const handleLocalSelectChange = (e) => {
    setInterpretation(e.target.value);
    handleSelectChange(e, row);
  };

  return (
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
        background: isHoveredTable === row?.id ? activeTheme?.subMenuColor : "",
      }}
    >
      {/* Antibiotic Name */}
      <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
        {row.antibiotic}
      </td>

      {/* Select Dropdown (Controlled with State) */}
      <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
        <select
          value={interpretation}
          onChange={handleLocalSelectChange}
          className="inputPeerField cursor-pointer peer border-borderColor focus:outline-none"
        >
          <option disabled value="">
            Select Option
          </option>
          <option value="Resistant">Resistant</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Sensitive +">Sensitive +</option>
          <option value="Moderately Sensitive ++">
            Moderately Sensitive ++
          </option>
        </select>
      </td>

      {/* Mic Input */}
      <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
        <input
          type="text"
          value={mic}
          onChange={handleLocalMicChange}
          className="inputPeerField peer border-borderColor focus:outline-none"
        />
      </td>
    </tr>
  );
};
