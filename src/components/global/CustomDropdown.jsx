import React, { useState, useRef, useEffect } from "react";

function CustomDropdown({
  id,
  name,
  label,
  value,
  options = [],
  onChange,
  readOnly = false,
  defaultIndex = 0,
  isDisabled = false,
  showLabel = true,
  activeTheme = { subMenuColor: "#e0f2fe" }, // Customize hover color here
  isMandatory
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const dropdownRef = useRef(null);

  const handleDropdownClick = () => {
    setIsOpen((prev) => !prev);
  };


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div ref={dropdownRef}>
      {/* Hidden input for accessibility */}
      <input
        type="text"
        id={id}
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange(e)}
        className="sr-only"
        aria-hidden="true"
      />

      {/* Dropdown box */}
      <div
        className={`inputPeerField  mt-[1.5px] peer focus:outline-none flex items-center 
          
          ${isMandatory ? "border-b-red-500" : "border-borderColor"
          }  ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer bg-white'} pl-2`}
        onClick={handleDropdownClick}

      >
        {value !== ""
          ? options.find((opt) => opt.value === value)?.label
          : options[defaultIndex]?.label || label}
      </div>

      {/* Dropdown menu */}
      {

        !readOnly && (

          !isDisabled && (
            isOpen && (
              <div className="absolute border-[1px] rounded-md z-50 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs"

              //!=====need to check======
              // style={{
              //   position: "fixed", // Fix position to prevent clipping
              //   // top: dropdownPosition?.top, // Dynamically adjust dropdown position
              //   // left: dropdownPosition?.left,
              //   width: dropdownRef.current?.offsetWidth,
              // }}
              >
                {options.map((option, index) => {

                  return (
                    <div
                      key={index}
                      className={`my-1 py-1 px-2 cursor-pointer ${isDisabled ? 'cursor-not-allowed ' : option.disabled ? "text-gray-400 cursor-not-allowed" : ""
                        }`}
                      onMouseEnter={() => setIsHovered(index)}
                      onMouseLeave={() => setIsHovered(null)}
                      style={{
                        background:
                          isHovered === index ? activeTheme?.subMenuColor : "transparent",
                      }}
                      onClick={() => {
                        if (!isDisabled) {
                          if (!option.disabled) {
                            onChange({ target: { name, value: option.value } });
                            setIsOpen(false);
                          }
                        }

                      }}
                    >
                      {option.label}
                    </div>
                  )
                }
                )}
              </div>
            ))
        )
      }

      {/* Dropdown label */}
      {
        showLabel && (
          <label
            htmlFor={id}
            className={`menuPeerLevel ${options?.length !== 0 && "-mt-[2px]"}`}
          >
            {label}
          </label>
        )
      }

    </div>

  );
}

export default CustomDropdown;
