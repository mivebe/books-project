import React, { createContext } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import PrivateSwitch from './components/switches/PrivateSwitch'
import PublicSwitch from './components/switches/PublicSwitch'


const init = { token: false }
export const InnerStorage = createContext(init)

export default function App() {
    const token = true
    return (
        <InnerStorage.Provider value={{ token }}>
            <Router>
                {token ? <PublicSwitch /> : <PrivateSwitch />}
            </Router>
        </InnerStorage.Provider>
    )
}