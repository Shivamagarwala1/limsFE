import React from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'

export default function CustomPopup({ children, headerData, activeTheme, setShowPopup }) {
    return (
        <div className="flex px-2 lg:px-32 py-4 h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
            <div className="w-full max-h-[400px] z-50 shadow-2xl bg-white rounded-lg animate-slideDown pb-3">
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

                <div className='max-h-[365px] overflow-auto'>
                    {children}
                </div>
            </div>


        </div>
    )
}
