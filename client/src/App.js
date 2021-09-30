import React, { createContext, useState } from 'react'
import "./styles/sass/main.scss";
import { getCookie } from "./components/Cookies"
import jwt_decode from "jwt-decode"
import AppRouter from "./AppRouter"
import { InnerStorage } from "./components/contexts/AuthContext"


// const init = { logged: false, token: null, refreshToken: null, tokenInfo: {}, setLogged: () => { }, setToken: () => { }, setRefreshToken: () => { }, setTokenInfo: () => { } }
// export const InnerStorage = createContext(init);

export default function App() {

    /** Configuration */
    const tokenCookie = getCookie("token");
    const refreshTokenCookie = getCookie("refreshToken");

    const [logged, setLogged] = useState(tokenCookie && refreshTokenCookie);
    const [token, setToken] = useState(tokenCookie);
    const [refreshToken, setRefreshToken] = useState(refreshTokenCookie);
    const [tokenInfo, setTokenInfo] = useState(token ? jwt_decode(token) : {});

    const backEndProtocol = "http://"
    const backEndHost = "localhost"
    const backEndPort = "3001"
    const backEndURL = `${backEndProtocol}${backEndHost}:${backEndPort}`

    return (
        <InnerStorage.Provider value={{
            logged, setLogged,
            token, setToken,
            refreshToken, setRefreshToken,
            tokenInfo, setTokenInfo,
            backEndURL
        }}>
            <AppRouter />
        </InnerStorage.Provider>
    )
}