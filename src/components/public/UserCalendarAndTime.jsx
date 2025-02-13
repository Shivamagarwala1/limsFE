import React, { useState } from "react";
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";

const UserCalendarAndTime = ({ onDateAndTimeClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState("12");
    const [selectedMinute, setSelectedMinute] = useState("00");
    const [selectedPeriod, setSelectedPeriod] = useState("AM");
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

    const listOfDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    const generateCalendar = () => {
        const daysInMonth = getDaysInMonth(
            currentDate.getMonth() + 1,
            currentDate.getFullYear()
        );
        const startDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        ).getDay();
        const days = [];

        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return days;
    };

    const goToPreviousMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        );
    };

    const goToNextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
        );
    };

    const handleDateClick = (day) => {
        if (!day) return;

        const newDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day,
            selectedDateTime.getHours(),
            selectedDateTime.getMinutes()
        );

        setSelectedDateTime(newDate);
        onDateAndTimeClick && onDateAndTimeClick(newDate);
        console.log("Updated Date and Time:", newDate);
    };

    const handleHourChange = (e) => {
        const hour = e.target.value;
        setSelectedHour(hour);

        updateDateTime(hour, selectedMinute, selectedPeriod);
    };

    const handleMinuteChange = (e) => {
        const minute = e.target.value;
        setSelectedMinute(minute);

        updateDateTime(selectedHour, minute, selectedPeriod);
    };

    const handlePeriodChange = (e) => {
        const period = e.target.value;
        setSelectedPeriod(period);

        updateDateTime(selectedHour, selectedMinute, period);
    };

    const updateDateTime = (hour, minute, period) => {
        let updatedHour = parseInt(hour, 10);
        if (period === "PM" && updatedHour !== 12) updatedHour += 12;
        if (period === "AM" && updatedHour === 12) updatedHour = 0;

        const updatedDate = new Date(
            selectedDateTime.getFullYear(),
            selectedDateTime.getMonth(),
            selectedDateTime.getDate(),
            updatedHour,
            minute
        );

        setSelectedDateTime(updatedDate);
        onDateAndTimeClick && onDateAndTimeClick(updatedDate);

        return updatedDate;
    };

    const days = generateCalendar();

    return (
        <div className="p-1 max-w-md mx-auto border-[1.5px] bg-white rounded-md shadow-lg">
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-1">
                <button type="button" onClick={goToPreviousMonth}>
                    <MdOutlineKeyboardArrowLeft />
                </button>
                <span className="font-semibold text-xxs">
                    {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
                </span>
                <button type="button" onClick={goToNextMonth}>
                    <MdKeyboardArrowRight />
                </button>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-xxs">
                {listOfDay.map((day, index) => (
                    <div key={index} className="font-semibold text-xxs">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2 text-center text-xxs">
                {days.map((day, index) => (
                    <div
                        key={index}
                        onClick={() => handleDateClick(day)}
                        className={`rounded-sm hover:cursor-pointer font-semibold ${day
                            ? "text-black border-[1px] h-5 w-5 flex justify-center items-center "
                            : "text-transparent"
                            } ${day && index % 7 === 0 ? "text-red-500" : ""
                            } ${day === currentDate.getDate() &&
                                currentDate.getMonth() === new Date().getMonth() &&
                                currentDate.getFullYear() === new Date().getFullYear()
                                ? "bg-gray-300"
                                : ""
                            }`}
                    >
                        {day || ""}
                    </div>
                ))}
            </div>

            {/* Custom Time Picker */}
            <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-xs">Select Time:</label>
                </div>
                <div className="flex gap-2">
                    {/* Hour Picker */}
                    <select
                        value={selectedHour}
                        onChange={handleHourChange}
                        className="border rounded px-2 py-1 text-xs outline-none"
                    >
                        {Array.from({ length: 12 }, (_, i) => {
                            const hour = (i + 1).toString().padStart(2, "0");
                            return (
                                <option key={hour} value={hour}>
                                    {hour}
                                </option>
                            );
                        })}
                    </select>

                    {/* Minute Picker */}
                    <select
                        value={selectedMinute}
                        onChange={handleMinuteChange}
                        className="border rounded px-2 py-1 text-xs outline-none"
                    >
                        {Array.from({ length: 60 }, (_, i) => {
                            const minute = i.toString().padStart(2, "0");
                            return (
                                <option key={minute} value={minute}>
                                    {minute}
                                </option>
                            );
                        })}
                    </select>

                    {/* Period Picker (AM/PM) */}
                    <select
                        value={selectedPeriod}
                        onChange={handlePeriodChange}
                        className="border rounded px-2 py-1 text-xs outline-none"
                    >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default UserCalendarAndTime;
