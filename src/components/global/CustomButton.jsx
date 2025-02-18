import React from 'react';
import useRippleEffect from '../customehook/useRippleEffect';

export default function CustomButton({
    activeTheme,
    text,
    icon: Icon, // Renamed to Icon (to follow React component conventions)
    isButtonClick,
}) {

    useRippleEffect();


    return (
        <div>
            <button
                type="button"
                data-ripple-light="true"
                className={`overflow-hidden relative font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer`}
                style={{
                    background: activeTheme?.menuColor,
                    color: activeTheme?.iconColor,
                }}
            >
                {isButtonClick === 2 ? (
                    <Icon className="text-xl animate-spin" /> // Correctly render the icon component
                ) : (
                    text // Correctly render the text as a child
                )}
            </button>
        </div>
    );
}
