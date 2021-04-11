import React, { useContext } from 'react'
import { useHistory } from "react-router-dom"
import { InnerStorage } from '../../App';

export default function Home() {

    const authContext = useContext(InnerStorage)
    const history = useHistory();

    return (<div id="home">
        <div className="">
            <p className="heading">Home</p>
            <button className="logout-btn"
                onClick={() => {
                    document.cookie = "token=;expires=Thu,01 Jan 1970 00:00:00 UTC";
                    document.cookie = "refreshToken=;expires=Thu,01 Jan 1970 00:00:00 UTC";

                    authContext.setToken(null);
                    authContext.setRefreshToken(null)
                    authContext.setLogged(false);

                    history.push("/logout");
                }}>Logout</button>
        </div>
    </div>
    )
}
