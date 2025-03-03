import React from 'react'
import { FaSpinner } from 'react-icons/fa'

export default function CustomLoadingPage() {

    return (
        <div className="w-full h-20 flex justify-center items-center flex-col">
            <FaSpinner className={` animate-spin text-lg`} />
        </div>
    )
}
