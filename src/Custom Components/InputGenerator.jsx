import { CiCalendarDate } from "react-icons/ci";
import { useSelector } from "react-redux";
import UserCalendar from "../components/public/UserCalendar";
import React, { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import DatePicker from "react-datepicker"; // Add react-datepicker for date-time selection
import useRippleEffect from "../components/customehook/useRippleEffect";
import { useGetData } from "../service/apiService";

export function getFormattedDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = today.toLocaleString("en-US", { month: "short" });
  const year = today.getFullYear();

  return `${day}-${month}-${year}`;
}

export default function InputGenerator({
  inputFields = [],
  setValues,
  style = {},
}) {
  const [showCalendars, setShowCalendars] = useState({});
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [value, setValue] = useState("");
  const handleDateClick = (date, name, field) => {
    const formatDate = (date) => {
      const options = { day: "2-digit", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-GB", options).replace(/ /g, "-");
    };
    const formattedDate = formatDate(date);

    const DateData = { formattedDate: formattedDate, date: date };

    field?.customOnChange?.(formattedDate);
    field?.customDateData?.(DateData);

    document.getElementsByName(name)[0].value = formatDate(date);
    setShowCalendars((prevState) => ({ ...prevState, [name]: false }));
  };

  const toggleCalendar = (name) => {
    setShowCalendars((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const todayDate = getFormattedDate(); // Example output: 07-Feb-2025
  // console.log("input generator ", inputFields);

  const handleInputChange = (e, field) => {
    let inputValue = e.target.value;
    // let allowSpecialChars = allowSpecialChars || false;
    const numericRegex = field?.allowSpecialChars
      ? /[^0-9!@#$%^&*()_+=\-\[\]{};:'",.<>?/\\]/g
      : /\D/g;
    let targetValue = inputValue.replace(numericRegex, "");
    field?.onChange && field.onChange(e.target.value, targetValue);
    setValue(inputValue.replace(numericRegex, ""));
  };
  const handleInputChange1 = (e, field) => {
    let inputValue = e.target.value;

    // Allow only numeric values (0-9)
    const numericRegex = /\D/g; // Matches any non-digit character
    let targetValue = inputValue.replace(numericRegex, "");

    // Call the onChange function if provided
    field?.onChange && field.onChange(targetValue);

    // Update the state with the numeric value
    setValue(targetValue);
  };

  return (
    <>
      {inputFields.map((field, index) => (
        <React.Fragment key={index}>
          <div
            key={index}
            style={field?.mainStyle ? field?.mainStyle : { height: "1.6rem" }}
            className="relative flex-1"
          >
            {field?.type === "select" ? (
              <>
                <select
                  style={field?.style}
                  name={field?.name}
                  required={field?.required}
                  onChange={field?.callBack}
                  value={field?.value}
                  className={`inputPeerField cursor-pointer ${field?.required ? "border-b-red-500" : ""
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
                      field?.showValueField ||
                      Object.keys(option)[1] ||
                      Object.keys(option)[0]; // Second available key or fallback

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
              <div
                style={field?.style}
                className="relative flex-1 flex items-center gap-1 w-full justify-between"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    style={field?.inputStyle}
                    id={field?.name}
                    name={field?.name}
                    defaultValue={field?.ShowDate || todayDate}
                    placeholder={""}
                    onChange={(e) => {
                      field?.onChange?.(e.target.value); // Calls field's internal onChange
                    }}
                    className={`inputPeerField peer border-borderColor ${field?.required ? "border-b-red-500" : ""
                      } focus:outline-none`}
                  />
                  <label htmlFor={field?.name} className="menuPeerLevel">
                    {field?.label}
                  </label>
                </div>

                <div style={{}}>
                  <div
                    className="h-6 flex justify-center items-center cursor-pointer rounded font-semibold w-6"
                    onClick={() => toggleCalendar(field?.name)}
                    style={{
                      ...field?.iconStyle,
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
                      minDate={field?.minDate}
                      tillDate={field?.tillDate}
                      currentDate={field?.currentDate}
                      onDateClick={(date) =>
                        handleDateClick(date, field?.name, field)
                      }
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
            ) : field?.type === "number" ? (
              <>
                <input
                  type="text"
                  name={field?.name}
                  value={field?.value}
                  style={field?.style}
                  maxLength={field?.maxLength}
                  readOnly={field?.readOnly}
                  required={field?.required}
                  onChange={(e) => {
                    handleInputChange1(e, field);
                  }}
                  placeholder={field?.placeholder || ""}
                  className={`inputPeerField peer focus:outline-none`}
                />
                <label htmlFor={field?.name} className="menuPeerLevel">
                  {field?.label}
                </label>
              </>
            ) : (
              <>
                <input
                  type={field?.type}
                  name={field?.name}
                  style={field?.style}
                  maxLength={field?.maxLength}
                  value={field?.value} // Ensure the value is correctly assigned
                  readOnly={field?.readOnly}
                  required={field?.required}
                  onChange={(e) => {
                    field?.onChange && field.onChange(e.target.value);
                  }}
                  placeholder={field?.placeholder || ""}
                  className={`inputPeerField peer focus:outline-none`}
                />
                <label htmlFor={field?.name} className="menuPeerLevel">
                  {field?.label}
                </label>
              </>
            )}
          </div>
        </React.Fragment>
      ))}
    </>
  );
}

export const DateInputWithTime = ({ field = {} }) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [selectedDate, setSelectedDate] = useState(
    field?.value ? new Date(field.value) : null
  );
  const [showCalendar, setShowCalendar] = useState(false);

  // Format Date & Time (e.g., "2-Mar-2025 14:30")
  const formatDateTime = (date) => {
    if (!date) return "";
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = date
      .toLocaleDateString("en-GB", options)
      .replace(/ /g, "-");
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };

  const handleDateTimeChange = (date) => {
    setSelectedDate(date);
    const formattedDateTime = formatDateTime(date);

    // Call external handlers if provided
    field?.customOnChange?.(formattedDateTime);
    field?.customDateData?.({ formattedDate: formattedDateTime, date });

    setShowCalendar(false);
  };

  return (
    <div
      style={field?.style}
      className="relative flex-1 flex items-center gap-1 w-full justify-between"
    >
      {/* Input Field */}
      <div className="relative flex-1">
        <input
          type="text"
          style={field?.inputStyle}
          id={field?.name}
          name={field?.name}
          value={selectedDate ? formatDateTime(selectedDate) : ""}
          placeholder="Select Date & Time"
          readOnly
          className={`inputPeerField peer border-borderColor ${field?.required ? "border-b-red-500" : ""
            } focus:outline-none`}
        />
        <label htmlFor={field?.name} className="menuPeerLevel">
          {field?.label}
        </label>
      </div>

      {/* Calendar Icon */}
      <div className="h-6 flex justify-center items-center cursor-pointer rounded font-semibold w-6">
        {field?.editable && (
          <CiCalendarDate
            className="w-5 h-5 font-semibold"
            onClick={() => setShowCalendar(!showCalendar)}
            style={{
              ...field?.iconStyle,
              background: activeTheme?.menuColor,
              color: activeTheme?.iconColor,
            }}
          />
        )}
      </div>

      {/* Date & Time Picker Popup */}
      {showCalendar && (
        <div
          style={{ position: "absolute", top: "100%", left: "0", zIndex: 50 }}
        >
          <DatePicker
            selected={selectedDate}
            onChange={handleDateTimeChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="d-MMM-yyyy HH:mm"
            className="bg-white shadow-lg rounded p-2"
          />
        </div>
      )}
    </div>
  );
};

export const DateInput = ({ field = {} }) => {
  // Helper function to format date
  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options).replace(/ /g, "-");
  };
  const [showCalendars, setShowCalendars] = useState({});
  const [selectedDate, setSelectedDate] = useState(field?.value); // Store selected date
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  console.log(field?.value);
  const handleDateClick = (date, name) => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate); // Update state
    const DateData = { formattedDate, date };

    // Call external handlers if provided
    field?.customOnChange?.(formattedDate);
    field?.customDateData?.(DateData);

    // Close the calendar popup for this input
    setShowCalendars((prevState) => ({ ...prevState, [name]: false }));
  };

  const toggleCalendar = (name) => {
    setShowCalendars((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <div
      style={field?.style}
      className="relative flex-1 flex items-center gap-1 w-full justify-between"
    >
      {/* Input Field */}
      <div className="relative flex-1">
        <input
          type="text"
          style={field?.inputStyle}
          id={field?.name}
          name={field?.name}
          value={selectedDate} // Now updates dynamically
          placeholder=""
          readOnly // Prevent manual typing if using a calendar picker
          className={`inputPeerField peer border-borderColor ${field?.required ? "border-b-red-500" : ""
            } focus:outline-none`}
        />
        <label htmlFor={field?.name} className="menuPeerLevel">
          {field?.label}
        </label>
      </div>

      {/* Calendar Icon */}
      <div className="h-6 flex justify-center items-center cursor-pointer rounded font-semibold w-6">
        {field?.editable && (
          <CiCalendarDate
            className="w-5 h-5 font-semibold"
            onClick={() => toggleCalendar(field?.name)}
            style={{
              ...field?.iconStyle,
              background: activeTheme?.menuColor,
              color: activeTheme?.iconColor,
            }}
          />
        )}
      </div>

      {/* Calendar Popup */}
      {showCalendars[field?.name] && (
        <div
          style={{ width: "250px", marginLeft: "-125px" }}
          className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded z-50"
        >
          <UserCalendar
            onDateClick={(date) => handleDateClick(date, field?.name)}
          />
        </div>
      )}
    </div>
  );
};

export const NumericInput = ({
  allowSpecialChars = false,
  label = "",
  name = "number",
  onChange = () => { },
  placeholder = "",
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    let inputValue = e.target.value;
    const numericRegex = allowSpecialChars
      ? /[^0-9!@#$%^&*()_+=\-\[\]{};:'",.<>?/\\]/g
      : /\D/g;
    onChange(e);
    setValue(inputValue.replace(numericRegex, ""));
  };

  return (
    <>
      <input
        type="text"
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        className={`inputPeerField peer focus:outline-none`}
      />
      <label htmlFor={name} className="menuPeerLevel">
        {label}
      </label>
    </>
  );
};

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
        className={`flex peer items-center border-[1.5px] rounded text-xxxs h-[1.6rem] text-[#495057] my-1 bg-white ${isValid ? "border-b-red-500" : "border-borderColor"
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
  disabled = false,
  callBack = () => { },
  style,
  themecolor = null
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
          disabled={disabled}
          onClick={(e) => {
            handleClick(e); // Call the ripple effect handler
            callBack(); // Directly pass the callback
          }}
          className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          style={{
            ...style,
            background: disabled
              ? activeTheme?.menuColor
              : activeTheme?.menuColor,
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
  callBack = () => { },
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

export const TwoSubmitButton = ({
  options = [],
  NoSpace = false,
  style = {},
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);

  // Split the options into pairs
  const buttonPairs = [];
  for (let i = 0; i < options.length; i += 2) {
    buttonPairs.push(options.slice(i, i + 2));
  }
  useRippleEffect();
  return (
    <div style={style} className="flex flex-col gap-2">
      {buttonPairs.map(
        (pair, index) =>
          pair?.label !== "" && (
            <div key={index} className="flex gap-2">
              {pair.map((button, btnIndex) => (
                <div
                  style={button?.style}
                  key={btnIndex}
                  className="relative flex-1 flex justify-start items-center"
                >
                  <button
                    type={button.submit ? "submit" : "button"}
                    data-ripple-light="true"
                    onClick={button.callBack}
                    disabled={button.disabled}
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
              {!NoSpace && pair.length === 1 && <div className="flex-1"></div>}
            </div>
          )
      )}
    </div>
  );
};

export const ClickChangeButton = ({
  text,
  submit = true,
  callBack = () => { },
  style,
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const buttonRef = useRef(null); // Added ref for the button
  const [isClicked, setIsclicked] = useState(submit);

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
          // type={submit ? "submit" : "button"}
          type={"button"}
          data-ripple-light="true"
          onClick={(e) => {
            setIsclicked(!isClicked);
            handleClick(e); // Call the ripple effect handler
            callBack(); // Directly pass the callback
          }}
          className="overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer"
          style={{
            ...style,
            background: isClicked ? activeTheme?.menuColor : "transparent",
            color: isClicked ? activeTheme?.iconColor : "black",
            border: isClicked ? "none" : `1px solid black`,
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

export const MinMaxInputGenerator = ({ inputFields }) => {
  return (
    <div>
      {inputFields.map((field, index) => (
        <div key={index} className="relative flex-1">
          <input
            type={field?.type}
            name={field?.name}
            style={field?.style}
            value={field?.value} // Ensure the value is correctly assigned
            readOnly={field?.readOnly}
            onChange={(e) => {
              const value = e.target.value;
              if (
                (!field.minChars || value.length >= field.minChars) &&
                (!field.maxChars || value.length <= field.maxChars)
              ) {
                field?.onChange && field.onchange(e);
              }
            }}
            placeholder={field?.placeholder || ""}
            className={`inputPeerField peer border-borderColor ${field?.required ? "border-b-red-500" : ""
              } focus:outline-none`}
          />
          <label htmlFor={field?.name} className="menuPeerLevel">
            {field?.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export const StatusSubmitButton = ({
  text,
  submit = true,
  callBack = () => { },
  style,
  themecolor = null
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
            background: themecolor !== null ? themecolor : activeTheme?.menuColor,
            color: activeTheme?.iconColor,
          }}
        >
          <span
            style={{
              backgroundColor: themecolor !== null ? themecolor : text?.rowcolor,
              padding: "2px",
              borderRadius: "10px",
            }}
          >
            {text?.investigationName}
          </span>
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

export const ClickChangeButton1 = ({ text, isActive, onToggle, style }) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [isClicked, setIsClicked] = useState(isActive);

  const handleClick = () => {
    const newState = isClicked ? 0 : 1;
    setIsClicked(newState);
    onToggle(text, newState);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer"
      style={{
        ...style,
        height: "1rem",
        background: isClicked ? activeTheme?.menuColor : "transparent",
        color: isClicked ? activeTheme?.iconColor : "black",
        border: isClicked ? "none" : `1px solid black`,
      }}
    >
      {text}
    </button>
  );
};

export const WeekdayToggle = ({ setDays, days }) => {
  const handleToggle = (day, newState) => {
    setDays((prev) => ({ ...prev, [day]: newState }));
    console.log("Updated Days:", { ...days, [day]: newState }); // Logs updated state
  };

  return (
    <div style={{ display: "flex", gap: "3px", fontSize: "15px" }}>
      {Object.keys(days).map((day) => (
        <ClickChangeButton1
          key={day}
          text={day}
          isActive={days[day] === 1}
          onToggle={handleToggle}
          style={{ width: "40px", fontSize: "0.75rem", height: "20px" }}
        />
      ))}
    </div>
  );
};

export const TwoLegendButton = ({
  options = [],
  NoSpace = false,
  style = {},
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const { data, fetchData } = useGetData();

  useEffect(() => {
    fetchData("/LegendColorMaster");
  }, []);

  // Split the options into pairs
  const buttonPairs = [];
  for (let i = 0; i < options.length; i += 2) {
    buttonPairs.push(options.slice(i, i + 2));
  }

  useRippleEffect();

  return (
    <div style={style} className="flex flex-col gap-2">
      {buttonPairs.map((pair, index) => (
        <div key={index} className="flex gap-2">
          {pair.map((button, btnIndex) => {
            // Find matching data object based on id
            const matchingData = data?.find((item) => item.id === button.id);

            return (
              <div
                key={btnIndex}
                className="relative flex-1 flex justify-start items-center"
              >
                <button
                  type={button.submit ? "submit" : "button"}
                  data-ripple-light="true"
                  onClick={button.callBack}
                  disabled={button.disabled}
                  className="overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer"
                  style={{
                    background:
                      matchingData?.colourCode || activeTheme?.menuColor, // Dynamic color or default theme
                    color: activeTheme?.iconColor,
                    ...button.style, // Allow custom styles
                  }}
                >
                  {matchingData?.contantName || button.label || "Button"}
                </button>
              </div>
            );
          })}
          {/* If there is an odd number of buttons, fill the gap */}
          {!NoSpace && pair.length === 1 && <div className="flex-1"></div>}
        </div>
      ))}
    </div>
  );
};

export const IconButton = ({ icon: Icon, onClick, title, style = {},className="h-4 w-4" }) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  return (
    <div
      className="w-5 h-5 flex justify-center items-center rounded-sm cursor-pointer"
      style={{
        background: activeTheme?.menuColor,
        color: activeTheme?.iconColor,
        ...style,
      }}
      onClick={onClick}
      title={title}
    >
      <Icon className={className}/>
    </div>
  );
};
