import { CiCalendarDate } from "react-icons/ci";
import { useSelector } from "react-redux";
import UserCalendar from "../components/public/UserCalendar";
import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import useRippleEffect from "../components/customehook/useRippleEffect";

export default function InputGenerator({ inputFields = [], setValues }) {
  const [showCalendars, setShowCalendars] = useState({});
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  const handleDateClick = (date, name) => {
    const formatDate = (date) => {
      const options = { day: "2-digit", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-GB", options).replace(/ /g, "-");
    };

    document.getElementsByName(name)[0].value = formatDate(date);
    setShowCalendars((prevState) => ({ ...prevState, [name]: false }));
  };

  const toggleCalendar = (name) => {
    setShowCalendars((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  function getFormattedDate() {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, "0");
    const month = today.toLocaleString("en-US", { month: "short" });
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const todayDate = getFormattedDate(); // Example output: 07-Feb-2025
  console.log("input generator ", inputFields);
  return (
    <>
      {inputFields.map((field, index) => (
        <div key={index} className="relative flex-1">
          {field?.type === "select" ? (
            <>
              <select
                style={field?.style}
                name={field?.name}
                onChange={field?.callBack}
                className={`inputPeerField cursor-pointer ${
                  field?.required ? "border-b-red-500" : "border-b-green-300"
                } peer border-borderColor focus:outline-none`}
              >
                {field?.defaultView ? (
                  ""
                ) : (
                  <option value="" hidden>
                    Select Option
                  </option>
                )}
                {(field?.dataOptions || []).map((option, idx) => {
                  const valueKey = field?.keyField || Object.keys(option)[0]; // First available key as value
                  const labelKey =
                    field?.showValueField || Object.keys(option)[1]; // Second available key or fallback

                  return (
                    <option
                      key={option[valueKey] || idx}
                      value={option[valueKey]}
                    >
                      {option[labelKey]}
                    </option>
                  );
                })}
              </select>
              <label htmlFor={field?.name} className="menuPeerLevel">
                {field?.label}
              </label>
            </>
          ) : field?.type === "customDateField" ? (
            <div className="relative flex-1 flex items-center gap-1 w-full justify-between">
              <div className="relative flex-1">
                <input
                  type="text"
                  id={field?.name}
                  name={field?.name}
                  defaultValue={todayDate}
                  placeholder={""}
                  className={`inputPeerField peer border-borderColor ${
                    field?.required ? "border-b-red-500" : "border-b-green-300"
                  } focus:outline-none`}
                />
                <label htmlFor={field?.name} className="menuPeerLevel">
                  {field?.label}
                </label>
              </div>

              <div>
                <div
                  className="h-6 flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                  onClick={() => toggleCalendar(field?.name)}
                  style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                  }}
                >
                  <CiCalendarDate className="w-5 h-5 font-semibold" />
                </div>
              </div>

              {showCalendars[field?.name] && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded z-50">
                  <UserCalendar
                    onDateClick={(date) => handleDateClick(date, field?.name)}
                  />
                </div>
              )}
            </div>
          ) : field?.type === "checkbox" ? (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name={field?.name}
                style={{ marginTop: "8px" }}
                checked={field?.value}
                onChange={(e) =>
                  field?.onChange && field.onChange(e.target.checked)
                }
                className="cursor-pointer"
              />
              <div
                style={{ marginTop: "10px", marginLeft: "10px" }}
                htmlFor={field?.name}
                className="menuPeerLevel"
              >
                {field?.label}
              </div>
            </div>
          ) : field?.type === "newSelect" ? (
            <>
              <SearchBarDropdown
                id={field?.id}
                name={field?.name}
                onChange={field?.callBack}
                label={field?.label}
                options={[
                  // Change this from dataOption to dataOptions
                  {
                    centreId: 1,
                    companyName: "GENERIC DIAGNOSTIC PVT. LTD.",
                  },
                  {
                    centreId: 2,
                    companyName: "iMS",
                  },
                  {
                    centreId: 3,
                    companyName: "imarsar satelite",
                  },
                  {
                    centreId: 4,
                    companyName: "imarsar subfranch",
                  },
                ]}
                activeTheme={activeTheme}
                isValid={field?.required}
                showSearchBarDropDown={field?.showSearchBarDropDown}
                setShowSearchBarDropDown={field?.setShowSearchBarDropDown}
                handleOptionClickForCentre={field?.handleOptionClickForCentre}
                setIsHovered={field?.setIsHovered}
                isHovered={field?.isHovered}
              />
            </>
          ) : (
            <>
              <input
                type={field?.type}
                name={field?.name}
                style={field?.style}
                value={field?.value} // Ensure the value is correctly assigned
                readOnly={field?.readOnly}
                onChange={(e) => {
                  if (!field?.readOnly && field?.onChange) {
                    field.onChange(e.target.value);
                  }
                }}
                placeholder={field?.placeholder || ""}
                className={`inputPeerField peer border-borderColor ${
                  field?.required ? "border-b-red-500" : "border-b-green-300"
                } focus:outline-none`}
              />
              <label htmlFor={field?.name} className="menuPeerLevel">
                {field?.label}
              </label>
            </>
          )}
        </div>
      ))}
    </>
  );
}

const SearchBarDropdown = ({
  id,
  name,
  value,
  onChange,
  label,
  options,
  activeTheme,
  isValid,
  showSearchBarDropDown,
  setShowSearchBarDropDown,
  handleOptionClickForCentre,
  setIsHovered,
  isHovered,
}) => {
  const dropdownRef = useRef(null);

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
  console.log(options);
  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <div
        className={`flex peer items-center border-[1.5px] rounded text-xxxs h-[1.6rem] text-[#495057] my-1 bg-white ${
          isValid ? "border-b-red-500" : "border-borderColor"
        }`}
      >
        <input
          type="search"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="off"
          className="w-full rounded-r rounded-md border-0 text-xxxs font-semibold px-2 pt-1 focus:outline-none"
          placeholder="Search Data"
          onClick={() => setShowSearchBarDropDown(true)}
          required
        />
        <label
          style={{ top: "-0.35rem" }}
          htmlFor={id}
          className="menuPeerLevel"
        >
          {label}
        </label>
      </div>

      {showSearchBarDropDown && (
        <div className="absolute border-[1px] rounded-md z-30 shadow-lg max-h-56 w-full bg-white overflow-y-auto text-xxxs">
          <ul>
            {options.length > 0 ? (
              options.map((data, index) => (
                <li
                  key={data.centreId}
                  className="my-1 py-1 px-2 cursor-pointer"
                  onClick={() =>
                    handleOptionClickForCentre(
                      data?.companyName,
                      data?.centreId
                    )
                  }
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                  style={{
                    background:
                      isHovered === index
                        ? activeTheme?.subMenuColor
                        : "transparent",
                  }}
                >
                  {data?.companyName}
                </li>
              ))
            ) : (
              <li className="py-4 text-gray-500 text-center">
                {import.meta.env.VITE_API_RECORD_NOT_FOUND ||
                  "No records found"}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export const SubmitButton = ({
  text,
  submit = true,
  callBack = () => {},
  style,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const buttonRef = useRef(null); // Added ref for the button

  const handleClick = (e) => {
    const button = buttonRef.current;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple");

    button.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 600); // Duration of the ripple effect
  };

  return (
    <div className="flex gap-[0.25rem]">
      <div className="relative flex-1 gap-1 flex justify-start items-center">
        <button
          ref={buttonRef} // Attach ref to the button
          type={submit ? "submit" : "button"}
          data-ripple-light="true"
          onClick={(e) => {
            handleClick(e); // Call the ripple effect handler
            callBack(); // Directly pass the callback
          }}
          className="overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer"
          style={{
            ...style,
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
          }}
        >
          {text}
        </button>
        <style jsx>{`
          .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6); // Adjust color as needed
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
          }

          @keyframes ripple-animation {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export const ButtonWithImage = ({
  text,
  img = "",
  submit = true,
  callBack = () => {},
  style,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  return (
    <div className="flex gap-[0.25rem]">
      <div className="relative flex-1 gap-1 flex justify-start items-center">
        <button
          type={submit ? "submit" : "button"} // Corrected type handling
          data-ripple-light="true"
          onClick={callBack} // Directly pass the callback
          className="font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer"
          style={{
            ...style, // Spread the incoming style prop first to allow overrides
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
          }}
        >
          {img !== "" ? (
            <>
              <img src={img} alt="img" className="rounded-full mr-1" />
            </>
          ) : (
            <FaUser className="mr-1" />
          )}
          {text}
        </button>
      </div>
    </div>
  );
};

export const TwoSubmitButton = ({ options = [] }) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  // Split the options into pairs
  const buttonPairs = [];
  for (let i = 0; i < options.length; i += 2) {
    buttonPairs.push(options.slice(i, i + 2));
  }
  useRippleEffect();
  return (
    <div className="flex flex-col gap-2">
      {buttonPairs.map(
        (pair, index) =>
          pair?.label !== "" && (
            <div key={index} className="flex gap-[0.25rem]">
              {pair.map((button, btnIndex) => (
                <div
                  key={btnIndex}
                  className="relative flex-1 flex justify-start items-center"
                >
                  <button
                    type={button.submit ? "submit" : "button"}
                    data-ripple-light="true"
                    onClick={button.callBack}
                    className="overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer"
                    style={{
                      background: activeTheme?.menuColor,
                      color: activeTheme?.iconColor,
                      ...button.style, // Allow individual button styles
                    }}
                  >
                    {button.label || "Button"}{" "}
                    {/* Default text if label is missing */}
                  </button>
                </div>
              ))}
              {/* If there is an odd number of buttons, fill the gap */}
              {pair.length === 1 && <div className="flex-1"></div>}
            </div>
          )
      )}
    </div>
  );
};
