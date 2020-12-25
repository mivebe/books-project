import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import Home from '../pages/HomePage'

export default function PrivateSwitch() {
    return (
        <Switch>
            <Route exact path="/home"><Home /></Route>
            <Redirect from="/logout" to="/register" />
        </Switch>
    )
}
