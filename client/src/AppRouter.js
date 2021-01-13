import React, { useContext } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import { InnerStorage } from './App'
import PrivateSwitch from './components/switches/PrivateSwitch'
import PublicSwitch from './components/switches/PublicSwitch'

const AppRouter = () => {

    const { logged } = useContext(InnerStorage)

    return (
        <Router>
            {logged ? <PrivateSwitch /> : <PublicSwitch />}
        </Router>
    )
}

export default AppRouter
