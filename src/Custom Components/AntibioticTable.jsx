// mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm

// import { useEffect, useState, useMemo, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { TableHeader } from "./DynamicTable";
// import { useGetData } from "../service/apiService";

// const AntibioticTable = ({ Organism, item, setOrganism }) => {
//   const activeTheme = useSelector((state) => state.theme.activeTheme);
//   const [updatedAntibioticData, setUpdatedAntibioticData] = useState([]);
//   const getAntibioticData = useGetData();

//   console.log("Received Item Data:", item);

//   // ✅ Memoized Antibiotic Data from item
//   const mappedAntibioticData = useMemo(() => {
//     if (!item?.antibiticMapped) return [];
//     return item.antibiticMapped.map((antibiotic) => ({
//       antibiticId: antibiotic.antibiticId,
//       antibitiName: antibiotic.antibitiName,
//       interpretation: antibiotic.interpretation || "",
//       mic: antibiotic.mic || "",
//     }));
//   }, [item?.antibiticMapped]);

//   console.log("Mapped Antibiotic Data:", mappedAntibioticData);

//   // ✅ Function to Update Organism State
//   const updateOrganism = useCallback(
//     (newAntibioticData) => {
//       setOrganism((prev) => {
//         return prev.map((org) =>
//           org.organismId === item.organismId
//             ? { ...org, selectedAntibiotic: newAntibioticData }
//             : org
//         );
//       });
//     },
//     [setOrganism, item.organismId]
//   );

//   // ✅ Fetch Data If `antibiticMapped` is Missing
//   useEffect(() => {
//     if (mappedAntibioticData.length > 0) {
//       setUpdatedAntibioticData(mappedAntibioticData);
//       updateOrganism(mappedAntibioticData);
//     } else if (!item?.antibiticMapped && item?.organismId) {
//       console.log("Fetching Antibiotic Data for Organism:", item.organismId);
//       getAntibioticData.fetchData(
//         `/organismAntibioticTagMaster/OrganismAntibioticeTagging?OrganismId=${item.organismId}`
//       );
//     }
//   }, [mappedAntibioticData, item.organismId, updateOrganism]);

//   // ✅ Update State When API Data is Fetched
//   useEffect(() => {
//     if (getAntibioticData?.data?.data?.length > 0) {
//       console.log("API Response Data:", getAntibioticData.data.data);

//       const fetchedData = getAntibioticData.data.data.map((antibiotic) => ({
//         antibiticId: antibiotic.id,
//         antibitiName: antibiotic.antibiotic,
//         interpretation: "",  // ✅ Default Empty Values
//         mic: "",
//       }));

//       setUpdatedAntibioticData(fetchedData);
//       updateOrganism(fetchedData);
//     }
//   }, [getAntibioticData.data?.data, updateOrganism]);

//   return (
//     <div className="flex flex-col w-full">
//       <div
//         className="w-full h-[0.10rem]"
//         style={{ background: activeTheme?.menuColor }}
//       ></div>
//       <TableHeader title={item?.organismName} />
//       <table className="table-auto border-collapse w-full text-xxs text-left mb-2">
//         <thead
//           style={{
//             background: activeTheme?.menuColor,
//             color: activeTheme?.iconColor,
//           }}
//         >
//           <tr>
//             {[
//               { field: "antibitiName", headerName: "Antibiotic" },
//               { field: "interpretation", headerName: "Interpretation" },
//               { field: "mic", headerName: "Mic" },
//             ].map((col, index) => (
//               <th
//                 key={index}
//                 className="border-b font-semibold border-gray-300 px-4 h-4 text-xxs"
//               >
//                 {col.headerName}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {updatedAntibioticData?.map((row, index) => (
//             <Row
//               key={row.antibiticId}
//               row={row}
//               index={index}
//               setUpdatedAntibioticData={setUpdatedAntibioticData}
//               updateOrganism={updateOrganism}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AntibioticTable;

// // ✅ Row Component (Ensuring Proper Key Naming)
// const Row = ({ row, index, setUpdatedAntibioticData, updateOrganism }) => {
//   const activeTheme = useSelector((state) => state.theme.activeTheme);
//   const [isHovered, setIsHovered] = useState(false);

//   const handleInputChange = (e, key) => {
//     const value = e.target.value;

//     setUpdatedAntibioticData((prev) => {
//       const updatedData = prev.map((item) =>
//         item.antibiticId === row.antibiticId ? { ...item, [key]: value } : item
//       );

//       // ✅ Ensure Organism state is updated
//       updateOrganism(updatedData);

//       return updatedData;
//     });
//   };

//   return (
//     <tr
//       className={`cursor-pointer ${
//         index % 2 === 0 ? "bg-gray-100" : "bg-white"
//       } ${isHovered ? "bg-opacity-70" : ""}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       style={{ background: isHovered ? activeTheme?.subMenuColor : "" }}
//     >
//       <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
//         {row.antibitiName}
//       </td>
//       <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
//         <select
//           value={row.interpretation}
//           onChange={(e) => handleInputChange(e, "interpretation")}
//           className="inputPeerField cursor-pointer peer border-borderColor focus:outline-none"
//         >
//           <option disabled value="">
//             Select Option
//           </option>
//           <option value="Resistant">Resistant</option>
//           <option value="Intermediate">Intermediate</option>
//           <option value="Sensitive +">Sensitive +</option>
//           <option value="Moderately Sensitive ++">
//             Moderately Sensitive ++
//           </option>
//         </select>
//       </td>
//       <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
//         <input
//           type="text"
//           value={row.mic}
//           onChange={(e) => handleInputChange(e, "mic")}
//           className="inputPeerField peer border-borderColor focus:outline-none"
//         />
//       </td>
//     </tr>
//   );
// };

