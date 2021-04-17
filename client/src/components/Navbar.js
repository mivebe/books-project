import React from 'react'
import logo from "../media/bambook-logo.png"
import MGSearch from "../media/magnifying-glass.svg"
import userImage from "../media/user-6.jpg"

const Navbar = () => {

    return (
        <div className="padding-container">
            <div className="fixed-container">
                <header className="navbar">
                    <div className="nav__logo-container">
                        <img src={logo} alt="bambook logo" className="nav__logo"></img>
                    </div>

                    <form action="#" className="search">
                        <input type="text" className="search__input" placeholder="Search by book name"></input>
                        <button className="search__button">
                            <img src={MGSearch}></img>
                        </button>
                    </form>

                    <nav className="navigation__container">
                        <a className="navbar__btn navbar__btn--green " href="#" >kurami</a>
                        <a className="navbar__btn navbar__btn--green " href="#" >qnko</a>
                    </nav>
                    <div className="nav__user-panel">
                        <div className="nav__username-container">
                            <p>PESHO</p>
                        </div>
                        <div className="nav__photo-container">
                            <img className="nav__user-photo" src={userImage} alt="User photo"></img>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default Navbar
