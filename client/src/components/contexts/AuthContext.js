import { createContext } from "react"
const init = {
    logged: false,
    token: null,
    refreshToken: null,
    tokenInfo: {},
    setLogged: () => { },
    setToken: () => { },
    setRefreshToken: () => { },
    setTokenInfo: () => { }
}
export const InnerStorage = createContext(init);
