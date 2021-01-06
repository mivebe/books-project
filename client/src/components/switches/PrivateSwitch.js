import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import Home from '../pages/HomePage'
import PageNotFound from '../pages/PageNotFound';

export default function PrivateSwitch() {
    console.log("ASD");
    return (
        <Switch>
            <Route exact path="/home"><Home /></Route>
            <Route exact path="/404"><PageNotFound /></Route>
            <Redirect from="/logout" to="/login" />
            <Redirect from="*" to="/home" />
        </Switch>
    )
}
