import React from "react";

export default function CustomFormButton({
    activeTheme,
    text,
    icon: Icon, // Renamed to Icon (to follow React component conventions)
    isButtonClick,
    loadingButtonNumber,
    onClick, // Accept a callback for button click
}) {
   

    return (
        <div>
            <button
                type="button"
                data-ripple-light="true"
                onClick={onClick} // Trigger the onClick callback when button is clicked
                className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer`}
                style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                }}
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
