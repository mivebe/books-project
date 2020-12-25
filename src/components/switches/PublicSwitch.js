import React, { useContext } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import { InnerStorage } from '../../App'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import PageNotFound from '../pages/PageNotFound'
import RegisterPage from '../pages/RegisterPage'

export default function PublicSwitch() {
    const token = useContext(InnerStorage);
    return (
        <Switch>
            <Route exact path="/home">{token ? <HomePage /> : <LoginPage />}</Route>
            <Route exact path="/login"><LoginPage /></Route>
            <Route exact path="/register"><RegisterPage /></Route>
            <Route exact path="/404"><PageNotFound /></Route>
            <Redirect from="*" to="/login" />
        </Switch>
    )
}
