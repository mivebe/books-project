import React, { createContext, useState } from 'react'
// import { BrowserRouter as Router } from "react-router-dom"
// import PrivateSwitch from './components/switches/PrivateSwitch'
// import PublicSwitch from './components/switches/PublicSwitch'
import AppRouter from "./AppRouter"

const init = { token: false, setToken: () => { } }
export const InnerStorage = createContext(init)

export default function App() {
    const [token, setToken] = useState(false)
    return (
        <InnerStorage.Provider value={{ token, setToken }}>
            <AppRouter />
        </InnerStorage.Provider>
    )
}