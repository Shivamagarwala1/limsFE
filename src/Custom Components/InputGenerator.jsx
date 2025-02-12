import { CiCalendarDate } from "react-icons/ci";
import { useSelector } from "react-redux";
import UserCalendar from "../components/public/UserCalendar";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

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
// console.log("input generator ",inputFields)
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
                {field?.defaultView ? "" : <option value="" hidden>
                  Select Option
                </option>}
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
          )  : field?.type === "checkbox" ? (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name={field?.name}
                style={{marginTop:"8px"}}
                checked={field?.value}
                onChange={(e) => field?.onChange && field.onChange(e.target.checked)}
                className="cursor-pointer"
              />
              <div style={{marginTop:"10px",marginLeft:"10px"}} htmlFor={field?.name} className="menuPeerLevel">
                {field?.label}
              </div>
            </div>
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

export const SubmitButton = ({
  text,
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
          onClick={callBack} // Directly pass the callback
          className="font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer"
          style={{
            ...style, // Spread the incoming style prop first to allow overrides
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
          }}
        >
          {text}
        </button>
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
