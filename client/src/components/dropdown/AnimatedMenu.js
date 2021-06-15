import React, { useState, useContext, useRef, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { InnerStorage } from "../contexts/AuthContext";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as BellIcon } from '../../media/icons/bell.svg';
import { ReactComponent as PlusIcon } from '../../media/icons/plus.svg';
import { ReactComponent as CogIcon } from '../../media/icons/cog.svg';
import { ReactComponent as ArrowIcon } from '../../media/icons/arrow.svg';
import { ReactComponent as DownArrow } from '../../media/icons/dropdown-arrow.svg';
import { ReactComponent as LogoutIcon } from '../../media/icons/logout-icon.svg';

const AnimatedMenu = () => {
    return (
        <Navbar>
            <NavItem icon={<PlusIcon />} />
            <NavItem icon={<BellIcon />} />
            <NavItem icon={<DownArrow />}>
                <DropdownMenu>

                </DropdownMenu>
            </NavItem>
        </Navbar>
    )
}

const Navbar = ({ children }) => {
    return (
        <nav className="dropdown-navbar">
            <ul className="dropdown-navbar-nav">
                {children}
            </ul>
        </nav>
    )
}

const NavItem = ({ icon, children }) => {
    const [open, setOpen] = useState(false)
    return (
        <li className="dropdown-nav-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>{icon}</a>
            {open && children}
        </li>
    )
}

const DropdownMenu = () => {

    const authContext = useContext(InnerStorage);
    const history = useHistory();
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);

    const dropdownRef = useRef(null);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 20)
    }, [])

    function calcHeight(el) {
        const height = el.offsetHeight + 20;//the +20 is a weird fix of a weird bug
        setMenuHeight(height)
    }



    const DropdownItem = ({ children, leftIcon, rightIcon, onClick, }) => {
        return (
            <a href="#" className="menu-item" onClick={onClick || null}>
                <span className="icon-button">{leftIcon}</span>
                {children}
                <span className="icon-right">{rightIcon}</span>
            </a>
        )
    }
    return (
        <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
            <CSSTransition
                in={activeMenu == "main"}
                unmountOnExit
                timeout={500}
                classNames="menu-primary"
                onEnter={calcHeight}
            >
                <div className="menu">

                    <DropdownItem leftIcon={<CogIcon />} onClick={() => setActiveMenu("settings")}>Settings</DropdownItem>
                    <DropdownItem leftIcon={<LogoutIcon />} onClick={() => {
                        document.cookie = "token=;expires=Thu,01 Jan 1970 00:00:00 UTC";
                        document.cookie = "refreshToken=;expires=Thu,01 Jan 1970 00:00:00 UTC";

                        authContext.setToken(null);
                        authContext.setRefreshToken(null)
                        authContext.setLogged(false);

                        history.push("/logout");
                    }}>Logout</DropdownItem>
                </div>

            </CSSTransition>

            <CSSTransition
                in={activeMenu == "settings"}
                unmountOnExit
                timeout={500}
                classNames="menu-secondary"
                onEnter={calcHeight}
            >
                <div className="menu">

                    <DropdownItem leftIcon={<ArrowIcon />} onClick={() => setActiveMenu("main")}></DropdownItem>
                    <DropdownItem onClick={() => setActiveMenu("main")}>Profile</DropdownItem>
                    <DropdownItem onClick={() => setActiveMenu("main")}>Settings</DropdownItem>
                    <DropdownItem onClick={() => setActiveMenu("main")}>Settings</DropdownItem>
                    <DropdownItem onClick={() => setActiveMenu("main")}>Settings</DropdownItem>
                    <DropdownItem onClick={() => setActiveMenu("main")}>Settings</DropdownItem>
                    <DropdownItem onClick={() => setActiveMenu("main")}>Settings</DropdownItem>

                </div>

            </CSSTransition>
        </div>
    )
}

export default AnimatedMenu
