import React from 'react'

export default function FeedbackDashboardCard({ icon, color, title, numberOfFeedback }) {
    return (

        <div className='border-2 w-36 h-24 rounded-md cursor-pointer flex flex-col justify-center items-center text-white shadow-lg'
            style={{ borderColor: color, background: color }}
        >

            <div className='text-3xl'>
                {icon}
            </div>

            <div className='text-lg font-semibold'>
                {numberOfFeedback}
            </div>
            <div className='text-sm font-semibold'>
                {title} Feedback
            </div>

        </div>
    )
}
