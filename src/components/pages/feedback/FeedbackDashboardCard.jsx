import React from 'react'

export default function FeedbackDashboardCard({ icon, color, title, numberOfFeedback }) {
    return (

        <div className='border-2 w-44 h-36 rounded-md cursor-pointer flex flex-col justify-center items-center text-white shadow-lg'
            style={{ borderColor: color, background: color }}
        >

            <div className='text-6xl'>
                {icon}
            </div>

            <div className='text-xl font-semibold'>
                {numberOfFeedback}
            </div>
            <div className='text-xl font-semibold'>
                {title} Feedback
            </div>

        </div>
    )
}
