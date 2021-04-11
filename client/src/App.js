import React, { createContext, useState } from 'react'
import "./styles/sass/main.scss";
import { getCookie } from "./components/Cookies"
import jwt_decode from "jwt-decode"
import AppRouter from "./AppRouter"


const init = { logged: false, token: null, refreshToken: null, tokenInfo: {}, setLogged: () => { }, setToken: () => { }, setRefreshToken: () => { }, setTokenInfo: () => { } }
export const InnerStorage = createContext(init);

export default function App() {

    const tokenCookie = getCookie("token");
    const refreshTokenCookie = getCookie("refreshToken");

    const [logged, setLogged] = useState(tokenCookie && refreshTokenCookie);
    const [token, setToken] = useState(tokenCookie);
    const [refreshToken, setRefreshToken] = useState(refreshTokenCookie);
    const [tokenInfo, setTokenInfo] = useState(token ? jwt_decode(token) : {})

    return (
        <InnerStorage.Provider value={{ logged, setLogged, token, setToken, refreshToken, setRefreshToken, tokenInfo, setTokenInfo }}>
            <AppRouter />
        </InnerStorage.Provider>
    )
}