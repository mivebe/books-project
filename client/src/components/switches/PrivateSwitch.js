import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import HomePage from '../pages/HomePage'
import PageNotFound from '../pages/PageNotFound';
import Navbar from "../Navbar"
import Footer from "../Footer"
import Book from "../pages/BookPage"
import CreateBookPage from '../pages/CreateBookPage';
import CreateBookPage2 from '../pages/CreateBookPage2';

const PrivateSwitch = () => {
    console.log("Private Switch Entered");
    return (
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/home"><HomePage /></Route>
                <Route exact path="/book"><Book /></Route>
                <Route exact path="/create-book"><CreateBookPage /></Route>
                <Route exact path="/create-book2"><CreateBookPage2 /></Route>
                <Route exact path="/404"><PageNotFound /></Route>
                <Redirect from="/logout" to="/login" />
                <Redirect from="*" to="/home" />
            </Switch>
            <Footer />
        </div>
    )
}
export default PrivateSwitch