import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function Footer() {

    const activeTheme = useSelector((state) => state.theme.activeTheme);

    return (

        <div className="w-full fixed bottom-0 h-5 flex justify-center items-center text-sm font-semibold"

            style={{
                background: activeTheme?.menuColor || 'linear-gradient(rgb(255, 119, 34) 0%, rgb(255, 172, 121) 100%)',
                color: activeTheme?.iconColor || 'white'
            }}
        >
            <div>
                {import.meta.env.VITE_API_FOOTER} &nbsp;
                <Link
                    className="mx-1"
                    to={import.meta.env.VITE_API_COMPANY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {import.meta.env.VITE_API_COMPANY_NAME}
                </Link>
                {import.meta.env.VITE_API_ALL_ISSUE}
            </div>
        </div >

    );
}
