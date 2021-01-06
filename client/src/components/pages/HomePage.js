import React, { useContext } from 'react'
import { useHistory } from "react-router-dom"
import { InnerStorage } from '../../App';

export default function Home() {

    const history = useHistory();
    const { setToken } = useContext(InnerStorage)

    return (
        <div>
            <p style={{ color: "white", fontSize: "50px", textAlign: "center" }}>Home</p>
            <button style={{ color: "white", fontSize: "50px", textAlign: "center", backgroundColor: "transparent" }}
                onClick={() => {
                    setToken(false);
                    history.push("/login");
                }}>Logout</button>
            <button style={{ color: "white", fontSize: "50px", textAlign: "center", backgroundColor: "transparent" }}
                onClick={() => { history.push("/404") }}>not found page</button>
        </div>
    )
}
