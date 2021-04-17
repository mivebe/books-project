import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import HomePage from '../pages/HomePage'
import PageNotFound from '../pages/PageNotFound';
import Navbar from "../Navbar"
import Footer from "../Footer"

const PrivateSwitch = () => {
    console.log("Private Switch Entered");
    return (
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/home"><HomePage /></Route>
                <Route exact path="/404"><PageNotFound /></Route>
                <Redirect from="/logout" to="/login" />
                <Redirect from="*" to="/home" />
            </Switch>
            <Footer />
        </div>
    )
}
export default PrivateSwitch