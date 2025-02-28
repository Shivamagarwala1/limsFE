// import React, { useState, useRef, useEffect } from "react";

// function CustomSearchInputFields({
//     id,
//     name,
//     label,
//     options,
//     onChange,
//     placeholder,
//     filterText = "No records found",
//     activeTheme = { subMenuColor: "#e0f2fe" }, // Customize hover color,
//     searchWithName,
//     uniqueKey
// }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isHovered, setIsHovered] = useState(null);
//     const [displayValue, setDisplayValue] = useState(""); // Value shown in the input
//     const dropdownRef = useRef(null);    

//     const handleDropdownToggle = (openState) => {
//         setIsOpen(openState);
//     };

//     const handleOutsideClick = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setIsOpen(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener("mousedown", handleOutsideClick);
//         return () => {
//             document.removeEventListener("mousedown", handleOutsideClick);
//         };
//     }, []);

//     const filteredOptions = options.filter((option) => {
//         const searchField = option[searchWithName]; 
//         return (
//             searchField &&
//             typeof searchField === "string" &&
//             searchField.toLowerCase().includes(displayValue)
//         );
//     });


//     return (
//         <div ref={dropdownRef}>
//             {/* Input Field */}
//             <input
//                 type="search"
//                 id={id}
//                 name={name}
//                 value={displayValue || ""}
//                 onChange={(e) => setDisplayValue(e.target.value)}
//                 onClick={() => handleDropdownToggle(true)}
//                 placeholder={placeholder}
//                 className={`inputPeerField peer border-borderColor focus:outline-none`}
//             />
//             <label htmlFor={id} className="menuPeerLevel">
//                 {label}
//             </label>

//             {/* Dropdown Menu */}
//             {isOpen && (
//                 <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
//                     <ul>
//                         {filteredOptions?.length > 0 ? (
//                             filteredOptions.map((option, index) => {
//                                 const uniqueId = option[uniqueKey];
//                                 const itemName = option[searchWithName];
//                                 return (
//                                     <li
//                                         key={uniqueId}
//                                         name={name}
//                                         className="my-1 px-2 py-1 cursor-pointer flex items-center gap-2"
//                                         onClick={() => {
//                                             // Set the displayed value in the input field
//                                             setDisplayValue(itemName);

//                                             // Close the dropdown
//                                             handleDropdownToggle(false);

//                                             // Send the ID and value to the parent via onChange
//                                             onChange({
//                                                 target: { name, value: uniqueId }, // Sends ID to the backend
//                                             });
//                                         }}
//                                         onMouseEnter={() => setIsHovered(index)}
//                                         onMouseLeave={() => setIsHovered(null)}
//                                         style={{
//                                             background:
//                                                 isHovered === index
//                                                     ? activeTheme.subMenuColor
//                                                     : "transparent",
//                                         }}
//                                     >
//                                         {itemName}
//                                     </li>
//                                 )
//                             })
//                         ) : (
//                             <li className="py-4 text-gray-500 text-center">
//                                 {filterText}
//                             </li>
//                         )}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default CustomSearchInputFields;


//=====================updated code===================
import React, { useState, useRef, useEffect } from "react";

function CustomSearchInputFields({
    id,
    name,
    label,
    value, // Receiving value from parent
    options,
    onChange,
    placeholder,
    readOnly = false,
    filterText = "No records found",
    activeTheme = { subMenuColor: "#e0f2fe" }, // Customize hover color
    searchWithName,
    uniqueKey,
    isMandatory = false
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(null);
    const [displayValue, setDisplayValue] = useState(""); // Value shown in the input
    const dropdownRef = useRef(null);

    //console.log(options);


    // Update displayValue when parent value changes
    useEffect(() => {
        if (value && typeof value === "object") {

            setDisplayValue(value[searchWithName] || "");
        } else {
            setDisplayValue("");
        }
    }, [value, searchWithName]);

    const handleDropdownToggle = (openState) => {
        setIsOpen(openState);
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const filteredOptions = options.filter((option) => {
        const searchField = option[searchWithName];
        return (
            searchField &&
            typeof searchField === "string" &&
            searchField.toLowerCase().includes(displayValue.toLowerCase())
        );
    });

    return (
        <div ref={dropdownRef} className="relative">
            {/* Input Field */}
            <input
                type="search"
                id={id}
                name={name}
                value={displayValue || ""}
                onChange={(e) => setDisplayValue(e.target.value)}
                onClick={() => handleDropdownToggle(true)}
                placeholder={placeholder}
                className={`inputPeerField peer ${isMandatory ? 'border-b-red-500' : 'border-borderColor'} focus:outline-none`}
                readOnly={readOnly}
            />
            <label htmlFor={id} className="menuPeerLevel">
                {label}
            </label>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
                    <ul>
                        {filteredOptions?.length > 0 ? (
                            filteredOptions.map((option, index) => {
                                const uniqueId = option[uniqueKey];
                                const itemName = option[searchWithName];
                                return (
                                    <li
                                        key={uniqueId}
                                        name={name}
                                        className="my-1 px-2 py-1 cursor-pointer flex items-center gap-2"
                                        onClick={() => {
                                            // Set the displayed value in the input field
                                            setDisplayValue(itemName);

                                            // Close the dropdown
                                            handleDropdownToggle(false);

                                            // Send the selected object to the parent component
                                            onChange({
                                                target: {
                                                    name,
                                                    value: {
                                                        [uniqueKey]: uniqueId,
                                                        [searchWithName]: itemName,
                                                    },
                                                },
                                            });
                                        }}
                                        onMouseEnter={() => setIsHovered(index)}
                                        onMouseLeave={() => setIsHovered(null)}
                                        style={{
                                            background:
                                                isHovered === index
                                                    ? activeTheme.subMenuColor
                                                    : "transparent",
                                        }}
                                    >
                                        {itemName}
                                    </li>
                                );
                            })
                        ) : (
                            <li className="py-4 text-gray-500 text-center">
                                {filterText}
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CustomSearchInputFields;
