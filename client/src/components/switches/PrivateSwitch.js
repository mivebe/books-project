import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import HomePage from '../pages/HomePage'
import PageNotFound from '../pages/PageNotFound';
import Navbar from "../Navbar"
import Footer from "../Footer"
import Book from "../pages/BookPage"
import CreateBookPage from '../pages/CreateBookPage';
import AllBooks from "../pages/AllBooks";
import UserPanel from "../pages/UserPanel"


const PrivateSwitch = () => {
    console.log("Private Switch Entered");
    return (
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/home"><HomePage /></Route>
                <Route exact path="/book/:id"><Book /></Route>
                <Route exact path="/book"><Book /></Route>
                <Route exact path="/all-books"><AllBooks /></Route>
                <Route exact path="/create-book"><CreateBookPage /></Route>
                <Route exact path="/account"><UserPanel /></Route>
                <Route exact path="/404"><PageNotFound /></Route>
                <Redirect from="/logout" to="/login" />
                <Redirect from="*" to="/home" />
            </Switch>
            <Footer />
        </div>
    )
}
export default PrivateSwitch