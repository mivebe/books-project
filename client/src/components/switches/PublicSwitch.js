import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import LoginPage from '../../pages/LoginPage'
import PageNotFound from '../../pages/PageNotFound'
import ConfirmationPage from '../../pages/ConfirmationPage'
import FAQ from '../../pages/FAQ'
import Terms from '../../pages/Terms'

const PublicSwitch = () => {
    console.log("PUBLIC Switch");
    return (
        <Switch>
            <Route exact path="/login"><LoginPage /></Route>
            <Route exact path="/confirmation"><ConfirmationPage /></Route>
            <Route exact path="/404"><PageNotFound /></Route>
            <Route exact path="/faq"><FAQ /></Route>
            <Route exact path="/terms"><Terms /></Route>
            <Redirect from="*" to="/login" />
        </Switch>
    )
}
export default PublicSwitch