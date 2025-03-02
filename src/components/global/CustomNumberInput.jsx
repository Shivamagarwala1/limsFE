import React, { useState } from "react";
import { toast } from "react-toastify";

export const CustomNumberInput = ({
    name = "number",
    value = "",
    onChange,
    label = "Change your Label Name",
    readOnly = false,
    isDisabled = false,
    maxLength = 10, // Default maxLength to 10
}) => {
    // const [inputValue, setInputValue] = useState(value); // Local state for the input value
    const [isInvalid, setIsInvalid] = useState(false); // State for invalid input (for red border)    

    const handleInputChange = (e) => {
        let newValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

        if (newValue.length > maxLength) {
            toast.error(`Maximum length of ${maxLength} digits exceeded`);
            newValue = newValue.slice(0, maxLength);
        }

        if (onChange) {
            onChange({ target: { name, value: newValue } });
        }

        // ✅ Reset error when input becomes valid
        if (newValue.length === maxLength) {
            setIsInvalid(false);
        }
    };



    const handleBlur = () => {

        if (value.toString().length !== maxLength) {
            toast.error(`Input must contain exactly ${maxLength} digits`);
            setIsInvalid(true); // Set error if not valid
        } else {
            setIsInvalid(false); // ✅ Reset error when valid
        }
    };


    return (
        <div className="relative flex-1">
            <input
                type='text'
                id={name}
                name={name}
                value={value} // Controlled input
                onChange={handleInputChange}
                onBlur={handleBlur} // Validate on blur
                placeholder=" "
                maxLength={maxLength} // Prevent users from typing more characters
                disabled={isDisabled}
                readOnly={readOnly}
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
