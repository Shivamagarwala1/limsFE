import React, { useState } from 'react';
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { data } from 'react-router-dom';
const UserCalendar = ({ onDateClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const activeTheme = useSelector((state) => state.theme.activeTheme);

    const listOfDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    const generateCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear());
        const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
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
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleDateClick = (day) => {
        if (day) {
            const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            onDateClick(selectedDate); // Pass the selected date to the parent
        }
    };

    const days = generateCalendar();

    return (
        <div className="p-1 max-w-md mx-auto border-[1.5px] bg-white rounded-md shadow-lg ">

            <div className="flex justify-between items-center mb-1">
                <button
                    type='button'
                    onClick={goToPreviousMonth}
                >
                    <MdOutlineKeyboardArrowLeft />
                </button>
                <span className="font-semibold text-xxs">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <button
                    type='button'
                    onClick={goToNextMonth}
                >
                    <MdKeyboardArrowRight />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xxs">
                {/* Weekday names */}
                {
                    listOfDay.map((day, index) => (
                        <div key={index} className="font-semibold text-xxs">{day}</div>

                    ))
                }


                {/* Calendar Days */}
                {days.map((day, index) => (
                    <div
                        key={index}
                        onClick={() => handleDateClick(day)}
                        className={`rounded-sm  hover:cursor-pointer font-semibold ${day ? 'text-black border-[1px] h-5 w-5 flex justify-center items-center ' : 'text-transparent'
                            } ${day &&
                                index % 7 === 0
                                ? 'text-red-500'
                                : ''
                            } ${day === currentDate.getDate() &&
                                currentDate.getMonth() === new Date().getMonth() &&
                                currentDate.getFullYear() === new Date().getFullYear()
                                ? 'bg-gray-300'
                                : ''
                            }`}
                    >
                        {day || ''}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserCalendar;
