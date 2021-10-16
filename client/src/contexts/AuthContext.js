import { createContext, useState, useEffect } from "react"
import { getCookie } from "../components/Cookies"
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const tokenCookie = getCookie("token");
    const refreshTokenCookie = getCookie("refreshToken");

    const backEndProtocol = "http://"
    const backEndHost = "localhost"
    const backEndPort = "3001"

    // console.log("asd", process.env.REACT_APP_BACK_END_URL);

    const [logged, setLogged] = useState(tokenCookie && refreshTokenCookie ? true : false)
    const [token, setToken] = useState(tokenCookie)
    const [refreshToken, setRefreshToken] = useState(refreshTokenCookie)
    const [tokenInfo, setTokenInfo] = useState(token ? jwtDecode(token) : {})
    const backEndURL = `${backEndProtocol}${backEndHost}:${backEndPort}`

    // useEffect(() => {
    //     setToken(tokenCookie)
    //     setRefreshToken(refreshTokenCookie)
    //     setTokenInfo(token ? jwtDecode(token) : {})
    // }, [logged])

    return (
        <AuthContext.Provider value={{
            logged: logged,
            setLogged: setLogged,
            token: token,
            setToken: setToken,
            refreshToken: refreshToken,
            setRefreshToken: setRefreshToken,
            tokenInfo: tokenInfo,
            setTokenInfo: setTokenInfo,
            backEndURL: backEndURL,
        }}>
            {children}
        </AuthContext.Provider>
    )

}
