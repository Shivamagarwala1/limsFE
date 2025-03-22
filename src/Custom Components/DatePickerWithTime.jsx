import { useEffect, useRef, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { useSelector } from "react-redux";
import UserCalendar from "../components/public/UserCalendar";

export const DatePickerWithTime = ({
  id,
  name,
  value, // Selected date value (controlled by parent)
  onChange, // Function to handle date change
  placeholder = "Select Date", // Placeholder text
  label = "Date", // Label text
  isDisabled = false,
  isMandatory = false,
  labelStyle,
  showTime = false,
  minDate = new Date(1975, 0, 1), // ✅ Fixed default minDate assignment
  currentDate = new Date(),
  maxDate = new Date(2100, 0, 1),
  highlightedDates = [],
  disabledDates = [],
  calenderStyle = {},
  tillDate=new Date()
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  //Handles date selection from the calendar
  const handleDateClick = (date) => {
    const formattedDate =
      showTime === false
        ? `${String(date.getDate()).padStart(2, "0")}-${date.toLocaleString(
            "default",
            {
              month: "short",
            }
          )}-${date.getFullYear()}`
        : `${String(date.getDate()).padStart(2, "0")}-${date.toLocaleString(
            "default",
            {
              month: "short",
            }
          )}-${date.getFullYear()} ${String(date.getHours()).padStart(
            2,
            "0"
          )}:${String(date.getMinutes()).padStart(2, "0")}`;
    onChange(formattedDate); // Pass the selected date to the parent
    setShowCalendar(false); // Close the calendar
  };

  // Closes calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
      {/* Input Field */}
      <div className="relative flex-1">
        <input
          type="text"
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)} // Allow manual input (optional)
          placeholder={placeholder}
          disabled={true}
          className={`inputPeerField peer border-borderColor focus:outline-none ${
            isDisabled
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-white"
          } focus:outline-none`}
        />
        <label labelStyle={labelStyle} htmlFor={id} className="menuPeerLevel">
          {label}
        </label>
      </div>

      {/* Calendar Icon */}
      <div>
        <div
          className={`h-[1.6rem] flex justify-center items-center rounded font-semibold w-6 
        ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          onClick={
            !isDisabled ? () => setShowCalendar(!showCalendar) : undefined
          } // Prevent click when disabled
          style={{
            background: activeTheme?.menuColor,
            color: activeTheme?.iconColor,
          }}
        >
          <CiCalendarDate className="w-5 h-5 font-semibold" />
        </div>
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <div
          ref={calendarRef}
          style={calenderStyle}
          className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded z-50"
        >
          <UserCalendar
            onDateClick={handleDateClick}
            onClose={() => setShowCalendar(false)}
            minDate={minDate}
            currentDate={currentDate}
            maxDate={maxDate}
            highlightedDates={highlightedDates}
            disabledDates={disabledDates}
            showTime={showTime}
            tillDate={tillDate}
            activeTheme={activeTheme}
          />
        </div>
      )}
    </div>
  );
};

export const DatePickerWithTimeInTable = ({
  id,
  name,
  value, // Selected date value (controlled by parent)
  onChange, // Function to handle date change
  placeholder = "Select Date", // Placeholder text
  label = "Date", // Label text
  isDisabled = false,
  isMandatory = false,
  showTime = false,
  labelStyle = {},
  inputStyle = {},
  iconStyle = {},
  calenderStyle = {},
  editable = true,
  minDate = new Date(1975, 0, 1), // ✅ Fixed default minDate assignment
  currentDate = new Date(),
  maxDate = new Date(2100, 0, 1),
  highlightedDates = [],
  disabledDates = [],
  tillDate=new Date()
}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  //Handles date selection from the calendar
  const handleDateClick = (date) => {
    const formattedDate =
      showTime === false
        ? `${String(date.getDate()).padStart(2, "0")}-${date.toLocaleString(
            "default",
            {
              month: "short",
            }
          )}-${date.getFullYear()}`
        : `${String(date.getDate()).padStart(2, "0")}-${date.toLocaleString(
            "default",
            {
              month: "short",
            }
          )}-${date.getFullYear()} ${String(date.getHours()).padStart(
            2,
            "0"
          )}:${String(date.getMinutes()).padStart(2, "0")}`;
    onChange(formattedDate); // Pass the selected date to the parent
    setShowCalendar(false); // Close the calendar
  };

  // Closes calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!value) {
      onChange(currentDate);
    }
  }, []);

  return (
    <div className="relative flex-1 flex items-center gap-[0.20rem] w-full justify-between">
      {/* Input Field */}
      <div className="relative flex-1">
        <input
          style={inputStyle}
          type="text"
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)} // Allow manual input (optional)
          placeholder={placeholder}
          disabled={true}
          className={`inputPeerField peer border-borderColor focus:outline-none ${
            isDisabled
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-white"
          } focus:outline-none`}
        />
        <label style={labelStyle} htmlFor={id} className="menuPeerLevel">
          {label}
        </label>
      </div>

      {/* Calendar Icon */}

      <div>
        {editable && (
          <div
            className={` flex justify-center items-center rounded font-semibold w-6 
        ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            onClick={
              !isDisabled ? () => setShowCalendar(!showCalendar) : undefined
            } // Prevent click when disabled
            style={{
              ...iconStyle,
              background: activeTheme?.menuColor,
              color: activeTheme?.iconColor,
            }}
          >
            <CiCalendarDate className="w-5 h-5 font-semibold" />
          </div>
        )}
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <div
          ref={calendarRef}
          style={calenderStyle}
          className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded z-50"
        >
          <UserCalendar
            onDateClick={handleDateClick}
            onClose={() => setShowCalendar(false)}
            minDate={minDate}
            currentDate={currentDate}
            maxDate={maxDate}
            highlightedDates={highlightedDates}
            disabledDates={disabledDates}
            showTime={showTime}
            activeTheme={activeTheme}
            tillDate={tillDate}
          />
        </div>
      )}
    </div>
  );
};

// <DatePickerWithTime
// id="datepicker"
// name="datepicker"
// value={selectedDate}
// onChange={handleDateChange}
// placeholder="Select Date"
// label="Date of Birth"
// isDisabled={false}
// isMandatory={true}
// showTime={true}
// tillDate={new Date(2025, 11, 31)}
// minDate={new Date(2000, 0, 1)} // Minimum date: January 1, 1990
// currentDate={new Date()} // Current date: today
// maxDate={new Date(2025, 11, 31)} // Maximum date: December 31, 2025
// highlightedDates={["2025-01-02", "2025-12-25"]} // Highlighted dates
// disabledDates={["2025-01-01"]} // Disabled dates
// />
