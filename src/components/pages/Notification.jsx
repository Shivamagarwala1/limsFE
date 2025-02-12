import React from 'react'
import { IoCloseOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

export default function Notification({ setShowNotificationPopup }) {

    const activeTheme = useSelector((state) => state.theme.activeTheme);


    return (
        <div className="flex justify-center items-center h-[100vh] inset-0 fixed bg-black bg-opacity-50 z-50">
            <div className="w-96 h-auto z-50 shadow-2xl bg-white rounded-lg  animate-slideDown pb-3">

                <div className='flex justify-between items-center p-2 rounded-t-lg'
                    style={{ background: activeTheme?.menuColor || 'linear-gradient(rgb(255, 119, 34) 0%, rgb(255, 172, 121) 100%)', color: activeTheme?.iconColor || 'white' }}
                >
                    <div>
                        Notification
                    </div>
                    <div>
                        <IoCloseOutline className='text-xl cursor-pointer' onClick={() => setShowNotificationPopup(false)} />
                    </div>
                </div>


                <div className='py-3 text-center'>
                    This Features Comming soon......!!!
                </div>

            </div>
        </div>
    )
}
