import React, { useState } from 'react'
import "./styles/sass/main.scss";
import { getCookie } from "./components/Cookies"
import jwt_decode from "jwt-decode"
import AppRouter from "./AppRouter"
import { AuthProvider } from "./contexts/AuthContext"


export default function App() {

    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    )
}