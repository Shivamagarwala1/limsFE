// import React, { useState, useRef, useEffect } from "react";

// export default function MultiSelectDropdown({ field }) {
//   const [selectedValues, setSelectedValues] = useState([]);
//   const [filteredValues, setFilteredValues] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Handle selected values and filter the corresponding modes
//   const handleSelectedValues = (selectedValues) => {
//     const filtered = selectedValues.map((id) => {
//     const ids = field?.keyField;
//       const selectedItem = field?.dataOptions?.find((item) => item[field?.keyField] === id[field?.keyField]);
//       return selectedItem ? selectedItem.mode : null; // Get mode for each selected value
//     }).filter(Boolean);  // Filter out any null values

//     setFilteredValues(filtered);  // Set the filtered values (modes)
//   };

//   // Handle checkbox changes (update selected values)
//   const handleCheckboxChange = (value) => {
//     let updatedValues;
//     if (selectedValues.includes(value)) {
//       updatedValues = selectedValues.filter((item) => item !== value);
//     } else {
//       updatedValues = [...selectedValues, value];
//     }
//     setSelectedValues(updatedValues);

//     // If there's a callback, pass selected values
//     if (field?.callBack) {
//       field.callBack(updatedValues);
//     }

//     // Update filtered values based on the new selected values
//     handleSelectedValues(updatedValues);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     setSelectedValues(field?.selectedValues);
//     // Update filtered values whenever selectedValues change
//     handleSelectedValues(selectedValues);

//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [selectedValues]); // Run effect whenever selectedValues change

//   return (
//     <div ref={dropdownRef} className="relative flex-1">
//       {/* Label */}
//       <label style={{ marginTop: "-3px" }} htmlFor={field.name} className="menuPeerLevel">
//         {field.label}
//       </label>

//       {/* Dropdown button */}
//       <div
//         id={field.name}
//         onClick={() => setIsOpen(!isOpen)}
//         className={`inputPeerField peer ${
//                   field?.required ? "border-b-red-500" : "border-b-green-300"
//                 } border border-gray-300 p-0 rounded cursor-pointer flex justify-between items-center`}
//       >
//         <span>
//           {filteredValues.length > 0
//             ? filteredValues.join(", ") // Show the filtered values (modes) as a string
//             : "Select Option"}
//         </span>
//         <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
//       </div>

//       {/* Dropdown list (only visible when isOpen is true) */}
//       {isOpen && (
//         <div className="absolute left-0 w-full bg-white shadow-md border mt-0 rounded z-50 max-h-45 overflow-y-auto">
//           {field?.dataOptions?.map((option, idx) => {
//             const valueKey = field.keyField || Object.keys(option)[0]; // First key as value
//             const labelKey =
//               field.showValueField || Object.keys(option)[1] || valueKey; // Second key or fallback

//             return (
//               <label
//                 key={option[valueKey] || idx}
//                 className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedValues.includes(option[valueKey])}
//                   onChange={() => handleCheckboxChange(option[valueKey])}
//                   className="cursor-pointer"
//                 />
//                 {option[labelKey]}
//               </label>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";

export default function MultiSelectDropdown({ field }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]); // Labels for display
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle checkbox selection
  const handleCheckboxChange = (value, label) => {
    let updatedValues, updatedLabels;

    if (selectedValues.includes(value)) {
      updatedValues = selectedValues.filter((item) => item !== value);
      updatedLabels = selectedLabels.filter((item) => item !== label);
    } else {
      updatedValues = [...selectedValues, value];
      updatedLabels = [...selectedLabels, label];
    }

    setSelectedValues(updatedValues);
    setSelectedLabels(updatedLabels);

    if (field?.callBack) {
      field.callBack(updatedValues);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    setSelectedValues(field?.selectedValues || []);
    setSelectedLabels(
      field?.dataOptions
        ?.filter((item) => (field?.selectedValues || []).includes(item[field.keyField]))
        .map((item) => item[field.showValueField])
    );

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [field.selectedValues, field.dataOptions]);

  return (
    <div ref={dropdownRef} className="relative flex-1" style={{marginTop:"2px"}}>
      <label style={{ marginTop: "-3px" }} htmlFor={field.name} className="menuPeerLevel">
        {field.label}
      </label>

      {/* Input Field */}
      <div
        id={field.name}
        onClick={() => setIsOpen(!isOpen)}
        className={`inputPeerField peer border  ${field?.required ? "border-b-red-500" : "border-b-green-300"} p-2 rounded cursor-pointer flex justify-between items-center`}
        style={{
          height:"1.6rem",
          overflowY: "auto", // Enable scrolling if needed
          display: "flex",
          scrollbarWidth: "none",
          alignItems:"center",
          paddingTop:"5px",
          // justifyContent:"center",
          flexWrap: "wrap", 
        }}
      >
        <span>
          {selectedLabels.length > 0 ? selectedLabels.join(", ") : "Select Option"}
        </span>
        {/* <span className="ml-2">{isOpen ? "▲" : "▼"}</span> */}
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute left-0 w-full bg-white shadow-md border mt-1 rounded z-50  overflow-y-auto">
          {field?.dataOptions?.map((option, idx) => {
            const valueKey = field.keyField || Object.keys(option)[0];
            const labelKey = field.showValueField || Object.keys(option)[1] || valueKey;

            return (
              <label key={option[valueKey] || idx} style={{fontSize:"10px"}} className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option[valueKey])}
                  onChange={() => handleCheckboxChange(option[valueKey], option[labelKey])}
                  className="cursor-pointer"
                />
                {option[labelKey]}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
