import React, { useContext, useState } from 'react';
import logo from "../media/bambook-logo.png";
import MGSearch from "../media/icons/magnifying-glass.svg";
import placeholderAvatar from "../media/placeholder-avatar.jpg";
import { useHistory } from 'react-router-dom';
import { InnerStorage } from "./contexts/AuthContext"
import DropdownMenu from "./dropdown/DropdownMenu"
import DropdownItem from "./dropdown/DropdownItem"

const Navbar = () => {

    const authContext = useContext(InnerStorage)
    const { backEndURL } = authContext
    const { username, role, avatar } = authContext.tokenInfo
    const history = useHistory();
    const [search, setSearch] = useState()
    const [open, setOpen] = useState(false)

    return (
        <div className="padding-container">
            <div className="fixed-container">
                <header className="navbar">
                    <div className="nav__logo-container" onClick={() => { history.push("/home") }}>
                        <img src={logo} alt="bambook logo" className="nav__logo"></img>
                    </div>

                    <form action="#" className="search" onKeyPress={(e) => { if (e.key === "Enter") { history.push(`/search?search=${search}`) } }}>
                        <input type="text" className="search__input" name="search" defaultValue={search} placeholder="Search by book name" onChange={e => setSearch(e.target.value)} autoFocus></input>
                        <button className="search__button" onClick={(e) => { e.preventDefault; history.push(`/search?search=${search}`); return null }}><img src={MGSearch}></img></button>
                    </form>

                    <nav className="navigation__container">
                        {role === "admin" && <a className="navbar__btn navbar__btn--green " href="/create-book" >Create Book</a>}
                        <a className="navbar__btn navbar__btn--green " href="/book" >Book</a>
                        <a className="navbar__btn navbar__btn--green " href="/all-books" >All Books</a>
                    </nav>

                    <div className="nav__user-panel">
                        <div className="nav__username-container">
                            <p>{username}</p>
                        </div>
                        <div className="nav__photo-container" onClick={(e) => { setOpen(!open) }}>
                            <img className="nav__user-photo" src={`${backEndURL}/static/${avatar}` || placeholderAvatar} alt="User photo"></img>
                        </div>
                        {open && <DropdownMenu></DropdownMenu>}
                    </div>


                </header>
            </div>
        </div>
    )
}

export default Navbar
