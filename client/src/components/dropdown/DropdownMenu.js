import React, { useState, useContext, useRef, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { InnerStorage } from "../contexts/AuthContext";
import { ReactComponent as CogIcon } from '../../media/icons/cog.svg';
import { ReactComponent as LogoutIcon } from '../../media/icons/logout-icon.svg';
import { ReactComponent as ArrowIcon } from '../../media/icons/arrow.svg';
import DropdownItem from "./DropdownItem"

const DropdownMenu = () => {

    const authContext = useContext(InnerStorage);
    const history = useHistory();
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    const mainRef = useRef(null);
    const settingsRef = useRef(null);

    useEffect(() => {
        calcHeight(dropdownRef.current?.firstChild);
        if (activeMenu === "main") {
            settingsRef.current?.classList.add("menu-secondary-exit-active")
            mainRef.current?.classList.add("menu-primary-enter-active")
        } else {
            mainRef.current?.classList.add("menu-secondary-exit-active")
            settingsRef.current?.classList.add("menu-secondary-enter-active")
        }
    }, [activeMenu])

    function calcHeight(el) {
        const height = el.offsetHeight + 20;//the +20 is a weird fix of a weird bug
        setMenuHeight(height)
    }


    return (
        <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

            {activeMenu === "main" &&

                <div className="menu menu-primary-enter" ref={mainRef}>
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
            }


            {activeMenu === "settings" &&

                <div className="menu menu-secondary-enter" ref={settingsRef}>
                    <DropdownItem leftIcon={<ArrowIcon />} onClick={() => setActiveMenu("main")}></DropdownItem>
                    <DropdownItem onClick={() => setActiveMenu("main")}>Profile</DropdownItem>
                    <DropdownItem onClick={() => setActiveMenu("main")}>Terms & Conditions</DropdownItem>
                    <DropdownItem onClick={() => setActiveMenu("main")}>FAQ</DropdownItem>
                </div>
            }

        </div>
    )
}

export default DropdownMenu