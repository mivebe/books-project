import React, { useContext } from 'react'
import { Switch, Route, Redirect, useLocation } from "react-router-dom"
import { BooksProvider } from '../../contexts/BooksContext';
import { AuthContext } from "../../contexts/AuthContext"
import HomePage from '../../pages/HomePage'
import PageNotFound from '../../pages/PageNotFound';
import Navbar from "../Navbar"
import Footer from "../Footer"
import Book from "../../pages/BookPage"
import CreateBookPage from '../../pages/CreateBookPage';
import AllBooks from "../../pages/AllBooks";
import UserPanel from "../../pages/UserPanel"
import SearchPage from '../../pages/SearchPage';
import FAQ from '../../pages/FAQ'
import Terms from '../../pages/Terms'



const PrivateSwitch = () => {
    console.log("Private Switch Entered");
    const location = useLocation()
    const authContext = useContext(AuthContext)
    // console.log("switch", authContext);

    const { role } = authContext.tokenInfo

    return (
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/home"><HomePage /></Route>
                <Route exact path="/book/:id"><Book /></Route>
                <Route exact path="/book"><Book /></Route>
                <Route exact path={"/all-books"} search={location.search} key={location.key}>
                    <BooksProvider>
                        <AllBooks />
                    </BooksProvider>
                </Route>
                {role === "admin" && <Route exact path="/create-book"><CreateBookPage /></Route>}
                <Route exact path="/search"><SearchPage /></Route>
                <Route exact path="/account"><UserPanel /></Route>
                <Route exact path="/404"><PageNotFound /></Route>
                <Route exact path="/faq"><FAQ /></Route>
                <Route exact path="/terms"><Terms /></Route>
                <Redirect from="/logout" to="/login" />
                <Redirect from="*" to="/home" />
            </Switch>
            <Footer />
        </div>
    )
}
export default PrivateSwitch