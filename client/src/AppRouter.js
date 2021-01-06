import React, { useContext } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import { InnerStorage } from './App'
import PrivateSwitch from './components/switches/PrivateSwitch'
import PublicSwitch from './components/switches/PublicSwitch'

const AppRouter = () => {

    const { token } = useContext(InnerStorage);

    return (
        <Router>
            {token ? <PrivateSwitch /> : <PublicSwitch />}
        </Router>
    )
}

export default AppRouter
