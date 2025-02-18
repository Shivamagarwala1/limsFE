import React, { useState } from "react";
import { toast } from "react-toastify";

export const CustomNumberInput = ({
    name = "number",
    value = "",
    onChange,
    label = "Mobile Number",
    isDisabled = false,
    maxLength = 10, // Set maxLength to 10 for a 10-digit number
}) => {
    const [isValid, setIsValid] = useState(true);

    // Validation function to check if the input is a 10-digit number
    const validateNumber = (value) => {
        return value.length === 10; // Valid only if it's exactly 10 digits
    };

    const handleInputChange = (e) => {
        let newValue = e.target.value;

        // Allow only digits
        newValue = newValue.replace(/[^0-9]/g, "");

        // Enforce max length of 10 digits
        if (newValue.length > maxLength) {
            newValue = newValue.slice(0, maxLength);
        }

        // Trigger onChange callback
        if (onChange) {
            onChange(name, newValue);
        }
    };

    const handleValidation = (e) => {
        const newValue = e.target.value;

        // Validate the value on blur/mouseleave
        const isValidValue = validateNumber(newValue);
        setIsValid(isValidValue);

        // Show error toast if invalid
        if (!isValidValue) {
            toast.error("Please enter a valid 10-digit number");
        }
    };

    return (
        <div className="relative flex-1">
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={handleInputChange}
                onBlur={handleValidation} // Validate on blur/mouseleave
                placeholder=" "
                maxLength={maxLength}
                disabled={isDisabled}
                aria-invalid={!isValid}
                aria-describedby={!isValid ? `${name}-error` : undefined}
                className={`inputPeerField peer border-borderColor focus:outline-none ${isDisabled
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-white"
                    } ${!isValid ? "border-red-500" : "border-gray-300"} focus:outline-none`}
            />
            <label htmlFor={name} className={`menuPeerLevel`}>
                {label}
            </label>
        </div>
    );
};
