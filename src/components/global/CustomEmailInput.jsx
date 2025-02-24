import React, { useState } from "react";
import { toast } from "react-toastify";

export const CustomEmailInput = ({
    name = "email",
    value = "",
    onChange,
    label = "Email Address",
    isDisabled = false,
}) => {
    const [isValid, setIsValid] = useState(true);

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        return emailRegex.test(email);
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value;

        // Trigger onChange callback
        if (onChange) {
            onChange(e);
        }

        // Reset validation state while typing
        if (!isValid) {
            setIsValid(true);
        }
    };

    const handleValidation = (e) => {
        const newValue = e.target.value;


        // Validate the email on blur/mouseleave
        const isValidValue = validateEmail(newValue);
        setIsValid(isValidValue);

        // Show toast message based on validity
        if (!isValidValue) {
            toast.error("Please enter a valid email address");
        }
    };

    return (
        <div className="relative flex-1">
            <input
                type="email" // Set the input type as email
                id={name}
                name={name}
                value={value}
                onChange={handleInputChange}
                onBlur={handleValidation} // Validate on blur/mouseleave
                placeholder=" "
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