////////////////////////// 2nd Method //////////////////////////

import { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { TableHeader } from "./DynamicTable";
import { useGetData } from "../service/apiService";

const AntibioticTable = ({ Organism, item, setOrganism }) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [updatedAntibioticData, setUpdatedAntibioticData] = useState([]);
  const getAntibioticData = useGetData();

  console.log("Received Item Data:", item);

  // ✅ Combine Existing and API Data
  const mappedAntibioticData = useMemo(() => {
    if (!item?.antibiticMapped) return [];
    return item.antibiticMapped.map((antibiotic) => ({
      antibiticId: antibiotic.antibiticId,
      antibitiName: antibiotic.antibitiName,
      interpretation: antibiotic.interpretation || "",
      mic: antibiotic.mic || "",
    }));
  }, [item?.antibiticMapped]);

  console.log("Mapped Antibiotic Data:", mappedAntibioticData);

  // ✅ Function to Update Organism State
  const updateOrganism = useCallback(
    (newAntibioticData) => {
      setOrganism((prev) => {
        return prev.map((org) =>
          org.organismId === item.organismId
            ? { ...org, selectedAntibiotic: newAntibioticData }
            : org
        );
      });
    },
    [setOrganism, item.organismId]
  );

  // ✅ Initialize State with Existing and API Data
  useEffect(() => {
    if (mappedAntibioticData.length > 0) {
      setUpdatedAntibioticData(mappedAntibioticData);
      updateOrganism(mappedAntibioticData);
    } else if (!item?.antibiticMapped && item?.organismId) {
      console.log("Fetching Antibiotic Data for Organism:", item.organismId);
      getAntibioticData.fetchData(
        `/organismAntibioticTagMaster/OrganismAntibioticeTagging?OrganismId=${item.organismId}`
      );
    }
  }, [mappedAntibioticData, item.organismId, updateOrganism]);

  // ✅ Update State When API Data is Fetched
  useEffect(() => {
    if (getAntibioticData?.data?.data?.length > 0) {
      console.log("API Response Data:", getAntibioticData.data.data);

      const fetchedData = getAntibioticData.data.data.map((antibiotic) => ({
        antibiticId: antibiotic.id,
        antibitiName: antibiotic.antibiotic,
        interpretation: "",
        mic: "",
      }));

      const combinedData = [...mappedAntibioticData, ...fetchedData];

      setUpdatedAntibioticData(combinedData);
      updateOrganism(combinedData);
    }
  }, [getAntibioticData.data?.data, updateOrganism, mappedAntibioticData]);

  return (
    <div className="flex flex-col w-full">
      <div
        className="w-full h-[0.10rem]"
        style={{ background: activeTheme?.menuColor }}
      ></div>
      <TableHeader title={item?.organismName} />
      <table className="table-auto border-collapse w-full text-xxs text-left mb-2">
        <thead
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
          }}
        >
          <tr>
            {[
              { field: "antibitiName", headerName: "Antibiotic" },
              { field: "interpretation", headerName: "Interpretation" },
              { field: "mic", headerName: "Mic" },
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
          {updatedAntibioticData?.map((row, index) => (
            <Row
              key={row.antibiticId}
              row={row}
              index={index}
              setUpdatedAntibioticData={setUpdatedAntibioticData}
              updateOrganism={updateOrganism}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AntibioticTable;

// ✅ Row Component (Now Fully Editable for All Data)
const Row = ({ row, index, setUpdatedAntibioticData, updateOrganism }) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (e, key) => {
    const value = e.target.value;

    setUpdatedAntibioticData((prev) => {
      const updatedData = prev.map((item) =>
        item.antibiticId === row.antibiticId ? { ...item, [key]: value } : item
      );

      // ✅ Ensure Organism state is updated for both API & existing data
      updateOrganism(updatedData);

      return updatedData;
    });
  };

  return (
    <tr
      className={`cursor-pointer ${
        index % 2 === 0 ? "bg-gray-100" : "bg-white"
      } ${isHovered ? "bg-opacity-70" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ background: isHovered ? activeTheme?.subMenuColor : "" }}
    >
      <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
        {row.antibitiName}
      </td>
      <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
        <select
          value={row.interpretation}
          onChange={(e) => handleInputChange(e, "interpretation")}
          className="inputPeerField cursor-pointer peer border-borderColor focus:outline-none"
          style={{
            backgroundColor:
              row.interpretation === "Resistant"
                ? "lightgreen"
                : row.interpretation === "Intermediate"
                ? "lightgreen"
                : row.interpretation === "Sensitive +"
                ? "#f84549"
                : row.interpretation === "Moderately Sensitive ++"
                ? "#f84549"
                : "",
          }}
        >
          <option disabled value="">
            Select Option
          </option>
          <option value="Resistant">Resistant</option> // green
          <option value="Intermediate">Intermediate</option> // green
          <option value="Sensitive +">Sensitive +</option> // red
          <option value="Moderately Sensitive ++">
            Moderately Sensitive ++
          </option>
        </select>
      </td>
      <td className="border-b px-4 h-5 text-xxs font-semibold text-gridTextColor">
        <input
          type="text" // Keeping text to manually validate input
          value={row.mic}
          onChange={(e) => {
            const inputValue = e.target.value;

            // Allow only numbers and single dot (.)
            if (
              /^[0-9]*\.?[0-9]*$/.test(inputValue) &&
              inputValue.length <= 7
            ) {
              handleInputChange(e, "mic");
            }
          }}
          className="inputPeerField peer border-borderColor focus:outline-none"
          inputMode="decimal" // Optimized for numeric input on mobile
          pattern="[0-9]*\.?[0-9]*" // Extra validation for forms
          maxLength={7} // Ensures the input can't exceed 7 characters
        />
      </td>
    </tr>
  );
};
