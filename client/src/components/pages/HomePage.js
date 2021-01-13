import React, { useContext } from 'react'
import { useHistory } from "react-router-dom"
import { InnerStorage } from '../../App';

export default function Home() {

    const authContext = useContext(InnerStorage)
    const history = useHistory();

    return (
        <div>
            <p style={{ color: "white", fontSize: "50px", textAlign: "center" }}>Home</p>
            <button style={{ color: "white", fontSize: "50px", textAlign: "center", backgroundColor: "transparent" }}
                onClick={() => {
                    document.cookie = "token=;expires=Thu,01 Jan 1970 00:00:00 UTC";
                    document.cookie = "refreshToken=;expires=Thu,01 Jan 1970 00:00:00 UTC";

                    authContext.setToken(null);
                    authContext.setRefreshToken(null)
                    authContext.setLogged(false);

                    history.push("/logout");
                }}>Logout</button>
        </div>
    )
}
