import React from 'react'

export default function CustomeSearchInputFields({
    name,
    value = "",
    onChange,
    label,
    onKeyDown,
    isDisabled = false
}) {
    return (
        <div className="relative flex-1">
            <input
                type="search" // Always text to allow custom handling
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder=" "
                onKeyDown={onKeyDown}  // Ensure this is passed
                className={`inputPeerField peer border-borderColor focus:outline-none ${isDisabled
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-white"
                    }  focus:outline-none`}

            />

            <label htmlFor={name} className={`menuPeerLevel
                ${isDisabled
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-white"
                } 
            `}
            >
                {label}
            </label>
        </div>
    )
}
