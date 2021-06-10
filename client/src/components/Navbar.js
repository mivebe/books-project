import React, { useContext } from 'react';
import logo from "../media/bambook-logo.png";
import MGSearch from "../media/magnifying-glass.svg";
import placeholderAvatar from "../media/placeholder-avatar.jpg";
import { useHistory } from 'react-router-dom';
import { InnerStorage } from "./contexts/AuthContext"

const Navbar = () => {

    const authContext = useContext(InnerStorage)
    const { backEndURL } = authContext
    const { username, role, avatar } = authContext.tokenInfo
    const history = useHistory();


    return (
        <div className="padding-container">
            <div className="fixed-container">
                <header className="navbar">
                    <div className="nav__logo-container" onClick={() => { history.push("/home") }}>
                        <img src={logo} alt="bambook logo" className="nav__logo"></img>
                    </div>

                    <form action="#" className="search">
                        <input type="text" className="search__input" placeholder="Search by book name"></input>
                        <button className="search__button">
                            <img src={MGSearch}></img>
                        </button>
                    </form>

                    <nav className="navigation__container">
                        {role === "admin" && <a className="navbar__btn navbar__btn--green " href="/create-book" >Create Book</a>}
                        <a className="navbar__btn navbar__btn--green " href="/book" >Book</a>
                        <a className="navbar__btn navbar__btn--green " href="/all-books" >All Books</a>
                    </nav>

                    <div className="nav__user-panel" onClick={() => { history.push("/account") }}>
                        <div className="nav__username-container">
                            <p>{username}</p>
                        </div>
                        <div className="nav__photo-container">
                            <img className="nav__user-photo" src={`${backEndURL}/static/${avatar}` || placeholderAvatar} alt="User photo"></img>
                        </div>
                    </div>

                </header>
            </div>
        </div>
    )
}

export default Navbar
