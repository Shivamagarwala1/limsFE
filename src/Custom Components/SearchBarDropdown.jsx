import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const SearchBarDropdown = ({
  id,
  name,
  value,
  onChange,
  label,
  options = [],
  isRequired,
  keyField,
  showValueField,
  placeholder = "Search Data",
  showSearchBarDropDown,
  maxLength,
  setShowSearchBarDropDown,
  callback = () => {},
  handleOptionClickForCentre,
  setIsHovered,
  isHovered,
  style = {},
  Inputstyle = {},
  disableDroDown = false,
}) => {
  const dropdownRef = useRef(null);
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [filteredOptions, setFilteredOptions] = useState(options); // Holds filtered options

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
  }, [showSearchBarDropDown, setShowSearchBarDropDown]);

  // 🔹 Update filtered options when the user types
  useEffect(() => {
    if (value.trim() === "") {
      setFilteredOptions(options); // Reset if no input
    } else {
      const lowerCaseValue = value.toLowerCase();
      const newFilteredOptions = options.filter((option) => {
        const labelKey = showValueField || Object.keys(option)[1] || keyField;
        return option[labelKey]?.toLowerCase().includes(lowerCaseValue);
      });
      setFilteredOptions(newFilteredOptions);
    }
  }, [value, options, keyField, showValueField]);

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <div
        style={style}
        className="flex peer items-center border-[1.5px] rounded text-xxxs h-[1.6rem] text-[#495057] my-1 bg-white"
      >
        <input
          style={Inputstyle}
          type="search"
          id={id}
          name={name}
          value={value}
          maxLength={maxLength}
          disabled={disableDroDown}
          onChange={onChange}
          autoComplete="off"
          className="w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
          placeholder={placeholder}
          onClick={() => setShowSearchBarDropDown(true)}
          required={isRequired}
        />
        <label htmlFor={id} className="menuPeerLevel">
          {label}
        </label>
      </div>
      {!disableDroDown && (
        <>
          {showSearchBarDropDown && (
            <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
              <ul>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => {
                    const valueKey = keyField || Object.keys(option)[0]; // First available key as value
                    const labelKey =
                      showValueField || Object.keys(option)[1] || valueKey; // Second available key or fallback

                    return (
                      <li
                        key={option[valueKey] || index}
                        className="my-1 py-1 px-2 cursor-pointer"
                        onClick={() => {
                          handleOptionClickForCentre(
                            option[labelKey],
                            option[valueKey]
                          );
                          callback(option[valueKey]);
                        }}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
                        style={{
                          background:
                            isHovered === index
                              ? activeTheme?.subMenuColor
                              : "transparent",
                        }}
                      >
                        {option[labelKey]}
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
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchBarDropdown;
