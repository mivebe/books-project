import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import LoginPage from '../pages/LoginPage'
import PageNotFound from '../pages/PageNotFound'
import ConfirmationPage from '../pages/ConfirmationPage'

const PublicSwitch = () => {

    return (
        <Switch>
            <Route exact path="/login"><LoginPage /></Route>
            <Route exact path="/confirmation"><ConfirmationPage /></Route>
            <Route exact path="/404"><PageNotFound /></Route>
            <Redirect from="*" to="/login" />
        </Switch>
    )
}
export default PublicSwitch