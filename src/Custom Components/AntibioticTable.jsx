import { useState } from "react";
import { useSelector } from "react-redux";

const AntibioticTable = ({
  data,
  setSelectedAntibiotic,
  selectedAntibiotic,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [selectedValues, setSelectedValues] = useState({});
  const [micValues, setMicValues] = useState({});
  const [isHoveredTable1, setIsHoveredTable1] = useState(null);

  // Handle Select Input Change
  const handleSelectChange = (e, row) => {
    const value = e.target.value;

    setSelectedValues((prev) => ({
      ...prev,
      [row.id]: value,
    }));

    setSelectedAntibiotic((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.antibiticId === row.id
      );
      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex ? { ...item, interpretation: value } : item
        );
      } else {
        return [
          ...prev,
          {
            antibiticId: row.id,
            antibitiName: row.antibiotic,
            interpretation: value,
            mic: micValues[row.id] || "",
          },
        ];
      }
    });
  };

  // Handle Mic Input Change
  const handleMicChange = (e, row) => {
    const value = e.target.value;

    setMicValues((prev) => ({
      ...prev,
      [row.id]: value,
    }));

    setSelectedAntibiotic((prev) =>
      prev.map((item) =>
        item.antibiticId === row.id ? { ...item, mic: value } : item
      )
    );
  };

  return (
    <table className="table-auto border-collapse w-full text-xxs text-left mb-2">
      <thead
        style={{
          background: activeTheme?.menuColor,
          color: activeTheme?.iconColor,
        }}
      >
        <tr>
          {[
            { field: "antibiotic", headerName: "Antibiotic", flex: 1 },
            {
              field: "Interpretation",
              headerName: "Interpretation",
              width: 170,
            },
            { field: "Mic", headerName: "Mic", width: 150 },
          ].map((col, index) => (
            <th
              key={index}
              className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
              style={{
                width: col.width ? `${col.width}px` : "",
                flex: col.flex || "",
              }}
            >
              {col.headerName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row, index) => (
          <tr
            key={index}
            className={`cursor-pointer ${
              isHoveredTable1 === row.id
                ? ""
                : index % 2 === 0
                ? "bg-gray-100"
                : "bg-white"
            }`}
            onMouseEnter={() => setIsHoveredTable1(row.id)}
            onMouseLeave={() => setIsHoveredTable1(null)}
            style={{
              background:
                isHoveredTable1 === row.id
                  ? activeTheme?.subMenuColor
                  : undefined,
            }}
          >
            {/* Antibiotic Name */}
            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
              {row.antibiotic}
            </td>

            {/* Select Dropdown */}
            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
              <div key={index} className="relative flex-1">
                <select
                  value={selectedValues[row.id] || ""}
                  onChange={(e) => handleSelectChange(e, row)}
                  className={`inputPeerField cursor-pointer peer border-borderColor focus:outline-none`}
                >
                  <option disabled value="">Select Option</option>
                  <option value="Resistant">Resistant</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Sensitive +">Sensitive +</option>
                  <option value="Moderately Sensitive ++">
                    Moderately Sensitive ++
                  </option>
                </select>
              </div>
            </td>

            {/* Mic Input (Disabled Until Selection) */}
            <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
              <div key={index} className="relative flex-1">
                <input
                  type="text"
                  value={
                    micValues[row.id] ||
                    selectedAntibiotic.find(
                      (item) => item.antibiticId === row.id
                    )?.mic ||
                    ""
                  }
                  onChange={(e) => handleMicChange(e, row)}
                  disabled={!selectedValues[row.id]}
                  className={`inputPeerField peer border-borderColor focus:outline-none`}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AntibioticTable;
