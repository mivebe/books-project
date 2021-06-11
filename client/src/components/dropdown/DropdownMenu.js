import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { InnerStorage } from "../contexts/AuthContext"
import DropdownItem from "./DropdownItem";
import { ReactComponent as DownArrow } from '../../media/down-arrow.svg'

const DropdownMenu = () => {

    const [activeMenu, setActiveMenu] = useState("main")

    const authContext = useContext(InnerStorage);
    const history = useHistory();

    const logout = () => {
        document.cookie = "token=;expires=Thu,01 Jan 1970 00:00:00 UTC";
        document.cookie = "refreshToken=;expires=Thu,01 Jan 1970 00:00:00 UTC";

        authContext.setToken(null);
        authContext.setRefreshToken(null)
        authContext.setLogged(false);

        history.push("/logout");
    }

    return (
        <div className="dropdown">
            <DropdownItem leftIcon={<DownArrow />} onClick={() => { history.push("/account") }}>Profile</DropdownItem>
            <DropdownItem leftIcon={<DownArrow />} onClick={logout}>Logout</DropdownItem>
        </div>
    )
}

export default DropdownMenu