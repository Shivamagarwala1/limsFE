import React from 'react'
import { IoMdMenu } from 'react-icons/io'
import { useSelector } from 'react-redux';

export default function GridDataDetails({ gridDataDetails }) {

    const activeTheme = useSelector((state) => state.theme.activeTheme);

    return (
        <>
            <div className='w-full h-[0.10rem]' style={{ background: activeTheme?.menuColor }}></div>

            <div
                className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-bold border-b-2 text-textColor"
                style={{ background: activeTheme?.blockColor }}
            >
                <div>
                    <IoMdMenu className='font-semibold text-lg' />
                </div>
                <div>{gridDataDetails}</div>
            </div>
        </>


    )
}
