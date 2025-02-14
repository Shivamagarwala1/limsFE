import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const MultiSelectDropdown = ({
  id,
  name,
  selectedValues = [],
  setSelectedValues,
  onChange,
  label,
  options = [],
  isRequired,
  keyField,
  showValueField,
  placeholder = "Search Data",
  showSearchBarDropDown,
  setShowSearchBarDropDown,
}) => {
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovered, setIsHovered] = useState(null);
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSearchBarDropDown(false);
      }
    };

    if (showSearchBarDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchBarDropDown]);

  const handleOptionClick = (option) => {
    const valueKey = keyField || Object.keys(option)[0];
    const labelKey = showValueField || Object.keys(option)[1] || valueKey;

    const alreadySelected = selectedValues.some(
      (item) => item[valueKey] === option[valueKey]
    );

    if (alreadySelected) {
      setSelectedValues(
        selectedValues.filter((item) => item[valueKey] !== option[valueKey])
      );
    } else {
      setSelectedValues([...selectedValues, { [valueKey]: option[valueKey], label: option[labelKey] }]);
    }

    onChange && onChange([...selectedValues]);
  };

  const handleRemoveSelected = (valueKey) => {
    setSelectedValues(selectedValues.filter((item) => item[keyField] !== valueKey));
  };

  const filteredOptions = options.filter((option) =>
    option[showValueField || keyField]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <div
        style={{ height: "auto", minHeight: "1.6rem", marginTop: "0.10rem" }}
        className={`flex flex-wrap items-center border-[1.5px] rounded text-xxxs text-[#495057] my-1 bg-white p-1 ${
          isRequired ? "border-b-red-500" : "border-b-green-300"
        }`}
        onClick={() => setShowSearchBarDropDown(!showSearchBarDropDown)}
      >
        {/* Selected Items */}
        {selectedValues.map((item) => (
          <span
            key={item[keyField]}
            className="flex items-center px-2 py-1 text-xs bg-gray-200 rounded m-1"
          >
            {item.label}
            <button
              type="button"
              className="ml-2 text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveSelected(item[keyField]);
              }}
            >
              ✕
            </button>
          </span>
        ))}

        {/* Search Input */}
        <input
          type="search"
          id={id}
          name={name}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete="off"
          className="w-full rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
          placeholder={placeholder}
        />
        <label htmlFor={id} className="menuPeerLevel">
          {label}
        </label>
      </div>

      {/* Dropdown List */}
      {showSearchBarDropDown && (
        <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const valueKey = keyField || Object.keys(option)[0];
                const labelKey = showValueField || Object.keys(option)[1] || valueKey;
                const isSelected = selectedValues.some((item) => item[valueKey] === option[valueKey]);

                return (
                  <li
                    key={option[valueKey] || index}
                    className={`my-1 py-1 px-2 cursor-pointer flex justify-between ${
                      isSelected ? "bg-blue-100" : "bg-white"
                    }`}
                    onClick={() => handleOptionClick(option)}
                    onMouseEnter={() => setIsHovered(index)}
                    onMouseLeave={() => setIsHovered(null)}
                    style={{
                      background: isHovered === index ? activeTheme?.subMenuColor : "transparent",
                    }}
                  >
                    {option[labelKey]}
                    {isSelected && <span className="text-green-500 font-bold">✔</span>}
                  </li>
                );
              })
            ) : (
              <li className="py-4 text-gray-500 text-center">
                {import.meta.env.VITE_API_RECORD_NOT_FOUND || "No records found"}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
