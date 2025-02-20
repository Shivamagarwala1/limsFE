import React, { useEffect, useRef, useState } from 'react'
import UserCalendar from '../public/UserCalendar';
import { TbCalendar } from "react-icons/tb";
import { TbCalendarTime } from "react-icons/tb";

export const DatePicker = ({
    id,
    name,
    value, // Selected date value (controlled by parent)
    onChange, // Function to handle date change
    placeholder = "Select Date", // Placeholder text
    label = "Date", // Label text
    activeTheme,
    isDisabled = false,
    isMandatory = false,
    showTime = false,
    minDate,
    currentDate,
    tillDate,
    maxDate,
    highlightedDates,
    disabledDates,
    showBigerCalandar,
    timeFormat = "12"
}) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);

    //Handles date selection from the calendar
    const handleDateClick = (date) => {
        const formattedDate =
            showTime === false
                ? `${String(date.getDate()).padStart(2, "0")}-${date.toLocaleString("default", { month: "short" })}-${date.getFullYear()}`
                : timeFormat === "24"
                    ? `${String(date.getDate()).padStart(2, "0")}-${date.toLocaleString("default", { month: "short" })}-${date.getFullYear()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
                    : `${String(date.getDate()).padStart(2, "0")}-${date.toLocaleString("default", { month: "short" })}-${date.getFullYear()} ${String(date.getHours() % 12 || 12).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")} ${date.getHours() >= 12 ? "PM" : "AM"}`;

        // Create an event-like object
        const event = {
            target: {
                name: name,
                value: formattedDate,
            },
        };

        onChange(event); // Pass the event to the parent
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
        <div className={`absolute flex-1 flex items-center gap-[0.20rem] w-full justify-between `}>

            {/* Input Field */}
            <div className="relative flex-1">
                <input
                    type="text"
                    id={id}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e)} // Allow manual input (optional)
                    placeholder={placeholder}
                    disabled={true}
                    className={`inputPeerField peer border-borderColor focus:outline-none ${isDisabled
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-white"
                        } ${isMandatory ? "border-b-red-500" : "border-borderColor"
                        } focus:outline-none`}
                />
                <label htmlFor={id} className="menuPeerLevel">
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
                    {showTime === true ? <TbCalendarTime className="w-5 h-5 font-semibold" /> : <TbCalendar className="w-5 h-5 font-semibold" />}


                    {/* TbCalendar TbCalendarTime */}
                </div>
            </div>



            {/* Calendar Popup */}
            {showCalendar && (
                <div
                    ref={calendarRef}
                    className={` absolute top-full left-0 mt-[1px]  bg-transparent rounded-md shadow-lg  z-50`}
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
                        showBigerCalandar={showBigerCalandar}
                    />
                </div>
            )}
        </div>
    );
};