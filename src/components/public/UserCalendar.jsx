import React, { useState, useEffect, useRef } from "react";
import {
    MdKeyboardArrowRight,
    MdOutlineKeyboardArrowLeft,
    MdArrowDropUp,
    MdArrowDropDown,
} from "react-icons/md";

const UserCalendar = ({
    onDateClick,
    onClose = () => { },
    minDate = new Date(new Date().getFullYear() - 150, 11, 31), // Default min date: January 1, 1950
    maxDate = new Date(new Date().getFullYear() + 1, 11, 31), // Default max date: December 31, 2100
    startDayOfWeek = 0, // 0 = Sunday, 1 = Monday, etc.
    highlightedDates = [], // Array of objects: [{ date: "2025-01-01", msg: "New Year" }]
    disabledDates = [], // Array of objects: [{ date: "2025-12-25", msg: "Christmas" }]
    className = "", // Custom CSS class for the calendar container
    showTime = false, // Whether to show time selection
    activeTheme,
    tillDate = new Date(), // Default till date: today
    timeFormat = "12", // Default time format: 24-hour
}) => {
    const [currentDate, setCurrentDate] = useState(new Date()); // Default to today's date
    const [selectedDate, setSelectedDate] = useState(null); // Track selected date
    const [view, setView] = useState("calendar"); // "calendar", "month", "year"
    const [yearOffset, setYearOffset] = useState(0);
    const now = new Date();
    const [selectedTime, setSelectedTime] = useState({
        hours: now.getHours(),
        minutes: now.getMinutes(),
    });
    const [amPm, setAmPm] = useState(now.getHours() >= 12 ? "PM" : "AM"); // Track AM/PM for 12-hour format
    const [hoveredDate, setHoveredDate] = useState(null); // Track hovered date and message
    const calendarRef = useRef(null);

    const listOfDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsFull = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const monthsAbbreviated = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // Generate days of the week based on the start day
    const getDaysOfWeek = () => {
        const days = [...listOfDay];
        return days.slice(startDayOfWeek).concat(days.slice(0, startDayOfWeek));
    };

    const getDaysInMonth = (month, year) =>
        new Date(year, month + 1, 0).getDate();

    const generateCalendar = () => {
        const daysInMonth = getDaysInMonth(
            currentDate.getMonth(),
            currentDate.getFullYear()
        );
        const startDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        ).getDay();
        const adjustedStartDay = (startDay - startDayOfWeek + 7) % 7; // Adjust for custom start day
        return [
            ...Array(adjustedStartDay).fill(null),
            ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
        ];
    };

    const goToPreviousMonth = () => {
        const prevDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
        );
        if (prevDate >= minDate) setCurrentDate(prevDate);
    };

    const goToNextMonth = () => {
        const nextDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1
        );
        if (nextDate <= maxDate) setCurrentDate(nextDate);
    };

    // Check if the next month button should be disabled
    const isNextMonthDisabled = () => {
        const nextDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1
        );
        return nextDate > maxDate;
    };

    // Check if a date is the current date
    const isCurrentDate = (day) => {
        if (!day) return false;
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        return date.toDateString() === new Date().toDateString();
    };

    // Check if a date is the selected date
    const isSelectedDate = (day) => {
        if (!day || !selectedDate) return false;
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        return date.toDateString() === selectedDate.toDateString();
    };

    const handleDateClick = (day) => {
        if (day) {
            const selectedDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
            );
            setSelectedDate(selectedDate); // Update selected date

            if (!showTime) {
                onDateClick?.(selectedDate); // Pass only the date to the parent
                onClose?.(); // Close the calendar
            }
        }
    };

    const handleTimeChange = (type, increment) => {
        setSelectedTime((prev) => {
            let newValue = prev[type] + increment;
            if (type === "hours") {
                if (timeFormat === "12") {
                    // Handle 12-hour format
                    newValue = (newValue + 12) % 12; // Ensure hours stay within 0-11
                    if (newValue === 0) newValue = 12; // Convert 0 to 12 for 12-hour format
                } else {
                    // Handle 24-hour format
                    newValue = (newValue + 24) % 24; // Ensure hours stay within 0-23
                }
            } else if (type === "minutes") {
                newValue = (newValue + 60) % 60; // Ensure minutes stay within 0-59
            }
            return { ...prev, [type]: newValue };
        });
    };

    const handleAmPmChange = () => {
        setAmPm((prev) => (prev === "AM" ? "PM" : "AM"));
    };

    const handleTimeConfirm = () => {
        if (selectedDate) {
            let hours = selectedTime.hours;
            if (timeFormat === "12") {
                // Convert 12-hour format to 24-hour format
                if (amPm === "PM" && hours !== 12) hours += 12;
                if (amPm === "AM" && hours === 12) hours = 0;
            }
            const dateWithTime = new Date(selectedDate);
            dateWithTime.setHours(hours, selectedTime.minutes); // Set the selected time
            onDateClick?.(dateWithTime); // Pass the date and time to the parent
            onClose?.(); // Close the calendar
        }
    };

    const handleMonthClick = (monthIndex) => {
        setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
        setView("calendar");
    };

    const handleYearClick = (year) => {
        setCurrentDate(new Date(year, currentDate.getMonth(), 1));
        setView("month");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                onClose?.();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    const days = generateCalendar();

    // Generate 12-year blocks for year selection
    const startYear =
        Math.floor(currentDate.getFullYear() / 12) * 12 + yearOffset;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i).filter(
        (year) => year >= minDate.getFullYear() && year <= maxDate.getFullYear()
    );

    // Check if a date is highlighted
    const isHighlighted = (day) => {
        if (!day) return false;
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        const dateStr = date.toLocaleDateString("en-CA"); // Use ISO format (YYYY-MM-DD) in local time
        return highlightedDates.some((d) => d.date === dateStr);
    };

    // Check if a date is highlighted
    const isDisabledForceFully = (day) => {
        if (!day) return false;
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        const dateStr = date.toLocaleDateString("en-CA"); // Use ISO format (YYYY-MM-DD) in local time
        return disabledDates.some((d) => d.date === dateStr);
    };

    // Check if a date is disabled
    const isDisabled = (day) => {
        if (!day) return false;
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        const dateStr = date.toLocaleDateString("en-CA"); // Use ISO format (YYYY-MM-DD) in local time
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date to midnight for accurate comparison
        return (
            date < minDate ||
            date > maxDate ||
            //disabledDates.some((d) => d.date === dateStr) ||
            date > tillDate // Disable dates after tillDate
        );
    };

    // Get the message for a highlighted or disabled date
    const getDateMessage = (day) => {
        if (!day) return null;
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        const dateStr = date.toLocaleDateString("en-CA"); // Use ISO format (YYYY-MM-DD) in local time
        const highlighted = highlightedDates.find((d) => d.date === dateStr);
        const disabled = disabledDates.find((d) => d.date === dateStr);
        return highlighted?.msg || disabled?.msg || null;
    };

    return (
        <div
            ref={calendarRef}
            className={`p-2 max-w-md mx-auto border-[1.5px] bg-white rounded-md shadow-lg ${className}`}
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                {view === "calendar" && (
                    <>
                        <button
                            type="button"
                            onClick={goToPreviousMonth}
                            className={`p-1 rounded ${new Date(
                                currentDate.getFullYear(),
                                currentDate.getMonth() - 1,
                                1
                            ) < minDate
                                ? "text-gray-400 cursor-not-allowed"
                                : "hover:bg-gray-100"
                                }`}
                            disabled={
                                new Date(
                                    currentDate.getFullYear(),
                                    currentDate.getMonth() - 1,
                                    1
                                ) < minDate
                            }
                        >
                            <MdOutlineKeyboardArrowLeft />
                        </button>
                        <span className="font-semibold text-sm">
                            <button
                                onClick={() => setView("month")}
                                className="hover:underline"
                            >
                                {monthsFull[currentDate.getMonth()]}
                            </button>{" "}
                            <button
                                onClick={() => setView("year")}
                                className="hover:underline"
                            >
                                {currentDate.getFullYear()}
                            </button>
                        </span>
                        <button
                            type="button"
                            onClick={goToNextMonth}
                            className={`p-1 rounded ${isNextMonthDisabled()
                                ? "text-gray-400 cursor-not-allowed"
                                : "hover:bg-gray-100"
                                }`}
                            disabled={isNextMonthDisabled()}
                        >
                            <MdKeyboardArrowRight />
                        </button>
                    </>
                )}
                {view === "month" && (
                    <>
                        <button
                            type="button"
                            onClick={() => setView("year")}
                            className="hover:underline font-semibold"
                        >
                            {currentDate.getFullYear()}
                        </button>
                    </>
                )}
                {view === "year" && (
                    <>
                        <button
                            type="button"
                            onClick={() => setYearOffset(yearOffset - 12)}
                            className={`p-1 rounded ${years[0] <= minDate.getFullYear()
                                ? "text-gray-400 cursor-not-allowed"
                                : "hover:bg-gray-100"
                                }`}
                            disabled={years[0] <= minDate.getFullYear()}
                        >
                            <MdOutlineKeyboardArrowLeft />
                        </button>
                        <span className="font-semibold text-sm">
                            {years[0]} - {years[years.length - 1]}
                        </span>
                        <button
                            type="button"
                            onClick={() => setYearOffset(yearOffset + 12)}
                            className={`p-1 rounded ${years[years.length - 1] >= maxDate.getFullYear()
                                ? "text-gray-400 cursor-not-allowed"
                                : "hover:bg-gray-100"
                                }`}
                            disabled={years[years.length - 1] >= maxDate.getFullYear()}
                        >
                            <MdKeyboardArrowRight />
                        </button>
                    </>
                )}
            </div>

            {/* Calendar View */}
            {view === "calendar" && (
                <>
                    <div className="grid grid-cols-7 gap-2 text-center text-xs">
                        {getDaysOfWeek().map((day, index) => (
                            <div
                                key={index}
                                className={`font-semibold ${day === "Sun" ? "text-red-500" : ""
                                    }`}
                            >
                                {day}
                            </div>
                        ))}
                        {days.map((day, index) => (
                            <div
                                key={index}
                                onClick={() =>
                                    !isDisabled(day) &&
                                    !isDisabledForceFully(day) &&
                                    handleDateClick(day)
                                }
                                onMouseEnter={() =>
                                    setHoveredDate({
                                        date: new Date(
                                            currentDate.getFullYear(),
                                            currentDate.getMonth(),
                                            day
                                        ),
                                        msg: getDateMessage(day),
                                    })
                                }
                                onMouseLeave={() => setHoveredDate(null)}
                                className={`text-black rounded-sm cursor-pointer font-semibold ${day && index % 7 === 0 ? "text-red-500" : ""
                                    } ${day
                                        ? `border-[1px] h-6 w-6 flex justify-center items-center hover:bg-gray-200 ${isHighlighted(day) ? "bg-blue-200" : ""
                                        } ${isDisabled(day)
                                            ? "bg-gray-200 text-black cursor-not-allowed"
                                            : ""
                                        }
                          ${isDisabledForceFully(day)
                                            ? "bg-gray-400 text-black cursor-not-allowed"
                                            : ""
                                        } ${isCurrentDate(day) ? "bg-red-100" : ""} ${isSelectedDate(day) ? "bg-green-200" : ""
                                        }`
                                        : "text-transparent"
                                    }`}
                            >
                                {day || ""}
                            </div>
                        ))}
                    </div>

                    {/* Time Selector (shown only if a date is selected and showTime is true) */}
                    {showTime && selectedDate && (
                        <div className="flex flex-col items-center mt-1">
                            {/* <h1 className="font-semibold">Select Time</h1> */}
                            <div className="flex items-center gap-2">
                                {/* Hours Selector */}
                                <div className="flex flex-col items-center">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent form submission
                                            handleTimeChange("hours", 1);
                                        }}
                                        className="p-1 rounded hover:bg-gray-200"
                                    >
                                        <MdArrowDropUp />
                                    </button>
                                    <input
                                        type="text"
                                        value={selectedTime.hours}
                                        onChange={(e) => {
                                            let value = e.target.value.replace(/\D/g, ""); // Remove any non-numeric characters
                                            if (value !== "" && parseInt(value, 10) < 24) {
                                                setSelectedTime((prev) => ({
                                                    ...prev,
                                                    hours: parseInt(value, 10),
                                                }));
                                            }
                                        }}
                                        className="text-lg text-center w-10 border rounded outline-none"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent form submission
                                            handleTimeChange("hours", -1);
                                        }}
                                        className="p-1 rounded hover:bg-gray-200"
                                    >
                                        <MdArrowDropDown />
                                    </button>
                                </div>
                                <span className="text-lg">:</span>
                                {/* Minutes Selector */}
                                <div className="flex flex-col items-center">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent form submission
                                            handleTimeChange("minutes", 1);
                                        }}
                                        className="p-1 rounded hover:bg-gray-200"
                                    >
                                        <MdArrowDropUp />
                                    </button>
                                    <input
                                        type="text"
                                        value={selectedTime.minutes}
                                        onChange={(e) => {
                                            let value = e.target.value.replace(/\D/g, ""); // Remove any non-numeric characters
                                            if (value !== "" && parseInt(value, 10) < 60) {
                                                setSelectedTime((prev) => ({
                                                    ...prev,
                                                    minutes: parseInt(value, 10),
                                                }));
                                            }
                                        }}
                                        className="text-lg text-center w-10 border rounded outline-none"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent form submission
                                            handleTimeChange("minutes", -1);
                                        }}
                                        className="p-1 rounded hover:bg-gray-200"
                                    >
                                        <MdArrowDropDown />
                                    </button>
                                </div>
                                {/* AM/PM Selector (only for 12-hour format) */}
                                {timeFormat === "12" && (
                                    <div className="flex flex-col items-center">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent form submission
                                                handleAmPmChange();
                                            }}
                                            className="p-1 rounded hover:bg-gray-200"
                                        >
                                            <MdArrowDropUp />
                                        </button>
                                        <input
                                            type="text"
                                            value={amPm}
                                            onChange={(e) => {
                                                let value = e.target.value.toUpperCase();

                                                // Auto-complete logic
                                                if (value === "A") value = "AM";
                                                if (value === "P") value = "PM";

                                                // Only allow "AM" or "PM"
                                                if (value === "AM" || value === "PM") {
                                                    setAmPm(value);
                                                }
                                            }}
                                            className="text-lg text-center w-12 border rounded"
                                        />

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent form submission
                                                handleAmPmChange();
                                            }}
                                            className="p-1 rounded hover:bg-gray-200"
                                        >
                                            <MdArrowDropDown />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                data-ripple-light="true"
                                className={`relative overflow-hidden font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center 'cursor-pointer`}
                                style={{
                                    background: activeTheme?.menuColor,
                                    color: activeTheme?.iconColor,
                                }}
                                onClick={handleTimeConfirm}
                            >
                                Confirm
                            </button>
                        </div>
                    )}

                    {/* Hovered Date Message */}
                    {hoveredDate?.msg && (
                        <div className="mt-2 text-sm text-center text-gray-700">
                            {hoveredDate.msg}
                        </div>
                    )}
                </>
            )}

            {/* Month Selection */}
            {view === "month" && (
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    {monthsAbbreviated.map((month, index) => (
                        <div
                            key={index}
                            onClick={() => handleMonthClick(index)}
                            className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                        >
                            {month}
                        </div>
                    ))}
                </div>
            )}

            {/* Year Selection */}
            {view === "year" && (
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    {years.map((year) => (
                        <div
                            key={year}
                            onClick={() => handleYearClick(year)}
                            className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                        >
                            {year}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserCalendar;