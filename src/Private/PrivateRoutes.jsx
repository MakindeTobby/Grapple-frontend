import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoutes() {
    const auth = () => {
        const jwt = localStorage.getItem("jwt")
        if (jwt) {
            return true
        } else {
            return false
        }
    }

    const user = auth()

    return user ? <Outlet /> : <Navigate to={"/"} />
}