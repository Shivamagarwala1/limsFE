import React from 'react'
import { useSelector } from 'react-redux';

export default function PopupFooter() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);


    return (
        <div>
            <div className='border-b-[1px]  flex justify-center items-center h-6 rounded-b-md text-xs font-semibold'
                style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor, color: activeTheme?.iconColor }}
            >

            </div>
        </div>
    )
}
