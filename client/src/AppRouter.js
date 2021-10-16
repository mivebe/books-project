import React, { useContext } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import { AuthContext } from './contexts/AuthContext'
import PrivateSwitch from './components/switches/PrivateSwitch'
import PublicSwitch from './components/switches/PublicSwitch'

const AppRouter = () => {

    const { logged } = useContext(AuthContext)

    return (
        <Router>
            {logged ? <PrivateSwitch /> : <PublicSwitch />}
        </Router>
    )
}

export default AppRouter
