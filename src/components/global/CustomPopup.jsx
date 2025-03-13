import React from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'

export default function CustomPopup({ children, headerData, activeTheme, setShowPopup }) {
    return (
        <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-40">
            <div className="w-64 md:w-[500px] max-h-60 z-50 shadow-2xl bg-white rounded-lg animate-slideDown pb-3">
                <div className='border-b-[1px] flex justify-between items-center px-2 py-1 rounded-t-md'
                    style={{ borderImage: activeTheme?.menuColor, background: activeTheme?.menuColor }}
                >
                    <div className="font-semibold" style={{ color: activeTheme?.iconColor }}>
                        {headerData}
                    </div>

                    <IoMdCloseCircleOutline
                        className='text-xl cursor-pointer'
                        style={{ color: activeTheme?.iconColor }}
                        onClick={() => setShowPopup(0)}
                    />
                </div>

                <div className='max-h-52 overflow-auto'>
                    {children}
                </div>
            </div>


        </div>
    )
}
