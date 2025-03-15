import React from "react";
import useRippleEffect from "../customehook/useRippleEffect";

export default function CustomFormButtonWithLoading({
    activeTheme,
    text,
    disabled = false,
    icon: Icon, // Renamed to Icon (to follow React component conventions)
    isButtonClick,
    loadingButtonNumber,

}) {

    useRippleEffect();

    return (
        <div>
            <button
                type="submit"
                data-ripple-light="true"
                // onClick={onClick} // Trigger the onClick callback when button is clicked
                className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} `}
                style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                    opacity: disabled ? 0.5 : 1, // Reduce opacity when disabled
                }}
                disabled={disabled} // Disable the button when disabled is true
            >
                {isButtonClick === loadingButtonNumber ? (
                    <Icon className="text-xl animate-spin" /> // Render the icon component when loading
                ) : (
                    text // Render the button text when not loading
                )}
            </button>


        </div>
    );
}
