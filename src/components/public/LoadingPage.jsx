import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useSelector } from 'react-redux';

export default function LoadingPage({ width, height, isItemShow }) {

    const activeTheme = useSelector((state) => state.theme.activeTheme);


    return (
        <div className="w-full h-[100vh] flex justify-center items-center flex-col">
            <FaSpinner className={` animate-spin`} style={{ color: activeTheme?.textColor, width: width, height: height }} />

            {
                isItemShow === true && (
                    <div>
                        {import.meta.env.VITE_API_RECORD_NOT_FOUND} 
                    </div>
                )
            }
        </div>
    )
}
