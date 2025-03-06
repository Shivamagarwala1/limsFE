import React from 'react'
import useRippleEffect from '../customehook/useRippleEffect'

export default function CustomeNormalButton({
    activeTheme,
    text,
    onClick, // Accept a callback for button click
    disabled = false
}) {


    useRippleEffect()

    return (
        <div>
            <button
                type="button"
                data-ripple-light="true"
                onClick={onClick} // Trigger the onClick callback when button is clicked
                className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} px-2`}
                style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                }}
                disabled={disabled}
            >

                {text}

            </button>
        </div>
    )
}
