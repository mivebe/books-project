import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import PublicSwitch from './components/switches/PublicSwitch'

export default function App() {
    return (
        <div>
            <Router>
                <PublicSwitch />
            </Router>
        </div>
    )
}