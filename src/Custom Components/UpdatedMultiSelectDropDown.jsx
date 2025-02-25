import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useSelector } from "react-redux";

export const UpdatedMultiSelectDropDown = ({
  id,
  name,
  label,
  placeHolder,
  options,
  isMandatory = false,
  isDisabled = false,
  optionKey = "id", // Default key property
  optionValue = ["fName", "lName"], // Array of fields to combine
  selectedValues, // Array of selected values (e.g., ["1", "2"])
  setSelectedValues, // Function to update selected values
  dataDependOnOther = false,
  dataDependOnOtherLable,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  // Internal state for dropdown visibility, hover, and search query
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Ref for detecting clicks outside the dropdown
  const dropdownRef = useRef(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  // Handle option selection (toggle checkbox)
  const handleOptionClick = (option) => {
    const selectedId = option[optionKey].toString();
    const isSelected = selectedValues.includes(selectedId);

    if (isSelected) {
      // Remove the option if already selected
      setSelectedValues((prev) => prev.filter((id) => id !== selectedId));
    } else {
      // Add the option if not selected
      setSelectedValues((prev) => [...prev, selectedId]);
    }
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all options
      const allIds = options.map((option) => option[optionKey].toString());
      setSelectedValues(allIds);
    } else {
      // Deselect all options
      setSelectedValues([]);
    }
  };

  // Filter options based on search query
  const filteredOptions = options.filter((option) => {
    const combinedValue = optionValue
      .map((field) => option[field])
      .join(" ")
      .toLowerCase();
    return combinedValue.includes(searchQuery.toLowerCase());
  });

  // Combine fields for display
  const getCombinedValue = (option) => {
    return optionValue.map((field) => option[field]).join(" ");
  };

  // Display text in the input field
  const displayText =
    selectedValues.length > 0
      ? `${selectedValues.length} ${label}${
          selectedValues.length > 1 ? "s" : ""
        } selected`
      : placeHolder;

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      {/* Input Field */}
      <div
        className={`flex justify-between pl-2 items-center border-[1.5px] border-borderColor font-semibold rounded text-xxxs h-[1.6rem] text-[#495057] my-1 ${
          isDisabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
        } ${isMandatory ? "border-b-red-500" : ""}`}
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
      >
        <label htmlFor={id} className="menuPeerLevel">
          {label}
        </label>
        <div>{displayText}</div>
        <div>
          {isDropdownVisible ? (
            <RiArrowDropUpLine className="text-xl cursor-pointer" />
          ) : (
            <RiArrowDropDownLine className="text-xl cursor-pointer" />
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {isDropdownVisible && !isDisabled && (
        <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
          {filteredOptions?.length === 0 && dataDependOnOther === true ? (
            <div className="py-4 text-gray-500 text-center">
              {dataDependOnOtherLable}
            </div>
          ) : (
            <ul>
              {/* Search Input */}
              <li className="my-1 px-2 cursor-pointer flex justify-start items-center gap-2 w-full">
                <div>
                  <input
                    type="checkbox"
                    checked={selectedValues.length === options.length}
                    onChange={handleSelectAll}
                  />
                </div>
                <div className="w-full">
                  <input
                    type="search"
                    name="searchDropdown"
                    id="searchDropdown"
                    className="border-[1px] outline-none rounded-md w-full px-2 my-1 h-[1.5rem]"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={placeHolder}
                  />
                </div>
              </li>

              {/* Individual Options */}
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => {
                  const valueKey = optionKey || Object.keys(option)[0]; // First available key as value
                  return (
                    <li
                      key={option[valueKey]}
                      className="my-1 px-2 py-1 cursor-pointer flex justify-start items-center gap-2"
                      onClick={() => handleOptionClick(option)} // Click anywhere on the item to toggle
                      onMouseEnter={() => setIsHovered(index)}
                      onMouseLeave={() => setIsHovered(null)}
                      style={{
                        background:
                          isHovered === index
                            ? activeTheme?.subMenuColor
                            : "transparent",
                      }}
                    >
                      <div>
                        <input
                          type="checkbox"
                          checked={selectedValues.includes(
                            option[optionKey].toString()
                          )}
                          onChange={() => handleOptionClick(option)} // Ensure checkbox also works
                          onClick={(e) => e.stopPropagation()} // Prevent double-triggering
                        />
                      </div>
                      <div>{getCombinedValue(option)}</div>
                    </li>
                  );
                })
              ) : (
                <li className="py-4 text-gray-500 text-center">
                  {import.meta.env.VITE_API_RECORD_NOT_FOUND ||
                    "No records found"}
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
