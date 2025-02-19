import React, { useState } from "react";
import { toast } from "react-toastify";

export const CustomNumberInput = ({
    name = "number",
    value = "",
    onChange,
    label = "Change your Label Name",
    isDisabled = false,
    maxLength = 10, // Default maxLength to 10
}) => {
    const [inputValue, setInputValue] = useState(value); // Local state for the input value
    const [isInvalid, setIsInvalid] = useState(false); // State for invalid input (for red border)

    const handleInputChange = (e) => {
        let newValue = e.target.value;

        // Check for non-numeric characters
        if (/[^0-9]/.test(newValue)) {
            toast.error("Only numeric values are allowed");
            newValue = newValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        }

        // Enforce max length
        if (newValue.length > maxLength) {
            toast.error(`Maximum length of ${maxLength} digits exceeded`);
            newValue = newValue.slice(0, maxLength); // Trim the value
        }

        // Update local state
        setInputValue(newValue);

        // Trigger the parent's `onChange` callback
        if (onChange) {
            // onChange({
            //     ...e,
            //     target: { ...e.target, value: newValue }, // Update value while preserving other event properties
            // });
            onChange(e)
            setIsInvalid(false);
        }
    };


    const handleBlur = () => {
        // Check if the input meets the maxLength condition
        if (inputValue.length !== maxLength) {
            toast.error(`Input must contain exactly ${maxLength} digits`); // Show toast if not valid
            setIsInvalid(true); // Highlight border with red
        } else {
            setIsInvalid(false); // Valid input, remove red border
        }
    };

    return (
        <div className="relative flex-1">
            <input
                type="text"
                id={name}
                name={name}
                value={inputValue} // Controlled input
                onChange={handleInputChange}
                onBlur={handleBlur} // Validate on blur
                placeholder=" "
                maxLength={maxLength + 1} // Prevent users from typing more characters
                disabled={isDisabled}
                className={`inputPeerField peer border-borderColor focus:outline-none ${isDisabled
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-white"
                    } ${isInvalid ? "border-red-500" : "border-gray-300"}`}
            />
            <label htmlFor={name} className={`menuPeerLevel`}>
                {label}
            </label>
        </div>
    );
};
