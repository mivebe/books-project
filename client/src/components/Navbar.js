import React, { useContext, useState } from 'react';
import logo from "../media/bambook-logo.png";
import MGSearch from "../media/icons/magnifying-glass.svg";
import placeholderAvatar from "../media/placeholder-avatar.jpg";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext"
import DropdownMenu from "./dropdown/DropdownMenu"

const Navbar = () => {

    const authContext = useContext(AuthContext)
    const { backEndURL } = authContext
    const { username, role, avatar } = authContext.tokenInfo
    const history = useHistory();
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')

    const handleSubmit = () =>
        history.push({
            pathname: "/all-books",
            search: history.location.search ? history.location.search + `&query${query}` : `?query=${query}`,
            state: { ...history.location.state, query: query }
        })

    return (
        <div className="header_container--padding">
            <div className="header_container--fixed">
                <header className="navbar">
                    <div className="nav__logo-container" onClick={() => { history.push("/home") }}>
                        <img src={logo} alt="bambook logo" className="nav__logo"></img>
                    </div>

                    <form className="search"
                        onKeyPress={e => e.key === "Enter" && handleSubmit}
                        onChange={e => setQuery(e.target.value)}
                        onSubmit={e => e.preventDefault()}
                    >
                        <input type="text" className="search__input" name="search" />
                        <button className="search__button" onClick={handleSubmit}>
                            <img src={MGSearch} />
                        </button>
                    </form>

                    <nav className="navigation__container">
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
                {role && role === "admin" &&
                    <div className="admin-header">
                        <nav className="navigation__container">
                            <a className="navbar__btn navbar__btn--green " href="/create-book" >Create Book</a>
                            <a className="navbar__btn navbar__btn--green " href="/book" >Book</a>
                        </nav>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar
