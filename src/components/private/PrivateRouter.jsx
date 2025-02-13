import React from 'react'
import { isloggedin } from '../../service/localstroageService'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRouter() {
    return (
        <>
            {
                isloggedin() ? <Outlet /> : <Navigate to="/" />
            }
        </>
    )
}
