import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

export default function PublicSwitch() {
    return (
        <Switch>
            <Route exact path="/login"><LoginPage /></Route>
            <Route exact path="/register"><RegisterPage /></Route>
            <Redirect from="*" to="/login" />
        </Switch>
    )
}
