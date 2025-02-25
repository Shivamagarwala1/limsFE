import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

export const CustomTextBox = ({
    type = "text",
    name,
    value = "",
    onChange,
    label,
    isDisabled = false,
    maxLength = 50,
    allowSpecialChars = false,
    isMandatory = false,
    readOnly = false,
    showLabel = false,
    decimalPrecision = 4, // New property for decimal precision
}) => {
    const [isValid, setIsValid] = useState(true);
    const prevIsValidRef = useRef(false);



    const allowedSpecialChars = allowSpecialChars ? "!@#$%^&*/" : "";

    const validateField = (value) => {

        switch (type) {

            case "number":
                return /^\d+$/.test(value);
            case "positive":
                return /^\d+$/.test(value) && value.length <= maxLength;
            case "negative":
                return /^-?\d+$/.test(value);
            case "decimalpositive":
                return new RegExp(`^\\d+(\\.\\d{1,${decimalPrecision}})?$`).test(value);
            case "decimalnegative":
                return new RegExp(`^-?\\d+(\\.\\d{1,${decimalPrecision}})?$`).test(
                    value
                );
            case "days":
                return /^(0?[1-9]|[12][0-9]|3[01])$/.test(value);
            case "months":
                return /^(0?[1-9]|1[0-2])$/.test(value);
            case "years":
                return /^(0?[1-9]|[1-9][0-9]|1[0-4][0-9]|150)$/.test(value);
            case "propercase":
                if (allowSpecialChars) {
                    const regex = new RegExp(`^[A-Za-z\\s${allowedSpecialChars}]*$`);
                    return regex.test(value);
                }
                return /^[A-Za-z\s]*$/.test(value);
            case "charNumber":
                if (allowSpecialChars) {
                    const regex = new RegExp(`^[A-Za-z0-9${allowedSpecialChars}]*$`);
                    return regex.test(value);
                }
                return /^[A-Za-z0-9]*$/.test(value);

            case "allCharacters":
                return /^[\s\S]*$/.test(value);

            case "charNumberWithSpace":
                if (allowSpecialChars) {
                    const regex = new RegExp(`^[A-Za-z0-9\\s${allowedSpecialChars}]*$`);
                    return regex.test(value);
                }
                return /^[A-Za-z0-9\\s]*$/.test(value);

            case "barcode":
                return /^[A-Za-z0-9-]*$/.test(value); // Allows only letters and numbers, no spaces or special characters

            default:
                if (allowSpecialChars) {
                    const regex = new RegExp(`^[A-Za-z0-9\\s${allowedSpecialChars}]*$`);
                    return regex.test(value);
                }
                return /^[A-Za-z\s]*$/.test(value);
        }
    };
    const handleInputChange = (e) => {

        let newValue = e.target.value;
        let oldValue = newValue;

        switch (type) {

            case "positive":
                newValue = newValue.replace(/[^0-9]/g, ""); // Allow only positive numbers
                break;

            case "negative":
                newValue = newValue.replace(/[^0-9-]/g, "");
                if (newValue.startsWith("-")) {
                    newValue = "-" + newValue.replace(/-/g, ""); // Keep only the first "-"
                } else {
                    newValue = newValue.replace(/-/g, ""); // Remove "-" if not at the start
                }
                break;

            case "decimalpositive":
                newValue = newValue.replace(/[^0-9.]/g, ""); // Allow only positive decimals
                if ((newValue.match(/\./g) || []).length > 1) {
                    newValue = newValue.replace(/\.+$/, ""); // Remove extra dots
                }
                const partsPos = newValue.split(".");
                if (partsPos.length === 2 && partsPos[1].length > decimalPrecision) {
                    partsPos[1] = partsPos[1].slice(0, decimalPrecision);
                    newValue = partsPos.join(".");
                }
                break;

            case "decimalnegative":
                newValue = newValue.replace(/[^0-9.-]/g, ""); // Allow negative and positive decimals
                if (newValue.startsWith("-")) {
                    newValue = "-" + newValue.replace(/-/g, ""); // Keep only one "-"
                } else {
                    newValue = newValue.replace(/-/g, ""); // Remove "-" if not at the start
                }
                if ((newValue.match(/\./g) || []).length > 1) {
                    newValue = newValue.replace(/\.+$/, ""); // Remove extra dots
                }
                const partsNeg = newValue.split(".");
                if (partsNeg.length === 2 && partsNeg[1].length > decimalPrecision) {
                    partsNeg[1] = partsNeg[1].slice(0, decimalPrecision);
                    newValue = partsNeg.join(".");
                }
                break;

            case "days":
                newValue = newValue.replace(/[^0-9]/g, "");
                if (
                    newValue !== "" &&
                    (parseInt(newValue) < 0 || parseInt(newValue) > 30)
                ) {
                    newValue = newValue.slice(0, newValue.length - 1);
                }
                // Remove leading zeros (e.g., "01" becomes "1")
                newValue = String(parseInt(newValue !== "" ? newValue : "0", 10));
                break;

            case "months":
                newValue = newValue.replace(/[^0-9]/g, "");
                if (
                    newValue !== "" &&
                    (parseInt(newValue) < 1 || parseInt(newValue) > 12)
                ) {
                    newValue = newValue.slice(0, newValue.length - 1);
                }
                break;

            case "years":
                newValue = newValue.replace(/[^0-9]/g, "");
                if (
                    newValue !== "" &&
                    (parseInt(newValue) < 1 || parseInt(newValue) > 150)
                ) {
                    newValue = newValue.slice(0, newValue.length - 1);
                }
                break;

            case "number":
                newValue = newValue.replace(/[^0-9]/g, "");
                break;
            case "propercase":
                // Convert input to proper case
                newValue = newValue.replace(/[^A-Za-z\s]/g, "")
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                break;
            case "barcode":
                if (!/^[A-Za-z0-9\\s-]*$/.test(newValue)) {
                    newValue = newValue.replace(/[^A-Za-z0-9\\s-]/g, ""); // Remove invalid characters
                    // return false;
                }
                break;
            case "charNumberWithSpace":
                if (!/^[A-Za-z0-9\\s]*$/.test(newValue)) {
                    newValue = newValue.replace(/[^A-Za-z0-9\\s]/g, ""); // Remove invalid characters
                    // return false;
                }
                break;
            case "charNumber":
                if (!/^[A-Za-z0-9]*$/.test(newValue)) {
                    newValue = newValue.replace(/[^A-Za-z0-9]/g, ""); // Remove invalid characters
                    // return false;
                }
                break;
            case "allCharacters":
                if (!/^[\s\S]*$/.test(newValue)) {
                    newValue = newValue.replace(/[^\s\S]/g, ""); // Allow everything
                }
                break;

            default:
                if (!allowSpecialChars) {
                    newValue = newValue.replace(/[^A-Za-z\s]/g, "");
                }
                break;
        }

        // Enforce max length
        if (maxLength && newValue.length > maxLength) {
            newValue = newValue.slice(0, maxLength);
        }

        e.target.value = newValue;

        // Update value and validate
        if (onChange) {
            onChange(e);
        }

        const valid = validateField(newValue);

        setIsValid(valid);

        if (oldValue.toLowerCase() != newValue.toLowerCase()) prevIsValidRef.current = valid;
        else prevIsValidRef.current = false;
        // Show error toast only when transitioning from valid to invalid
        if (!valid || prevIsValidRef.current) {
            let errorMessage = "Invalid input";
            switch (type) {
                case "positive":
                    errorMessage = "Only positive numbers are allowed";
                    break;
                case "negative":
                    errorMessage = "Only negative or positive numbers are allowed";
                    break;
                case "decimalpositive":
                    errorMessage = `Only positive numbers up to ${decimalPrecision} decimal places allowed`;
                    break;
                case "decimalnegative":
                    errorMessage = `Max ${decimalPrecision} decimal places allowed`;
                    break;
                case "days":
                    errorMessage = "Days must be between 0 and 30";
                    break;
                case "months":
                    errorMessage = "Months must be between 1 and 11";
                    break;
                case "years":
                    errorMessage = "Years must be between 1 and 150";
                    break;
                case "propercase":
                    errorMessage = "Only letters" +
                        (allowSpecialChars
                            ? " with these special characters " + allowedSpecialChars
                            : "") +
                        " are allowed!";
                    break;
                case "barcode":
                    errorMessage = "Invalid barcode Format!";
                    break;
                case "charNumberWithSpace":
                    errorMessage = "Only letters, numbers & space are allowed!";
                    break;
                case "charNumber":
                    errorMessage = "Only letters and numbers are allowed!";
                    break;
                case "allCharacters":
                    errorMessage = ' '
                    break;
                default:
                    errorMessage = "Invalid input!";
            }
            toast.error(errorMessage);
        }

    };

    return (
        <div className="relative flex-1">
            <input
                type="text" // Always text to allow custom handling
                id={name}
                name={name}
                value={value}
                onChange={handleInputChange}
                placeholder=" "
                maxLength={maxLength}
                disabled={isDisabled}
                aria-invalid={!isValid}
                aria-describedby={!isValid ? `${name}-error` : undefined}
                className={`inputPeerField peer border-borderColor focus:outline-none ${isDisabled
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-white"
                    } ${!isValid
                        ? "border-red-500"
                        : isMandatory
                            ? "border-b-red-500"
                            : "border-borderColor"
                    } focus:outline-none`}

                readOnly={readOnly}
            />
            {
                !showLabel && (
                    <label
                        htmlFor={name}
                        className={`menuPeerLevel
                 ${isDisabled
                                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                : "bg-white"
                            } 
                `}
                    >
                        {label}
                    </label>
                )
            }

        </div>
    );
};
